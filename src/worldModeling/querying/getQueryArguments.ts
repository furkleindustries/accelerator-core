import {
  FindModelArgs,
} from '../models/FindModelArgs';
import {
  IModel,
} from '../models/IModel';
import {
  IQueryArguments,
} from './IQueryArguments';
import {
  isFindModelArg,
} from '../models/isFindModelArg';
import {
  IWorld,
} from '../world/IWorld';
import {
  ModelType,
} from '../models/ModelType';
import {
  Tag,
} from '../../tags/Tag';

export const getQueryArguments = <
  Type extends ModelType,
  Being extends ModelType,
  Knowledge extends ModelType,
>(
  args: FindModelArgs<Type, Being, Knowledge>,
): IQueryArguments<Type, Being, Knowledge> => {
  let type: Type | null = null;
  if (Object.values(ModelType).includes(args.type)) {
    type = args.type as Type;
  }

  let name: string | null = null;
  if (args.name) {
    name = String(args.name);
  }

  let tags: Array<string | Tag> | null = null;
  if (args.tags) {
    tags = [ ...args.tags ];
  }

  let adjacent: Array<string | IModel<Type, Being, Knowledge>> | null = null;
  if (isFindModelArg(args.adjacent)) {
    const adjs = args.adjacent;
    if (typeof adjs === 'string') {
      adjacent = [ adjs ];
    } else {
      adjacent = [ ...adjs ];
    }
  }

  let connected: Array<string | IModel<Type, Being, Knowledge>> | null = null;
  if (isFindModelArg(args.connected)) {
    const connects = args.connected;
    if (typeof connects === 'string') {
      connected = [ connects ];
    } else {
      connected = [ ...connects ];
    }
  }

  let awareOf: Array<string | IModel<Type, Being, Knowledge>> | null = null;
  if (isFindModelArg(args.awareOf)) {
    const awares = args.awareOf;
    if (typeof awares === 'string') {
      awareOf = [ awares ];
    } else {
      awareOf = [ ...awares ];
    }
  }

  let inAwarenessGraph: Array<string | IModel<Type, Being, Knowledge>> | null = null;
  if (isFindModelArg(args.inAwarenessGraph)) {
    const inGraphs = args.inAwarenessGraph;
    if (typeof inGraphs === 'string') {
      inAwarenessGraph = [ inGraphs ];
    } else {
      inAwarenessGraph = [ ...inGraphs ];
    }
  }
  
  let ancestors: Array<string | IModel<Type, Being, Knowledge> | IWorld> | null = null;
  if (isFindModelArg(args.ancestors)) {
    const ancs = args.ancestors;
    if (typeof ancs === 'string') {
      ancestors = [ ancs ];
    } else {
      ancestors = [ ...ancs ];
    }
  }

  let children: Array<string | IModel<Type, Being, Knowledge>> | null = null;
  if (isFindModelArg(args.children)) {
    const childs = args.children;
    if (typeof childs === 'string') {
      children = [ childs ];
    } else {
      children = [ ...childs ];
    }
  }

  let descendants: Array<string | IModel<Type, Being, Knowledge>> | null = null;
  if (isFindModelArg(args.descendants)) {
    const descs = args.descendants;
    if (typeof descs === 'string') {
      descendants = [ descs ];
    } else {
      descendants = [ ...descs ];
    }
  }

  let parent: string | IModel<Type, Being, Knowledge> | IWorld | null = null;
  if (isFindModelArg(args.parent)) {
    parent = args.parent;
  }

  let links: Array<string | IModel<Type, Being, Knowledge>> | null = null;
  if (isFindModelArg(args.links)) {
    const linkys = args.links;
    if (typeof linkys === 'string') {
      links = [ linkys ];
    } else {
      links = [ ...linkys ];
    }
  }

  let thoughts: Array<string | IModel<Type, Being, Knowledge>> | null = null;
  if (isFindModelArg(args.thoughts)) {
    const someThoughts = args.thoughts;
    if (typeof someThoughts === 'string') {
      thoughts = [ someThoughts ];
    } else {
      thoughts = [ ...someThoughts ];
    }
  }

  let wants: Array<string | IModel<Type, Being, Knowledge>> | null = null;
  if (isFindModelArg(args.wants)) {
    const wnts = args.wants;
    if (typeof wnts === 'string') {
      wants = [ wnts ];
    } else {
      wants = [ ...wnts ];
    }
  }

  return Object.freeze(Object.assign({}, ...[
    adjacent ? { adjacent } : {},
    ancestors ? { ancestors } : {},
    awareOf ? { awareOf } : {},
    children ? { children } : {},
    connected ? { connected } : {},
    descendants ? { descendants } : {},
    inAwarenessGraph ? { inAwarenessGraph } : {},
    links ? { links } : {},
    name ? { name } : {},
    parent ? { parent } : {},
    tags ? { tags } : {},
    thoughts ? { thoughts } : {},
    type ? { type } : {},
    wants ? { wants } : {},
  ]));
};
