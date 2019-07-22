import {
  BeingNoThoughtsBase,
} from '../epistemology/BeingNoThoughtsBase';
import {
  filterEpistemology,
} from './filterEpistemology';
import {
  filterOntology,
} from './filterOntology';
import {
  FindModelArgs,
} from '../models/FindModelArgs';
import {
  getQueryArguments,
} from './getQueryArguments';
import {
  IModel,
} from '../models/IModel';
import {
  IWorld,
} from '../world/IWorld';
import {
  ModelType,
} from '../models/ModelType';
import { 
  assertValid, assert,
} from 'ts-assertions';

function* generate<
  Type extends ModelType,
  Being extends BeingNoThoughtsBase,
  Knowledge extends ModelType,
> (
  models: Record<string, IModel<Type, Being, Knowledge>>,
  filter: (model: IModel<Type, Being, Knowledge>) => boolean = () => true,
): IterableIterator<IModel<Type, Being, Knowledge>>
{
  const filtered = Object.values(models).filter(filter);
  for (const model of filtered) {
    yield model;
  }
};

export function* findAllGenerate<
  Type extends ModelType,
  Being extends BeingNoThoughtsBase,
  Knowledge extends ModelType,
>(
  world: IWorld,
  args: '*' | FindModelArgs<Type, Being, Knowledge>,
): IterableIterator<IModel<Type, Being, Knowledge>> {
  assert(
    args && (args === '*' || typeof args === 'object'),
    'The args argument to findAllGenerate was not * or a valid object.',
  );

  const models = world.models as Record<
    string,
    IModel<Type, Being, Knowledge>
  >;

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

  let filter;
  if (andOrBehavior === 'and') {
    filter = ({
      being: modelBeing,
      knowledge: modelKnowledge,
      name: modelName,
      tags: modelTags,
      type: modelType,
    }: IModel<ModelType, Being, Knowledge>): boolean => (
      (typeof name === 'boolean' ? modelName === name : true) &&
        (tags ? !tags.find((tag) => !modelTags.includes(tag)) : true) &&
        (type ? modelType === type : true) &&

        modelKnowledge ? (() => (
          (awareOf ? filterEpistemology(modelKnowledge, 'awareOf', awareOf) : true) &&
          (inAwarenessGraph ?
            filterEpistemology(modelKnowledge, 'inAwarenessGraph', inAwarenessGraph) :
            true) &&

          (thoughts ? filterEpistemology(modelKnowledge, 'thoughts', thoughts) : true) &&
          (wants ? filterEpistemology(modelKnowledge, 'wants', wants) : true)
        ))() : true &&

        modelBeing ? (() => (
          (adjacent ?
            filterOntology(modelBeing, 'adjacent', adjacent) :
            true) &&

          (connected ?
            filterOntology(modelBeing, 'connected', connected) :
            true) &&

          (ancestors ?
            filterOntology(modelBeing, 'ancestors', ancestors) :
            true) &&

          (children ?
            filterOntology(modelBeing, 'children', children) :
            true) &&

          (descendants ?
            filterOntology(modelBeing, 'descendants', descendants) :
            true) &&

          (parent ? filterOntology(modelBeing, 'parent', [ parent ]) : true) &&
          (links ? filterOntology(modelBeing, 'links', links) : true)
        ))() : true
    );
  } else {
    filter = ({
      being: modelBeing,
      knowledge: modelKnowledge,
      name: modelName,
      tags: modelTags,
      type: modelType,
    }: IModel<ModelType, Being, Knowledge>): boolean => (
      (name ? modelName === name : false) ||
        (tags ? !tags.find((tag) => !modelTags.includes(tag)) : false) ||
        (type ? modelType === type : false) ||

        modelKnowledge ? (() => (
          (awareOf ?
            filterEpistemology(
              modelKnowledge!,
              'awareOf',
              awareOf,
            ) :
            false) ||

          (inAwarenessGraph ?
            filterEpistemology(
              modelKnowledge!,
              'inAwarenessGraph',
              inAwarenessGraph,
            ) :
            false) ||

          (thoughts ?
            filterEpistemology(modelKnowledge!, 'thoughts', thoughts) :
            false) ||

          (wants ? filterEpistemology(modelKnowledge!, 'wants', wants) : false)
        ))() : false ||

        modelBeing ? (() => (
          (adjacent ?
            filterOntology(modelBeing, 'adjacent', adjacent) :
            false) ||

          (connected ?
            filterOntology(modelBeing, 'connected', connected) :
            false) ||

          (ancestors ?
            filterOntology(modelBeing, 'ancestors', ancestors) :
            false) ||

          (children ?
            filterOntology(modelBeing, 'children', children) :
            false) ||

          (descendants ?
            filterOntology(modelBeing, 'descendants', descendants) :
            false) ||

          (parent ? filterOntology(modelBeing, 'parent', [ parent ]) : false) ||
          (links ? filterOntology(modelBeing, 'links', links) : false)
        ))() : true
    );
  }

  yield* generate<Type, Being, Knowledge>(models, filter);
}
