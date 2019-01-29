# Permutation

A component which presents a permutation (a shuffled copy) of the pieces of input content.

## Example

```javascript
<Permutation pick={2}>
  {/* children */}
  {[
    'one',
    'two',
    'three',
    'four',
  ]}
</Permutation>
```

## Property arguments

* `children: (ReactNodeArray)`: A list of content to be presented in shuffled order.
* `pick?: (number)`: The number of items in the list that should be displayed.