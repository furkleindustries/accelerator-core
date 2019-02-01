# CyclingLink

A component that, when clicked, replaces the initial piece of content with another. This component is essentially identical to the component it calls, `Clicker`, and is here solely for clarity of purpose relative to a lower-level component.

## Example

```javascript
<CyclingLink
  className="test"
  variableToSet="myCycleVar"
>{[
  'one',
  'two',
  'three',
  'four',
]}</CyclingLink>
```

## Property arguments

* `children (string[])`: Each of the string choices that the link will cycle through on click.
* `className? (string)`: An optional, extra class that will be passed on to the rendered container element. Note that, regardless of whether this argument is provided, `cyclingLink` is still provided as a class to the container element (rendered by `Cycler`).
* `dontCallbackOnMount? (boolean)`: Prevents the component from calling the callback argument when the component is first mounted. Useless without also providing `callback`.
* `dontSetVariableOnMount? (boolean)`: Prevents the component from setting the variable whose name matches `variableToSet`. Useless without also providing `variableToSet`.
* `variableToSet? (string)`: The string corresponding to the state property name you would like to be updated with the current value of the link every time it cycles.
* `callback? ((current?: string) => void)`: A function which fires each time the cycling link completes its logic.
