# Clicker

A lower-level component which allows any piece of content to be replaced with any other piece of content when the component is clicked. Every other `Click*` component is a higher-order component which renders this one with relevant arguments.

## Example

```javascript
<Clicker
  className={classnames('test')}
  contentAfterClick="I am here after click."
>
  {/* children */}
  I am here before click.
</Clicker>
```

## Property arguments

* `children (ReactNodeWithoutNullOrUndefined)`: The content that will appear at render-time.
* `contentAfterClick (ReactNodeWithoutNullOrUndefined)`: The content that will appear after the user clicks the component.
* `className (string, optional)`: An optional, extra class that will be passed on to the rendered container element.
