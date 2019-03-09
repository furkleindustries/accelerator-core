# ClickReplace

A component that, when clicked, replaces the initial piece of content with another. This component is essentially identical to the component it calls, `Clicker`, and is here solely for clarity of purpose relative to a lower-level component.

## Example

```javascript
<ClickReplace
  className={classnames("test")}
  replaceWith="I show up after click."
>
  {/* children */}
  I show up on render.
</ClickReplace>
```

## Property arguments

* `children (ReactNodeWithoutNullOrUndefined)`: The content that will appear at render-time.
* `replaceWith (ReactNodeWithoutNullOrUndefined)`: The content which, after the user clicks the component, will replace the original content.
* `className (string, optional)`: An optional, extra class that will be passed on to the rendered container element.
