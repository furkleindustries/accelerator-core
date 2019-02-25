# Cycler

A component that, when clicked, replaces the initial piece of content with another. This component is essentially identical to the component it calls, `Clicker`, and is here solely for clarity of purpose relative to a lower-level component.

## Example

```javascript
<Cycler
  className="test"
  notify
>
  {/* children */}
  {[
    <span>first</span>,
    2,
    'third',
  ]}
</Cycler>
```

## Property arguments

* `children (ReactNodeWithoutNullOrUndefined[])`: A list of any valid content that will be cycled through each time the component is clicked.
* `className (string, optional)`: An optional, extra class name that will be passed on to the rendered container element.
* `notifyOfChange ((current: ReactNodeWithoutNullOrUndefined, index?: number) => void, optional)`: An optional function which is fired by the `Cycler` instance whenever it cycles, passing the current content and its index to the function. This allows, for example, the `CyclingLink` component to optionally set an arbitrary state property to the value of the `Cycler`'s current text. 
