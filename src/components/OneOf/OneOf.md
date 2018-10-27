# OneOf

A component which takes a single element from the `children` array at random.

## Example

```javascript
<OneOf>
  {/* children */}
  {[
    'one',
    'two',
    'three',
    'four',
  ]}
</OneOf>
```

## Property arguments

* `children (ReactNodeArray)`: The list of content from which the random N elements will be drawn. An exception will be thrown if the length of children is less than `n`.
