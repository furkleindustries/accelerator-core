import {
  Parser as AcornParser,
} from 'acorn';
// @ts-ignore
import acornJsx from 'acorn-jsx';
import {
  attributeNames,
} from './attributeNames';
import {
  randomHash,
} from './hash';
import {
  IJsxParserOwnProps,
} from './IJsxParserOwnProps';
import {
  parseStyle,
} from './parseStyle';
import {
  resolvePath,
} from './resolvePath';
import {
  canHaveChildren,
  canHaveWhitespace,
} from './specialTags';

import * as React from 'react';

const parser = AcornParser.extend(acornJsx());

export class JsxParser {
  private readonly props: IJsxParserOwnProps;

  constructor({
    jsx = '',
    ...props
  }: IJsxParserOwnProps) {
    this.props = {
      jsx: jsx.replace(
        new RegExp(/(^\s+)|(\s+$)|(<!DOCTYPE([^>]*)>)/g),
        '',
      ),
  
      ...props,
    };
  }

  public readonly parse = (): React.ReactNode => {
    const {
      jsx,
      onError,
    } = this.props;

    const wrappedJsx = `<root>${jsx}</root>`;
    let parsed: any = [];
    try {
      parsed = parser.parse(wrappedJsx);
      parsed = parsed.body[0].expression.children || [];
    } catch (error) {
      onError(error);
      return [];
    }

    return parsed.map(this.parseExpression).filter(Boolean);
  };

  public readonly parseExpression = (expression: any): any => {
    const {
      bindings = {},
      onError,
    } = this.props;

    switch (expression.type) {
      case 'JSXAttribute':
        if (expression.value === null) {
          return true;
        }

        return this.parseExpression(expression.value);
      case 'JSXElement':
        return this.parseElement(expression);
      case 'JSXExpressionContainer':
        return this.parseExpression(expression.expression);
      case 'JSXText':
        return expression.value;
      case 'ArrayExpression':
        return expression.elements.map(this.parseExpression);
      case 'BinaryExpression':
        /* eslint-disable eqeqeq,max-len */
        switch (expression.operator) {
          case '-':
              return this.parseExpression(expression.left) - this.parseExpression(expression.right);
          case '!=':
              return this.parseExpression(expression.left) != this.parseExpression(expression.right);
          case '!==':
              return this.parseExpression(expression.left) !== this.parseExpression(expression.right);
          case '*':
              return this.parseExpression(expression.left) * this.parseExpression(expression.right);
          case '**':
              return this.parseExpression(expression.left) ** this.parseExpression(expression.right);
          case '/':
              return this.parseExpression(expression.left) / this.parseExpression(expression.right);
          case '%':
              return this.parseExpression(expression.left) % this.parseExpression(expression.right);
          case '+':
              return this.parseExpression(expression.left) + this.parseExpression(expression.right);
          case '==':
              return this.parseExpression(expression.left) == this.parseExpression(expression.right);
          case '===':
              return this.parseExpression(expression.left) === this.parseExpression(expression.right);
          default:
            if (typeof onError === 'function') {
              onError(new Error('Could not parse binary expression in JSX content.'));
            }

            return undefined;
        }
      case 'CallExpression':
        const parsedCallee = this.parseExpression(expression.callee);
        if (parsedCallee === undefined) {
          if (typeof onError === 'function') {
            onError(new Error(
              `The expression '${expression.callee}' could not be resolved, resulting in an undefined return value.`
            ));
          }

          return undefined;
        }

        return parsedCallee(...expression.arguments.map(this.parseExpression));
      case 'ConditionalExpression':
        return this.parseExpression(expression.test) ?
          this.parseExpression(expression.consequent) :
          this.parseExpression(expression.alternate)
      case 'Identifier':
        return (bindings || {})[expression.name];
      case 'Literal':
        return expression.value;
      case 'LogicalExpression':
        const left = this.parseExpression(expression.left)
        if (expression.operator === '||' && left) {
          return left;
        } else if ((expression.operator === '&&' && left) || (expression.operator === '||' && !left)) {
          return this.parseExpression(expression.right)
        }

        return false;
      case 'MemberExpression':
        const thisObj = this.parseExpression(expression.object) || {};
        const member = (thisObj)[expression.property.name];
        if (typeof member === 'function') {
          return member.bind(thisObj);
        }

        return member;
      case 'ObjectExpression':
        const object = {};
        expression.properties.forEach((prop: any) => {
          object[prop.key.name || prop.key.value] = this.parseExpression(prop.value)
        });
  
        return object;
      case 'UnaryExpression':
        switch (expression.operator) {
          case '+':
            return expression.argument.value;
          case '-':
              return -1 * expression.argument.value;
          case '!':
              return !expression.argument.value;
          default:
            return undefined;
        }

      default:
        const error = new Error('Could not determine a type when parsing JSX content.');
        if (typeof onError === 'function') {
          onError(error);
        }

        return undefined;
    }
  };

  public readonly parseName = (element: any): any => {
    switch (element.type) {
      case 'JSXIdentifier':
        return element.name;
      case 'JSXMemberExpression':
        return `${this.parseName(element.object)}.${this.parseName(element.property)}`;
      default:
        return undefined;
    }
  };

  public readonly parseElement = (element: any) => {
    const {
      allowUnknownElements,
      denylistedAttrs: denylistedAttrsRaw,
      denylistedTags: denylistedTagsRaw,
      disableKeyGeneration,
      components = {},
      componentsOnly,
      onError,
    } = this.props;

    const {
      children: childNodes = [],
      openingElement,
    } = element;

    const { attributes = [] } = openingElement;

    const name = this.parseName(openingElement.name);
    if (!name) {
      if (onError) {
        onError(
          new Error(`The <${openingElement.name}> tag could not be parsed, and will not be rendered.`)
        );
      }

      return undefined;
    }

    const denylistedAttrs = (denylistedAttrsRaw || [])
      .map((attr) => (
        attr instanceof RegExp ?
          attr :
          new RegExp(attr, 'i')
      ));
  
    const denylistedTags = (denylistedTagsRaw || [])
      .map((tag) => tag.trim().toLowerCase())
      .filter(Boolean)

    if (/^(html|head|body)$/i.test(name)) {
      return childNodes.map((c: any) => this.parseElement(c));
    }

    const tagName = name.trim().toLowerCase()
    if (denylistedTags.indexOf(tagName) !== -1) {
      if (onError) {
        onError(
          new Error(`The tag <${name}> is blacklisted, and will not be rendered.`)
        );
      }

      return undefined;
    }

    if (!resolvePath(components, name)) {
      if (componentsOnly) {
        if (onError) {
          onError(
            new Error(`The componenet <${name}> is unrecognized, and will not be rendered.`)
          );
        }

        return undefined;
      }

      if (!allowUnknownElements && document.createElement(name) instanceof HTMLUnknownElement) {
        if (onError) {
          onError(
            new Error(`The tag <${name}> is unrecognized in this browser, and will not be rendered.`)
          );
        }

        return undefined;
      }
    }

    let children;
    const component = resolvePath(components, name);
    if (component || canHaveChildren(name)) {
      children = childNodes.map(this.parseExpression)
      if (!component && !canHaveWhitespace(name)) {
        children = children.filter((child: any) => (
          typeof child !== 'string' || !/^\s*$/.test(child)
        ));
      }

      if (!children.length) {
        children = undefined;
      } else if (children.length === 1) {
        [ children ] = children;
      }
    }

    const props: Record<string, any> = {
      key: disableKeyGeneration ? undefined : randomHash(),
    };
  
    attributes.forEach((expr: any) => {
      if (expr.type === 'JSXAttribute') {
        const rawName = expr.name.name
        const attributeName = attributeNames[rawName] || rawName;

        // if the value is null, this is an implicitly "true" prop, such as readOnly
        const value = this.parseExpression(expr);

        const matches = denylistedAttrs.filter(re => re.test(attributeName))
        if (!matches.length) {
          if (value === 'true' || value === 'false') {
            props[attributeName] = value === 'true';
          } else {
            props[attributeName] = value;
          }
        }
      } else if ((expr.type === 'JSXSpreadAttribute' && expr.argument.type === 'Identifier') ||
        expr.argument.type === 'MemberExpression')
      {
        const value = this.parseExpression(expr.argument);
        if (typeof value === 'object') {
          Object.keys(value).forEach((rawName) => {
            const attributeName = attributeNames[rawName] || rawName
            const matches = denylistedAttrs.filter(re => re.test(attributeName))
            if (matches.length === 0) {
              props[attributeName] = value[rawName]
            }
          });
        }
      }
    });

    if (typeof props.style === 'string') {
      props.style = parseStyle(props.style);
    }

    if (children) {
      props.children = children;
    }

    return React.createElement(component || name.toLowerCase(), props);
  };
}
