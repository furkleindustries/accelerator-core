import {
  filterEpistemology,
} from './filterEpistemology';
import {
  filterOntology,
} from './filterOntology';
import {
  FindModelArgs, FindAdjacencyArg,
} from './FindModelArgs';
import {
  getQueryArguments,
} from './getQueryArguments';
import {
  getTag,
} from '../../tags/getTag';
import {
  IModel,
} from '../models/IModel';
import {
  MaybeReadonlyArray,
} from '../../typeAliases/MaybeReadonlyArray';
import {
  ModelType,
} from '../models/ModelType';
import {
  OnticTypes,
} from '../ontology/OnticTypes';
import {
  shouldEndQueryEarly,
} from './shouldEndQueryEarly';
import { 
  assert,
  assertValid,
} from 'ts-assertions';
import { AwareTypes } from '../relations/AwareTypes';
import { EpistemicTypes } from '../epistemology/EpistemicTypes';
import { ContainmentTypes } from '../relations/ContainmentTypes';

function* generate<
  Type extends ModelType,
  Being extends OnticTypes,
  Knowledge extends ModelType,
> (
  models: MaybeReadonlyArray<IModel<Type, Being, Knowledge>>,
  filter: (model: IModel<Type, Being, Knowledge>) => boolean = () => true,
): IterableIterator<IModel<Type, Being, Knowledge>>
{
  for (const model of models) {
    if (filter(model)) {
      yield model;
    }
  }
}

export function* findAllGenerate<
  Type extends ModelType,
  Being extends OnticTypes,
  Knowledge extends ModelType,
>(
  models: MaybeReadonlyArray<IModel<Type, Being, Knowledge>>,
  args: '*' | FindModelArgs<Type, Being, Knowledge>,
): IterableIterator<IModel<Type, Being, Knowledge>> {
  assert(
    args && (args === '*' || typeof args === 'object'),
    'The args argument to findAllGenerate was not * or a valid object.',
  );

  if (args === '*') {
    yield* generate(models);
    return;
  }

  const {
    andOrBehavior: tempAndOr,
    ...tempArgs
  } = args;
  
  let andOrBehavior: 'and' | 'or' = 'and';
  if (/^and|or$/.test(String(tempAndOr))) {
    andOrBehavior = args.andOrBehavior as 'and' | 'or';
  }

  const safeArgs = assertValid<FindModelArgs<Type, Being, Knowledge>>(
    tempArgs,
    'The args argument was not provided to findAllGenerate.',
  );

  const {
    adjacent,
    ancestors,
    awareOf,
    children,
    connected,
    descendants,
    inAwarenessGraph,
    links,
    name,
    parent,
    tags,
    thoughts,
    type,
    wants,
  } = getQueryArguments(safeArgs);

  const filter = ({
    being: modelBeing,
    knowledge: modelKnowledge,
    name: modelName,
    tags: modelTags,
    type: modelType,
  }: IModel<ModelType, Being, Knowledge>): boolean => {
    const results: boolean[] = [];

    if (typeof name === 'boolean') {
      results.push(modelName === 'name');
      if (shouldEndQueryEarly(andOrBehavior, results)) {
        return false;
      }
    }

    if (tags) {
      results.push(
        !tags.find((tag) => !modelTags.includes(getTag([ tag ], tag)!)),
      );

      if (shouldEndQueryEarly(andOrBehavior, results)) {
        return false;
      }
    }

    if (type) {
      results.push(modelType === type);
      if (shouldEndQueryEarly(andOrBehavior, results)) {
        return false;
      }
    }

    if (modelKnowledge) {
      if (awareOf) {
        results.push(
          filterEpistemology(
            modelKnowledge,
            'awareOf',
            awareOf as IModel<AwareTypes, OnticTypes, ModelType>[],
          ),
        );

        if (shouldEndQueryEarly(andOrBehavior, results)) {
          return false;
        }
      }

      if (inAwarenessGraph) {
        results.push(
          filterEpistemology(
            modelKnowledge,
            'inAwarenessGraph',
            inAwarenessGraph as IModel<AwareTypes, Being, Knowledge>[],
          ),
        );

        if (shouldEndQueryEarly(andOrBehavior, results)) {
          return false;
        }
      }

      if (thoughts) {
        results.push(
          filterEpistemology(
            modelKnowledge,
            'thoughts',
            thoughts as IModel<AwareTypes, Being, Knowledge>[],
          ),
        );
        if (shouldEndQueryEarly(andOrBehavior, results)) {
          return false;
        }
      }

      if (wants) {
        results.push(
          filterEpistemology(
            modelKnowledge,
            'wants',
            wants as IModel<EpistemicTypes, Being, Knowledge>[],
          ),
        );

        if (shouldEndQueryEarly(andOrBehavior, results)) {
          return false;
        }
      }
    }

    if (modelBeing) {
      if (adjacent) {
        results.push(
          filterOntology(
            modelBeing,
            'adjacent',
            adjacent as FindAdjacencyArg<ContainmentTypes, Being, Knowledge>,
          ),
        );

        if (shouldEndQueryEarly(andOrBehavior, results)) {
          return false;
        }
      }

      if (ancestors) {
        results.push(filterOntology(modelBeing, 'ancestors', ancestors));
        if (shouldEndQueryEarly(andOrBehavior, results)) {
          return false;
        }
      }

      if (children) {
        results.push(filterOntology(modelBeing, 'children', children));
        if (shouldEndQueryEarly(andOrBehavior, results)) {
          return false;
        }
      }

      if (connected) {
        results.push(filterOntology(modelBeing, 'connected', connected)); 
        if (shouldEndQueryEarly(andOrBehavior, results)) {
          return false;
        }
      }

      if (descendants) {
        results.push(filterOntology(modelBeing, 'descendants', descendants));
        if (shouldEndQueryEarly(andOrBehavior, results)) {
          return false;
        }
      }

      if (parent) {
        results.push(filterOntology(modelBeing, 'parent', [ parent ]));
        if (shouldEndQueryEarly(andOrBehavior, results)) {
          return false;
        }
      }

      if (links) {
        results.push(filterOntology(modelBeing, 'links', links));        
        if (shouldEndQueryEarly(andOrBehavior, results)) {
          return false;
        }
      }
    }

    if (andOrBehavior === 'and') {
      return results.filter(Boolean).length === results.length;
    } else {
      return Boolean(results.filter(Boolean).length);
    }
  }

  yield* generate<Type, Being, Knowledge>(models, filter);
}
