# client

The library used to render the captcha and give challenges to users

## Usage:

add this to the html head tag

```html
<script src="https://wavecaptcha-cdn.pages.dev/dist.min.js"></script>
```

### render

```js
window.wavecaptcha.render(
  // the captcha div containerr
  document.getElementById("captcha"),
  document.getElementById("wvcaptcha-response"), // captcha response token gets added here (set on value)
  // your site key
  ""
);
```

if you don't want to save the token on a input, just put `{value:null}` in the second argument

### wait for solve:

```js
window.wavecaptcha.onSolved = (token) => {
 console.log(token)
})
```

### change base url of api

```js
window.wavecaptcha.baseUrl = "new base url";
```
