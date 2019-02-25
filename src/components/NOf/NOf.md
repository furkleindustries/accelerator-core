# NOf

A component which takes N elements from the `children` array at random, with optional one-time shuffling of the children. Note that revisiting this passage is likely to produce different output, but rewinding to it will preserve the same output.

## Example

```javascript
<NOf
  n={2}
  shuffle={true}
>
  {/* children */}
  {[
    'one',
    'two',
    'three',
    'four',
  ]}
</NOf>
```

## Property arguments

* `children (ReactNodeWithoutNullOrUndefined[])`: The list of content from which the random N elements will be drawn. An exception will be thrown if the length of children is less than `n`.
* `n (number)`: The number of the children to display.
* `shuffle? (boolean)`: Determines whether the array will be shuffled or not.