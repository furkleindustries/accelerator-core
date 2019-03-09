# ClickDisappear

A component that, when clicked, disappears. Note that while the content will not be visible (technically, it will have no opacity), it will still exist within the document and take up space within the flow of the page.

## Example

```javascript
<ClickDisappear
  className={classnames('test')}
  fadeOutDuration={500}
>
  {/* children */}
  I slowly fade out from full opacity.
</ClickDisappear>
```

## Property arguments

* `children (ReactNodeWithoutNullOrUndefined)`: The content that will initially appear at full opacity.
* `fadeOutDuration (number)`: The number of milliseconds the fade-out will take to complete.
* `className (string, optional)`: An optional, extra class that will be passed on to the rendered container element.
