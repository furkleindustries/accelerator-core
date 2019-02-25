# Delay

A component that does not render its contents on-screen until after a specified timeout has elapsed. Can either render nothing at all, or an invisible component which takes up space in the document flow, before it renders the finalized content.

## Example

```javascript
<Delay
  className="test"
  renderWithZeroOpacity={true}
  timeout={2000}
>
  {/* children */}
  I will not appear for at least two seconds.
</Delay>
```

## Property arguments

* `children (ReactNodeWithoutNullOrUndefined)`: Any content you'd like to delay rendering visibly (or to the page at all).
* `timeout (number)`: The minimum number of milliseconds that the component will wait before visibly rendering the child content. Note that, due to the fundamental behavior of JavaScript's timeouts, it is impossible to guarantee it won't take longer than this amount to finalize rendering.
* `className (string, optional)`: An optional, extra class that will be passed on to the rendered container element.
* `renderWithZeroOpacity (boolean)`: Determines whether the container element is rendered into the document invisibly when the component is rendered, or whether nothing at all is rendered until the timeout elapses. If there is content below the `Delay` component, rendering nothing will result in a page reflow when the timeout elapses.
