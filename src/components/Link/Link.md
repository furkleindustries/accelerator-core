# Link

The most fundamental component in the Accelerator framework. This component, when clicked, takes the user to another passage.

## Example

```javascript
<Link
  className="test"
  passageName="passage2"
  tags={[
    'one',
    {
      key: 'two',
      value: 'arbitrary value',
    }
  ]}
>
  {/* children */}
  This is a link.
</Link>
```

## Property arguments

* `children (ReactNodeWithoutNullOrUndefined)`: The content that will be clicked to trigger the link.
* `passageName (string)`: The name of the passage to navigate to when the link is clicked.
* `className (string, optional)`: An optional, extra class that will be passed on to the rendered container element.
* `tags (Tag[], optional)`: An optional array of tags that allow you to tag transitions between passages in a similar manner as you would the passages themselves. This can be useful for reusing visual transitions, or whatever else you see fit.
