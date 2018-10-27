# NOf

A component which takes N elements from the `children` array at random.

## Example

```javascript
<NOf n={2}>
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

* `children (ReactNodeArray)`: The list of content from which the random N elements will be drawn. An exception will be thrown if the length of children is less than `n`.
* `n (number)`: The number of the children to display.
