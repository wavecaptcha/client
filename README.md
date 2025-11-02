# client
The library used to render the captcha and give challenges to users

## Usage:
add this to the html head tag
```html
<script src="/dist.min.js"></script>
```

```js
window.wavecaptcha.render(
  // the captcha div containerr
  document.getElementById("captcha"),
  document.getElementById("wvcaptcha-response"), // captcha response token gets added here (set on value)
  // your site key
  "a251e6c3-f581-4c59-b2ee-e6832e29cd18" (this is just the demo site key)
);
```
if you don't want to save the token on a input, just put `{value:null}` in the second argument

wait for solve: 
```js
window.wavecaptcha.onSolved = (token) => {
 console.log(token)
})
```
