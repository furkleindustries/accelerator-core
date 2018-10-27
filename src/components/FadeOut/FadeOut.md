# FadeOut

A component that renders at full opacity and eases towards zero opacity over a specified period.

## Example

```javascript
<FadeOut
  className="test"
  duration={2000}
>
  {/* children */}
  This content will start out fully visible and become invisible over two seconds.
</FadeOut>
```

## Property arguments

* `children (ReactNode)`: Any content you'd like to fade out.
* `duration (number)`: The minimum number of milliseconds that the component will take to ease from full opacity to zero opacity.
* `className (string, optional)`: An optional, extra class that will be passed on to the rendered container element.