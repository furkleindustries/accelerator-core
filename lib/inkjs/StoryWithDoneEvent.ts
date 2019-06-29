import {
  Container,
} from 'inkjs/engine/Container';
import {
  ControlCommand,
} from 'inkjs/engine/ControlCommand';
import {
  Divert,
} from 'inkjs/engine/Divert';
import {
  NativeFunctionCall,
} from 'inkjs/engine/NativeFunctionCall';
import {
  throwNullException,
} from 'inkjs/engine/NullException';
import {
  InkList,
  InkListItem,
} from 'inkjs/engine/InkList';
import {
  InkObject,
} from 'inkjs/engine/Object';
import {
  Pointer,
} from 'inkjs/engine/Pointer';
import {
  PRNG,
} from 'inkjs/engine/PRNG';
import {
  PushPopType,
} from 'inkjs/engine/PushPop';
import {
  Story,
} from 'inkjs/engine/Story';
import {
  StoryException,
} from 'inkjs/engine/StoryException';
import {
  StringBuilder,
} from 'inkjs/engine/StringBuilder';
import {
  assertValid,
} from 'ts-assertions';
import {
  asOrNull,
  asOrThrows,
} from 'inkjs/engine/TypeAssertion';
import {
  DivertTargetValue,
  IntValue,
  ListValue,
  StringValue,
  Value,
} from 'inkjs/engine/Value';
import {
  VariableAssignment,
} from 'inkjs/engine/VariableAssignment';
import {
  VariableReference,
} from 'inkjs/engine/VariableReference';
import {
  Void,
} from 'inkjs/engine/Void';

export class StoryWithDoneEvent extends Story {
  public readonly PerformLogicAndFlowControl = (contentObj: InkObject | null) => {
    if (contentObj === null) {
			return false;
		}

		if (contentObj instanceof Divert) {
      return this.__handleDivert(contentObj);
		} else if (contentObj instanceof ControlCommand) {
      return this.__handleControlCommand(contentObj);
    } else if (contentObj instanceof VariableAssignment) {
			return this.__handleVariableAssignment(contentObj);
		} else if (contentObj instanceof VariableReference) {
      return this.__handleVariableReference(contentObj);
		} else if (contentObj instanceof NativeFunctionCall) {
			return this.__handleNativeFunctionCall(contentObj);
		}

		/* No control content, must be ordinary content. */
		return false;
  };

  public readonly __handleDivert = (currentDivert: Divert) => {
    if (currentDivert.isConditional) {
      const conditionValue = this.state.PopEvaluationStack();

      // False conditional? Cancel divert
      if (!this.IsTruthy(conditionValue)) {
        return true;
      }
    }

    if (currentDivert.hasVariableTarget) {
      const varName = currentDivert.variableDivertName;
      const varContents = this.state.variablesState.GetVariableWithName(varName);

      if (varContents == null) {
        this.Error(
          `Tried to divert using a target from a variable that could not be ` +
            `found (${varName})`,
        );
      } else if (!(varContents instanceof DivertTargetValue)) {
        // var intContent = varContents as IntValue;
        const intContent = asOrNull(varContents, IntValue);

        let errorMessage = `Tried to divert to a target from a variable, ` +
          `but the variable (${varName}) didn't contain a divert target, it `;

        if (intContent instanceof IntValue && intContent.value == 0) {
          errorMessage += 'was empty/null (the value 0).';
        } else {
          errorMessage += `contained  "${varContents}".`;
        }

        this.Error(errorMessage);
      }

      let target = asOrThrows(varContents, DivertTargetValue);
      this.state.divertedPointer = this.PointerAtPath(target.targetPath);
    } else if (currentDivert.isExternal) {
      this.CallExternalFunction(currentDivert.targetPathString, currentDivert.externalArgs);
      return true;
    } else {
      this.state.divertedPointer = currentDivert.targetPointer.copy();
    }

    if (currentDivert.pushesToStack) {
      this.state.callStack.Push(
        currentDivert.stackPushType,
        undefined,
        this.state.outputStream.length,
      );
    }

    if (this.state.divertedPointer.isNull && !currentDivert.isExternal) {
      if (currentDivert && currentDivert.debugMetadata && currentDivert.debugMetadata.sourceName != null) {
        this.Error(
          `Divert target doesn't exist: ` +
            `${currentDivert.debugMetadata.sourceName}.`,
        );
      } else {
        this.Error(`Divert resolution failed: ${currentDivert}.`);
      }
    }

    return true;
  };

  public readonly __handleControlCommand = (evalCommand: ControlCommand) => {
    // Start/end an expression evaluation? Or print out the result?
    const commandType = evalCommand.commandType;

			if (commandType === ControlCommand.CommandType.EvalStart) {
				this.Assert(this.state.inExpressionEvaluation === false, 'Already in expression evaluation?');
        this.state.inExpressionEvaluation = true;
      } else if (commandType === ControlCommand.CommandType.EvalEnd) {
				this.Assert(this.state.inExpressionEvaluation === true, 'Not in expression evaluation mode');
        this.state.inExpressionEvaluation = false;
      } else if (commandType === ControlCommand.CommandType.EvalOutput &&
          this.state.evaluationStack.length)
      {
        // If the expression turned out to be empty, there may not be anything on the stack
        const output = this.state.PopEvaluationStack();
        // Functions may evaluate to Void, in which if (we skip output
        if (!(output instanceof Void)) {
          // TODO: Should we really always blanket convert to string?
          // It would be okay to have numbers in the output stream the
          // only problem is when exporting text for viewing, it skips over numbers etc.
          const text = new StringValue(output.toString());
          this.state.PushToOutputStream(text);
        }
      } else if (commandType === ControlCommand.CommandType.NoOp ||
          ControlCommand.CommandType.Duplicate)
      {
        this.state.PushEvaluationStack(this.state.PeekEvaluationStack());
      } else if (ControlCommand.CommandType.PopEvaluatedValue) {
        this.state.PopEvaluationStack();
      } else if (ControlCommand.CommandType.PopFunction ||
          ControlCommand.CommandType.PopTunnel)
      {
        const popFuncType = ControlCommand.CommandType.PopFunction;
				const popType = evalCommand.commandType === popFuncType ?
          PushPopType.Function :
          PushPopType.Tunnel;

				let overrideTunnelReturnTarget: DivertTargetValue | null = null;
				if (popType == PushPopType.Tunnel) {
					const popped = this.state.PopEvaluationStack();
					// overrideTunnelReturnTarget = popped as DivertTargetValue;
					overrideTunnelReturnTarget = asOrNull(popped, DivertTargetValue);
					if (overrideTunnelReturnTarget === null) {
						this.Assert(
              popped instanceof Void,
              `Expected void if ->-> doesn't override target.`,
            );
					}
				}

				if (this.state.TryExitFunctionEvaluationFromGame()) {
          return true;
        } else if (this.state.callStack.currentElement.type !== popType ||
            !this.state.callStack.canPop)
        {
					const names: Map<PushPopType, string> = new Map();
					names.set(PushPopType.Function, 'function return statement (~ return)');
					names.set(PushPopType.Tunnel, 'tunnel onwards statement (->->)');

          const expected = this.state.callStack.canPop ?
            names.get(this.state.callStack.currentElement.type) :
						'end of flow (-> END or choice)';

          const errorMsg = `Found ${names.get(popType)} when expecting ` +
            `${expected}.`;

					this.Error(errorMsg);
				} else {
					this.state.PopCallStack();

					if (overrideTunnelReturnTarget) {
            this.state.divertedPointer = this.PointerAtPath(overrideTunnelReturnTarget.targetPath);
          }
				}
			} else if (commandType === ControlCommand.CommandType.BeginString) {
				this.state.PushToOutputStream(evalCommand);
				this.Assert(
          this.state.inExpressionEvaluation === true,
          'Expected to be in an expression when evaluating a string.',
        );

				this.state.inExpressionEvaluation = false;
      } else if (commandType === ControlCommand.CommandType.EndString) {
				let contentStackForString: InkObject[] = [];

				let outputCountConsumed = 0;
				for (let ii = this.state.outputStream.length - 1; ii >= 0; ii -= 1) {
					const obj = this.state.outputStream[ii];
					outputCountConsumed += 1;

					/* var command = obj as ControlCommand; */
					const command = asOrNull(obj, ControlCommand);
					if (command && command.commandType === ControlCommand.CommandType.BeginString) {
            return false;
          }

					if (obj instanceof StringValue) {
						contentStackForString.push(obj);
					}
				}

				/* Consume the content that was produced for this string. */
				this.state.PopFromOutputStream(outputCountConsumed);

				/* The C# version uses a Stack for contentStackForString, but we're
				 * using a simple array, so we need to reverse it before using it. */
				contentStackForString = contentStackForString.reverse();

				// Build string out of the content we collected
				const sb = new StringBuilder();
				for (let c of contentStackForString) {
					sb.Append(c.toString());
				}

				// Return to expression evaluation (from content mode)
				this.state.inExpressionEvaluation = true;
				this.state.PushEvaluationStack(new StringValue(sb.toString()));
			} else if (commandType === ControlCommand.CommandType.ChoiceCount) {
				const choiceCount = this.state.generatedChoices.length;
				this.state.PushEvaluationStack(new IntValue(choiceCount));
      } else if (ControlCommand.CommandType.Turns) {
        const intVal = new IntValue(this.state.currentTurnIndex + 1);
        this.state.PushEvaluationStack(intVal);
      } else if (ControlCommand.CommandType.TurnsSince ||
          ControlCommand.CommandType.ReadCount)
      {
				const target = this.state.PopEvaluationStack();
				if (!(target instanceof DivertTargetValue)) {
          const extraNote = target instanceof IntValue ?
            '' :
            `. Did you accidentally pass a read count ('knot_name') instead ` +
              `of a target ('-> knot_name')?`;

					this.Error(
            'TURNS_SINCE / READ_COUNT expected a divert target (knot, ' +
              `stitch, label name), but saw ${target}${extraNote}`,
          );
        }

				/* var divertTarget = target as DivertTargetValue; */
				const divertTarget = asOrThrows(target, DivertTargetValue);
        /* var container = ContentAtPath(divertTarget.targetPath).correctObj as Container; */
        const { correctObj } = this.ContentAtPath(divertTarget.targetPath);
				const container = asOrNull(correctObj, Container);

				let eitherCount;
				if (container !== null) {
          eitherCount = commandType === ControlCommand.CommandType.TurnsSince ?
            this.TurnsSinceForContainer(container) :
            this.VisitCountForContainer(container);
				} else {
          eitherCount = commandType === ControlCommand.CommandType.TurnsSince ?
            -1 :
            0;

					this.Warning(
            `Failed to find container for ${evalCommand.toString()} lookup ` +
              `at ${divertTarget.targetPath.toString()}.`,
          );
				}

				this.state.PushEvaluationStack(new IntValue(eitherCount));
			} else if (commandType === ControlCommand.CommandType.Random) {
				const maxInt = asOrNull(this.state.PopEvaluationStack(), IntValue);
				const minInt = asOrNull(this.state.PopEvaluationStack(), IntValue);

				if (minInt === null || !(minInt instanceof IntValue)) {
          return this.Error('Invalid value for minimum parameter of ' +
            'RANDOM(min, max).');
        }

				if (maxInt === null || !(maxInt instanceof IntValue)) {
          return this.Error('Invalid value for maximum parameter of RANDOM(min, max).');
        } else if (maxInt.value === null) {
          /* Originally a primitive type, but here, can be null.
           * TODO: Replace by default value? */
          return throwNullException('maxInt.value');
        } else if (minInt.value === null) {
          return throwNullException('minInt.value');
        }

				const randomRange = maxInt.value - minInt.value + 1;
				if (randomRange <= 0) {
          this.Error(`RANDOM was called with minimum as ${minInt.value} and ` +
            `maximum as ${maxInt.value}. The maximum must be larger.`,
          );
        }

				const resultSeed = this.state.storySeed + this.state.previousRandom;
				const random = new PRNG(resultSeed);

				const nextRandom = random.next();
				const chosenValue = (nextRandom % randomRange) + minInt.value;
				this.state.PushEvaluationStack(new IntValue(chosenValue));
        /* Next random number (rather than keeping the Random object
         * around). */
				this.state.previousRandom = nextRandom;
      } else if (ControlCommand.CommandType.SeedRandom) {
				let seed = asOrNull(this.state.PopEvaluationStack(), IntValue);
				if (seed === null || !(seed instanceof IntValue)) {
          return this.Error('Invalid value passed to SEED_RANDOM.');
        }

				/* Originally a primitive type, but here, can be null.
				 * TODO: Replace by default value? */
				if (seed.value === null) {
          return throwNullException('minInt.value');
        }

				this.state.storySeed = seed.value;
				this.state.previousRandom = 0;
				this.state.PushEvaluationStack(new Void());
			} else if (ControlCommand.CommandType.VisitIndex) {
        const ptrContainer = this.state.currentPointer.container;
				const count = this.VisitCountForContainer(ptrContainer) - 1;
        this.state.PushEvaluationStack(new IntValue(count));
      } else if (ControlCommand.CommandType.SequenceShuffleIndex) {
				const shuffleIndex = this.NextSequenceShuffleIndex();
        this.state.PushEvaluationStack(new IntValue(shuffleIndex));
      } else if (ControlCommand.CommandType.StartThread) {
        /* Handled in main step function. */
        return false;
      } else if (ControlCommand.CommandType.Done) {
        /* We may exist in the context of the initial
         * act of creating the thread, or in the context of
         * evaluating the content. */
				if (this.state.callStack.canPopThread) {
					this.state.callStack.PopThread();
				} else {
          /* In normal flow - allow safe exit without warning. */
					this.state.didSafeExit = true;

					/* Stop flow in current thread. */
          this.state.currentPointer = Pointer.Null;

          /* Fire all registered callbacks. */
          this.__performDoneCallbacks();
				}
      } else if (ControlCommand.CommandType.End) {
        /* Force flow to end completely. */
        this.state.ForceEnd();

        /* Fire all registered callbacks. */
        this.__performDoneCallbacks();
			} else if (ControlCommand.CommandType.ListFromInt) {
				// var intVal = state.PopEvaluationStack () as IntValue;
				const intVal = asOrNull(this.state.PopEvaluationStack(), IntValue);
				// var listNameVal = state.PopEvaluationStack () as StringValue;
				let listNameVal = asOrThrows(this.state.PopEvaluationStack(), StringValue);

				if (intVal === null) {
					throw new StoryException('Passed non-integer when creating a list element from a numerical value.');
				}

				let generatedListValue = null;

				if (this.listDefinitions === null) {
          return throwNullException('this.listDefinitions');
        }

				const {
          exists,
          result,
        } = this.listDefinitions.TryListGetDefinition(listNameVal.value, null);

        if (exists) {
					// Originally a primitive type, but here, can be null.
					// TODO: Replace by default value?
					if (intVal.value === null) {
            return throwNullException('minInt.value');
          }

					const {
            exists,
            result: foundResult,
          } = result!.TryGetItemWithValue(
            intVal.value,
            InkListItem.Null,
          );

					if (exists) {
						generatedListValue = new ListValue(foundResult, intVal.value);
					}
				} else {
					throw new StoryException('Failed to find LIST called ' + listNameVal.value);
				}

				if (generatedListValue === null) {
          generatedListValue = new ListValue();
        }

				this.state.PushEvaluationStack(generatedListValue);
			} else if (ControlCommand.CommandType.ListRange) {
				let max = asOrNull(this.state.PopEvaluationStack(), Value);
				let min = asOrNull(this.state.PopEvaluationStack(), Value);

				/* var targetList = state.PopEvaluationStack () as ListValue; */
				const targetList = asOrNull(
          this.state.PopEvaluationStack(),
          ListValue,
        );

				if (targetList === null || min === null || max === null) {
          throw new StoryException(
            'Expected list, minimum and maximum for LIST_RANGE',
          );
        }

				if (targetList.value === null) {
          return throwNullException('targetList.value');
        }

				const result = targetList.value.ListWithSubRange(
          min.valueObject,
          max.valueObject,
        );

				this.state.PushEvaluationStack(new ListValue(result));
      } else if (commandType === ControlCommand.CommandType.ListRandom) {
				let listVal = this.state.PopEvaluationStack() as ListValue;
				if (listVal === null) {
          throw new StoryException('Expected list for LIST_RANDOM');
        }

				const { value: list } = listVal;
				let newList: InkList | null = null;
				if (list === null) {
          throw throwNullException('list');
        } else if (!list.Count) {
					newList = new InkList();
				} else {
					/* Generate a random index for the element to take. */
					const resultSeed = this.state.storySeed + this.state.previousRandom;
					const random = new PRNG(resultSeed);
					const nextRandom = random.next();
					const listItemIndex = nextRandom % list.Count;

					/* This bit is a little different from the original
					 * C# code, since iterators do not work in the same way.
					 * First, we iterate listItemIndex - 1 times, calling next().
					 * The listItemIndex-th time is made outside of the loop,
					 * in order to retrieve the value. */
          let listEnumerator = list.entries();
					for (let ii = 0; ii <= listItemIndex - 1; ii += 1) {
						listEnumerator.next();
          }

					const [
            serializedKey,
            value,
          ] = listEnumerator.next().value;

          const key = InkListItem.fromSerializedKey(serializedKey); 

					/* Origin list is simply the origin of the one element */
					if (key.originName === null) {
            return throwNullException('randomItem.Key.originName');
          }

					newList = new InkList(key.originName, this);
					newList.Add(key, value);

					this.state.previousRandom = nextRandom;
        }

        this.state.PushEvaluationStack(new ListValue(newList));
      } else {
        this.Error(`Unhandled ControlCommand: ${evalCommand}`);
      }

      return true;
  };

  public readonly __handleVariableAssignment = (
    varAssignment: VariableAssignment,
  ) => {
    this.state.variablesState.Assign(
      varAssignment,
      this.state.PopEvaluationStack(),
    );

    return true;
  };

  public readonly __handleVariableReference = (varRef: VariableReference) => {
    let foundValue = null;

    if (varRef.pathForCount !== null) {
      // Explicit read count value
      let container = varRef.containerForCount;
      let count = this.VisitCountForContainer(container);
      foundValue = new IntValue(count);
    } else {
      // Normal variable reference
      foundValue = this.state.variablesState.GetVariableWithName(varRef.name);
      if (foundValue == null) {
        let defaultVal = this.state.variablesState.TryGetDefaultVariableValue (varRef.name);
        if (defaultVal != null) {
          this.Warning(
            `Variable not found in save state: "${varRef.name}", but seems ` +
              `to have been newly created. Assigning value from latest ` +
              `ink's declaration: ${defaultVal}.`,
          );

          foundValue = defaultVal;

          /* Save for future usage, preventing future errors. Only do this for
           * variables that are known to be globals, not those that may be
           * missing temps. */
          this.state.variablesState.SetGlobal(varRef.name, foundValue);
        } else {
          this.Warning(
            `Variable not found: "${varRef.name}". Using default value of 0 ` +
              `(false). This can happen with temporary variables if the ` +
              `declaration hasn't yet been hit.`,
          );

          foundValue = new IntValue(0);
        }
      }
    }

    this.state.PushEvaluationStack(foundValue);

    return true;
  };

  public readonly __handleNativeFunctionCall = ({
    Call,
    numberOfParameters,
  }: NativeFunctionCall) => {
    const funcParams = this.state.PopEvaluationStack(numberOfParameters);
    const result = Call(funcParams);
    this.state.PushEvaluationStack(result);

    return true;
  };

  private readonly __registeredDoneCallbacks: Array<
    (story: this) => void
  > = [];

  public readonly __registerDoneCallback = (
    callback: (story: this) => void,
  ) => {
    this.__registeredDoneCallbacks.push(
      assertValid(
        callback,
        'The value passed to StoryWithDoneEvent was not a function.',
        (func) => typeof func === 'function',
      )
    );
  };

  public readonly __performDoneCallbacks = () => (
    this.__registeredDoneCallbacks.forEach((callback) => callback(this))
  );
}
