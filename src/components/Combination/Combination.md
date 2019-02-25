# Combination

A component which presents a combination of the source input.

## Example

```javascript
<Combination pick={3}>
  {/* children */}
  {[
    'one',
    'two',
    'three',
    'four',
  ]}
</Combination>
```

## Property arguments

* `children (ReactNodeWithoutNullOrUndefined[])`: A list of content to be presented in shuffled order.
* `pick? (number)`: The number of items in the list that should be displayed.