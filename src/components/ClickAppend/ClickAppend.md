# ClickAppend

A component that, when clicked, appends a new piece of content to itself.

## Example

```javascript
<ClickAppend
  className="test"
  toAppend="I show up after the first content."
>
  {/* children */}
  I show up first.
</ClickAppend>
```

## Property arguments

* `children (ReactNode)`: The content that will appear at render-time.
* `toAppend (ReactNode)`: The content which, after the user clicks the component, will be placed after the child content.
* `className (string, optional)`: An optional, extra class that will be passed on to the rendered container element.
