# FadeIn

A component that renders at zero opacity and eases towards full opacity over a specified period.

## Example

```javascript
<FadeIn
  className="test"
  duration={2000}
>
  {/* children */}
  This content will start out invisible and become fully visible over two seconds.
</FadeIn>
```

## Property arguments

* `children (ReactNode)`: Any content you'd like to fade in.
* `duration (number)`: The minimum number of milliseconds that the component will take to ease from zero opacity to full opacity.
* `className (string, optional)`: An optional, extra class that will be passed on to the rendered container element.