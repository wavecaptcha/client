import { log } from "./logger";

function md5cycle(x, k) {
  var a = x[0],
    b = x[1],
    c = x[2],
    d = x[3];

  a = ff(a, b, c, d, k[0], 7, -680876936);
  d = ff(d, a, b, c, k[1], 12, -389564586);
  c = ff(c, d, a, b, k[2], 17, 606105819);
  b = ff(b, c, d, a, k[3], 22, -1044525330);
  a = ff(a, b, c, d, k[4], 7, -176418897);
  d = ff(d, a, b, c, k[5], 12, 1200080426);
  c = ff(c, d, a, b, k[6], 17, -1473231341);
  b = ff(b, c, d, a, k[7], 22, -45705983);
  a = ff(a, b, c, d, k[8], 7, 1770035416);
  d = ff(d, a, b, c, k[9], 12, -1958414417);
  c = ff(c, d, a, b, k[10], 17, -42063);
  b = ff(b, c, d, a, k[11], 22, -1990404162);
  a = ff(a, b, c, d, k[12], 7, 1804603682);
  d = ff(d, a, b, c, k[13], 12, -40341101);
  c = ff(c, d, a, b, k[14], 17, -1502002290);
  b = ff(b, c, d, a, k[15], 22, 1236535329);

  a = gg(a, b, c, d, k[1], 5, -165796510);
  d = gg(d, a, b, c, k[6], 9, -1069501632);
  c = gg(c, d, a, b, k[11], 14, 643717713);
  b = gg(b, c, d, a, k[0], 20, -373897302);
  a = gg(a, b, c, d, k[5], 5, -701558691);
  d = gg(d, a, b, c, k[10], 9, 38016083);
  c = gg(c, d, a, b, k[15], 14, -660478335);
  b = gg(b, c, d, a, k[4], 20, -405537848);
  a = gg(a, b, c, d, k[9], 5, 568446438);
  d = gg(d, a, b, c, k[14], 9, -1019803690);
  c = gg(c, d, a, b, k[3], 14, -187363961);
  b = gg(b, c, d, a, k[8], 20, 1163531501);
  a = gg(a, b, c, d, k[13], 5, -1444681467);
  d = gg(d, a, b, c, k[2], 9, -51403784);
  c = gg(c, d, a, b, k[7], 14, 1735328473);
  b = gg(b, c, d, a, k[12], 20, -1926607734);

  a = hh(a, b, c, d, k[5], 4, -378558);
  d = hh(d, a, b, c, k[8], 11, -2022574463);
  c = hh(c, d, a, b, k[11], 16, 1839030562);
  b = hh(b, c, d, a, k[14], 23, -35309556);
  a = hh(a, b, c, d, k[1], 4, -1530992060);
  d = hh(d, a, b, c, k[4], 11, 1272893353);
  c = hh(c, d, a, b, k[7], 16, -155497632);
  b = hh(b, c, d, a, k[10], 23, -1094730640);
  a = hh(a, b, c, d, k[13], 4, 681279174);
  d = hh(d, a, b, c, k[0], 11, -358537222);
  c = hh(c, d, a, b, k[3], 16, -722521979);
  b = hh(b, c, d, a, k[6], 23, 76029189);
  a = hh(a, b, c, d, k[9], 4, -640364487);
  d = hh(d, a, b, c, k[12], 11, -421815835);
  c = hh(c, d, a, b, k[15], 16, 530742520);
  b = hh(b, c, d, a, k[2], 23, -995338651);

  a = ii(a, b, c, d, k[0], 6, -198630844);
  d = ii(d, a, b, c, k[7], 10, 1126891415);
  c = ii(c, d, a, b, k[14], 15, -1416354905);
  b = ii(b, c, d, a, k[5], 21, -57434055);
  a = ii(a, b, c, d, k[12], 6, 1700485571);
  d = ii(d, a, b, c, k[3], 10, -1894986606);
  c = ii(c, d, a, b, k[10], 15, -1051523);
  b = ii(b, c, d, a, k[1], 21, -2054922799);
  a = ii(a, b, c, d, k[8], 6, 1873313359);
  d = ii(d, a, b, c, k[15], 10, -30611744);
  c = ii(c, d, a, b, k[6], 15, -1560198380);
  b = ii(b, c, d, a, k[13], 21, 1309151649);
  a = ii(a, b, c, d, k[4], 6, -145523070);
  d = ii(d, a, b, c, k[11], 10, -1120210379);
  c = ii(c, d, a, b, k[2], 15, 718787259);
  b = ii(b, c, d, a, k[9], 21, -343485551);

  x[0] = add32(a, x[0]);
  x[1] = add32(b, x[1]);
  x[2] = add32(c, x[2]);
  x[3] = add32(d, x[3]);
}

function cmn(q, a, b, x, s, t) {
  a = add32(add32(a, q), add32(x, t));
  return add32((a << s) | (a >>> (32 - s)), b);
}

function ff(a, b, c, d, x, s, t) {
  return cmn((b & c) | (~b & d), a, b, x, s, t);
}

function gg(a, b, c, d, x, s, t) {
  return cmn((b & d) | (c & ~d), a, b, x, s, t);
}

function hh(a, b, c, d, x, s, t) {
  return cmn(b ^ c ^ d, a, b, x, s, t);
}

function ii(a, b, c, d, x, s, t) {
  return cmn(c ^ (b | ~d), a, b, x, s, t);
}

function md51(s) {
  txt = "";
  var n = s.length,
    state = [1732584193, -271733879, -1732584194, 271733878],
    i;
  for (i = 64; i <= s.length; i += 64) {
    md5cycle(state, md5blk(s.substring(i - 64, i)));
  }
  s = s.substring(i - 64);
  var tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (i = 0; i < s.length; i++)
    tail[i >> 2] |= s.charCodeAt(i) << (i % 4 << 3);
  tail[i >> 2] |= 0x80 << (i % 4 << 3);
  if (i > 55) {
    md5cycle(state, tail);
    for (i = 0; i < 16; i++) tail[i] = 0;
  }
  tail[14] = n * 8;
  md5cycle(state, tail);
  return state;
}

/* there needs to be support for Unicode here,
 * unless we pretend that we can redefine the MD-5
 * algorithm for multi-byte characters (perhaps
 * by adding every four 16-bit characters and
 * shortening the sum to 32 bits). Otherwise
 * I suggest performing MD-5 as if every character
 * was two bytes--e.g., 0040 0025 = @%--but then
 * how will an ordinary MD-5 sum be matched?
 * There is no way to standardize text to something
 * like UTF-8 before transformation; speed cost is
 * utterly prohibitive. The JavaScript standard
 * itself needs to look at this: it should start
 * providing access to strings as preformed UTF-8
 * 8-bit unsigned value arrays.
 */
function md5blk(s) {
  /* I figured global was faster.   */
  var md5blks = [],
    i; /* Andy King said do it this way. */
  for (i = 0; i < 64; i += 4) {
    md5blks[i >> 2] =
      s.charCodeAt(i) +
      (s.charCodeAt(i + 1) << 8) +
      (s.charCodeAt(i + 2) << 16) +
      (s.charCodeAt(i + 3) << 24);
  }
  return md5blks;
}

var hex_chr = "0123456789abcdef".split("");

function rhex(n) {
  var s = "",
    j = 0;
  for (; j < 4; j++)
    s += hex_chr[(n >> (j * 8 + 4)) & 0x0f] + hex_chr[(n >> (j * 8)) & 0x0f];
  return s;
}

function hex(x) {
  for (var i = 0; i < x.length; i++) x[i] = rhex(x[i]);
  return x.join("");
}

function md5(s) {
  return hex(md51(s));
}

function add32(a, b) {
  return (a + b) & 0xffffffff;
}

if (md5("hello") != "5d41402abc4b2a76b9719d911017c592") {
  function add32(x, y) {
    var lsw = (x & 0xffff) + (y & 0xffff),
      msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xffff);
  }
}
async function sha256(message) {
  // fallback to md5 if sha256 not supported
  // this is also useful to tell if browser has no crypto support
  if (!crypto?.subtle) return md5(message);
  const msgBuffer = new TextEncoder().encode(message);

  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);

  const hashArray = Array.from(new Uint8Array(hashBuffer));

  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
}
class Fingerprint {
  constructor() { }
  hash(data) {
    return sha256(data);
  }
  async testWebDriver(ua) {
    const currentValue = navigator.webdriver;
    const props = Object.getOwnPropertyDescriptor(
      Navigator.prototype,
      "webdriver"
    );

    let iframeValue;
    let iframeToString;
    // check against iframe
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.srcdoc = "discord";
    document.body.appendChild(iframe);
    iframeValue = iframe.contentWindow.navigator.webdriver;
    iframeToString = iframe.contentWindow.Function.prototype.toString;
    const webDrivergetter = iframeToString.call(props.get);
    let isStealth = !!iframe.contentWindow.self.get?.toString();
    const result = {
      isModified: !webDrivergetter.includes("[native code]"),
      value: currentValue,
      iframeValue: iframeValue,
      phantom: !!(
        window.callPhantom ||
        window._phantom ||
        /PhantomJS/i.test(ua)
      ),
      puppeteerExtraStealth: isStealth,
      isSeleinum: typeof document.$cdc_asdjflasutopfhvcZLmcfl_ !== "undefined",
    };
    return {
      ...result,
      isHuman: Object.values(result).every((e) => e === false),
    };
  }
  async getUserAgent() {
    const txt = await fetch("https://wavecaptcha.happyendermandev.workers.dev/api/ua").then((r) =>
      r.text()
    );
    return txt;
  }

  async getCanvasHash() {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    ctx.fillRect(10, 20, 30, 30);
    ctx.fillText("This is a fingerprint test, to avoid bots🎉🎉", 10, 10);
    const data = canvas.toDataURL();
    return this.hash(data);
  }
  async getAudioHash() {
    //navigator.mediaDevices?.enumerateDevices?.();

    const audioCtx = new AudioContext();

    const osc = audioCtx.createOscillator();
    osc.type = "sine";
    osc.frequency.value = 440;

    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 2048;

    osc.connect(analyser);
    osc.start();

    const freqData = new Float32Array(analyser.frequencyBinCount);
    const sumData = new Float32Array(analyser.frequencyBinCount);

    const frames = 60; // ~1 second at 60fps

    for (let i = 0; i < frames; i++) {
      analyser.getFloatFrequencyData(freqData);
      for (let j = 0; j < freqData.length; j++) {
        sumData[j] += freqData[j];
      }
      await new Promise((r) => setTimeout(r, 16));
    }

    // Average the collected frames
    for (let j = 0; j < sumData.length; j++) {
      sumData[j] /= frames;
    }

    const strData = Array.from(sumData)
      .map((v) => v.toFixed(2))
      .join(",");
    const hashBuffer = this.hash(strData);

    osc.stop();
    return hashBuffer;
  }

  check(obj, saveTo, name) {
    const props = obj?.userAgent
      ? Object.keys(Object.getPrototypeOf(obj))
      : Object.getOwnPropertyNames(obj);
    for (let prop of props) {
      try {
        if (typeof obj[prop] === "function") {
          saveTo[name][prop] = obj[prop]
            .toString()
            .includes("[native code]");
        }
      } catch { }
    }
  }
  isEqual(arr) {
    return arr.every((v, i) => v === arr[i === arr.length - 1 ? i : i + 1]);
  }
  mobileCheck() {
    let check = false;
    (function (a) {
      if (
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
          a
        ) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
          a.substr(0, 4)
        )
      )
        check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
  }
  async detectAdBlock() {
    const result = {};
    try {
      await fetch("https://googlesyndication.com");
      result.urls = false;
    } catch {
      result.urls = true;
    }
    const fakeAdDiv = document.createElement("div");
    fakeAdDiv.classList.add("ads");
    document.querySelector("body").appendChild(fakeAdDiv);
    result.elements =
      fakeAdDiv.style.display === "none" ||
      fakeAdDiv.hidden ||
      !fakeAdDiv.offsetHeight;
    return result;
  }
  detectExtensions() {
    const exts = [];
    const textarea = document.createElement("textarea");
    textarea.style.display = "none";
    document.querySelector("body").appendChild(textarea);
    if (textarea.getAttribute("grammarly-editor-plugin"))
      exts.push("Grammarly");
    if (window.ethereum) exts.push("Ethereum wallet extension");
    if (window.solana) exts.push("Solana Wallet extension");
    if (window.__VUE_DEVTOOLS_GLOBAL_HOOK__) exts.push("Vue.js devtools");
    if (window.__ngDevTools__) exts.push("Angular Devtools");
    if (window.__REACT_DEVTOOLS_GLOBAL_HOOK__)
      exts.push("React Developer Tools");
    if (window.__REDUX_DEVTOOLS_EXTENSION__) exts.push("Redux Devtools");
    if (window.__APOLLO_DEVTOOLS_GLOBAL_HOOK__) exts.push("Apollo Devtools");
    if (window.languagetool) exts.push("LanguageTool");

    return exts;
  }
  detectFonts() {
    const fonts = [
      "cursive",
      "fantasy",
      "monospace",
      "sans-serif",
      "serif",
      ".Keyboard",
      "Al Bayan",
      "American Typewriter",
      "AmericanTypewriter",
      "AmericanTypewriter-Bold",
      "AmericanTypewriter-Condensed",
      "AmericanTypewriter-CondensedBold",
      "AmericanTypewriter-CondensedLight",
      "AmericanTypewriter-Light",
      "Andale Mono",
      "Apple Braille",
      "Apple Chancery",
      "Apple LiGothic",
      "Apple LiSung",
      "Apple Symbols",
      "AppleGothic",
      "AppleMyungjo",
      "Arial",
      "Arial Black",
      "Arial Hebrew",
      "Arial Narrow",
      "Arial Rounded MT Bold",
      "Arial Unicode MS",
      "Arial-BoldItalicMT",
      "Arial-BoldMT",
      "Arial-ItalicMT",
      "ArialHebrew",
      "ArialHebrew-Bold",
      "ArialMT",
      "ArialRoundedMTBold",
      "Ayuthaya",
      "Baghdad",
      "Baskerville",
      "Baskerville-Bold",
      "Baskerville-BoldItalic",
      "Baskerville-Italic",
      "Baskerville-SemiBold",
      "Baskerville-SemiBoldItalic",
      "BiauKai",
      "Big Caslon",
      "Brush Script MT",
      "Chalkboard",
      "Chalkduster",
      "Charcoal CY",
      "Cochin",
      "Cochin-Bold",
      "Cochin-BoldItalic",
      "Cochin-Italic",
      "Comic Sans MS",
      "Copperplate",
      "Copperplate-Bold",
      "Copperplate-Light",
      "Corsiva Hebrew",
      "Courier",
      "Courier New",
      "Courier-Bold",
      "Courier-BoldOblique",
      "Courier-Oblique",
      "CourierNewPS-BoldItalicMT",
      "CourierNewPS-BoldMT",
      "CourierNewPS-ItalicMT",
      "CourierNewPSMT",
      "DecoType Naskh",
      "Devanagari MT",
      "Didot",
      "Didot-Bold",
      "Didot-Italic",
      "Euphemia UCAS",
      "EuphemiaUCAS",
      "EuphemiaUCAS-Bold",
      "EuphemiaUCAS-Italic",
      "Futura",
      "Futura-CondensedExtraBold",
      "Futura-CondensedMedium",
      "Futura-Medium",
      "Futura-MediumItalic",
      "GB18030 Bitmap",
      "Geeza Pro",
      "GeezaPro",
      "GeezaPro-Bold",
      "Geneva",
      "Geneva CY",
      "Georgia",
      "Georgia-Bold",
      "Georgia-BoldItalic",
      "Georgia-Italic",
      "Gill Sans",
      "GillSans",
      "GillSans-Bold",
      "GillSans-BoldItalic",
      "GillSans-Italic",
      "GillSans-Light",
      "GillSans-LightItalic",
      "Gujarati MT",
      "GungSeo",
      "Gurmukhi MT",
      "HeadLineA",
      "Hei",
      "Heiti SC",
      "Heiti TC",
      "Helvetica",
      "Helvetica CY",
      "Helvetica Neue",
      "Helvetica-Bold",
      "Helvetica-BoldOblique",
      "Helvetica-Light",
      "Helvetica-LightOblique",
      "Helvetica-Oblique",
      "HelveticaNeue",
      "HelveticaNeue-Bold",
      "HelveticaNeue-BoldItalic",
      "HelveticaNeue-CondensedBlack",
      "HelveticaNeue-CondensedBold",
      "HelveticaNeue-Italic",
      "HelveticaNeue-Light",
      "HelveticaNeue-LightItalic",
      "HelveticaNeue-Medium",
      "HelveticaNeue-UltraLight",
      "HelveticaNeue-UltraLightItalic",
      "Herculanum",
      "HiraMinProN-W3",
      "HiraMinProN-W6",
      "Hiragino Kaku Gothic Pro",
      "Hiragino Kaku Gothic ProN",
      "Hiragino Kaku Gothic Std",
      "Hiragino Kaku Gothic StdN",
      "Hiragino Maru Gothic Pro",
      "Hiragino Maru Gothic ProN",
      "Hiragino Mincho Pro",
      "Hiragino Mincho ProN",
      "Hiragino Sans GB",
      "Hoefler Text",
      "HoeflerText-Black",
      "HoeflerText-BlackItalic",
      "HoeflerText-Italic",
      "HoeflerText-Regular",
      "Impact",
      "InaiMathi",
      "Kai",
      "Kailasa",
      "Kokonor",
      "Krungthep",
      "KufiStandardGK",
      "LastResort",
      "LiHei Pro",
      "LiSong Pro",
      "Lucida Grande",
      "Marker Felt",
      "MarkerFelt-Thin",
      "MarkerFelt-Wide",
      "Menlo",
      "Menlo-Bold",
      "Menlo-BoldItalic",
      "Menlo-Italic",
      "Menlo-Regular",
      "Microsoft Sans Serif",
      "Monaco",
      "Mshtakan",
      "Nadeem",
      "New Peninim MT",
      "Optima",
      "Optima-Bold",
      "Optima-BoldItalic",
      "Optima-ExtraBlack",
      "Optima-Italic",
      "Optima-Regular",
      "Osaka",
      "Osaka-Mono",
      "PCMyungjo",
      "Papyrus",
      "Papyrus-Condensed",
      "PilGi",
      "Plantagenet Cherokee",
      "Raanana",
      "STFangsong",
      "STHeiti",
      "STKaiti",
      "STSong",
      "STXihei",
      "Sathu",
      "Silom",
      "Skia",
      "Symbol",
      "Tahoma",
      "Thonburi",
      "Thonburi-Bold",
      "Times",
      "Times New Roman",
      "TimesNewRomanPS-BoldItalicMT",
      "TimesNewRomanPS-BoldMT",
      "TimesNewRomanPS-ItalicMT",
      "TimesNewRomanPSMT",
      "Trebuchet MS",
      "Trebuchet-BoldItalic",
      "TrebuchetMS",
      "TrebuchetMS-Bold",
      "TrebuchetMS-Italic",
      "Verdana",
      "Verdana-Bold",
      "Verdana-BoldItalic",
      "Verdana-Italic",
      "Zapf Dingbats",
      "ZapfDingbatsITC",
      "Zapfino",
      "Apple Color Emoji",
      "AppleColorEmoji",
      "Bangla MN",
      "Bangla Sangam MN",
      "Damascus",
      "DamascusBold",
      "Devanagari Sangam MN",
      "DevanagariSangamMN",
      "DevanagariSangamMN-Bold",
      "Gujarati Sangam MN",
      "GujaratiSangamMN",
      "Gurmukhi MN",
      "GurmukhiMN",
      "GurmukhiMN-Bold",
      "Kannada MN",
      "Kannada Sangam MN",
      "KannadaSangamMN",
      "Kefa",
      "Khmer MN",
      "Khmer Sangam MN",
      "KhmerSangamMN",
      "Lao MN",
      "Lao Sangam MN",
      "LaoSangamMN",
      "Malayalam MN",
      "Malayalam Sangam MN",
      "MalayalamSangamMN",
      "Myanmar MN",
      "Myanmar Sangam MN",
      "Nanum Brush Script",
      "Nanum Gothic",
      "Nanum Myeongjo",
      "Nanum Pen Script",
      "NanumGothic",
      "NanumGothicExtraBold",
      "NanumMyeongjo",
      "Noteworthy",
      "Noteworthy-Bold",
      "Noteworthy-Light",
      "Oriya MN",
      "Oriya Sangam MN",
      "OriyaSangamMN",
      "PT Sans",
      "PT Sans Caption",
      "PT Sans Narrow",
      "Palatino",
      "Palatino-Bold",
      "Palatino-BoldItalic",
      "Palatino-Italic",
      "Palatino-Roman",
      "STIXGeneral",
      "STIXGeneral-Bold",
      "STIXGeneral-BoldItalic",
      "STIXGeneral-Italic",
      "STIXGeneral-Regular",
      "STIXIntegralsD",
      "STIXIntegralsD-Bold",
      "STIXIntegralsD-Regular",
      "STIXIntegralsSm",
      "STIXIntegralsSm-Bold",
      "STIXIntegralsSm-Regular",
      "STIXIntegralsUp",
      "STIXIntegralsUp-Bold",
      "STIXIntegralsUp-Regular",
      "STIXIntegralsUpD",
      "STIXIntegralsUpD-Bold",
      "STIXIntegralsUpD-Regular",
      "STIXIntegralsUpSm",
      "STIXIntegralsUpSm-Bold",
      "STIXIntegralsUpSm-Regular",
      "STIXNonUnicode",
      "STIXNonUnicode-Bold",
      "STIXNonUnicode-BoldItalic",
      "STIXNonUnicode-Italic",
      "STIXNonUnicode-Regular",
      "STIXSizeFiveSym",
      "STIXSizeFiveSym-Regular",
      "STIXSizeFourSym",
      "STIXSizeFourSym-Bold",
      "STIXSizeFourSym-Regular",
      "STIXSizeOneSym",
      "STIXSizeOneSym-Bold",
      "STIXSizeOneSym-Regular",
      "STIXSizeThreeSym",
      "STIXSizeThreeSym-Bold",
      "STIXSizeThreeSym-Regular",
      "STIXSizeTwoSym",
      "STIXSizeTwoSym-Bold",
      "STIXSizeTwoSym-Regular",
      "STIXVariants",
      "STIXVariants-Bold",
      "STIXVariants-Regular",
      "Sinhala MN",
      "Sinhala Sangam MN",
      "SinhalaSangamMN",
      "Tamil MN",
      "Tamil Sangam MN",
      "TamilSangamMN",
      "Telugu MN",
      "Telugu Sangam MN",
      "TeluguSangamMN",
      "Apple SD Gothic Neo",
      "AppleSDGothicNeo-Bold",
      "AppleSDGothicNeo-Light",
      "AppleSDGothicNeo-Medium",
      "AppleSDGothicNeo-Regular",
      "AppleSDGothicNeo-SemiBold",
      "AppleSDGothicNeo-Thin",
      "AppleSDGothicNeo-UltraLight",
      "Avenir",
      "Avenir Next",
      "Avenir Next Condensed",
      "Avenir-Black",
      "Avenir-BlackOblique",
      "Avenir-Book",
      "Avenir-BookOblique",
      "Avenir-Heavy",
      "Avenir-HeavyOblique",
      "Avenir-Light",
      "Avenir-LightOblique",
      "Avenir-Medium",
      "Avenir-MediumOblique",
      "Avenir-Oblique",
      "Avenir-Roman",
      "AvenirNext-Bold",
      "AvenirNext-BoldItalic",
      "AvenirNext-DemiBold",
      "AvenirNext-DemiBoldItalic",
      "AvenirNext-Heavy",
      "AvenirNext-HeavyItalic",
      "AvenirNext-Italic",
      "AvenirNext-Medium",
      "AvenirNext-MediumItalic",
      "AvenirNext-Regular",
      "AvenirNext-UltraLight",
      "AvenirNext-UltraLightItalic",
      "AvenirNextCondensed-Bold",
      "AvenirNextCondensed-BoldItalic",
      "AvenirNextCondensed-DemiBold",
      "AvenirNextCondensed-DemiBoldItalic",
      "AvenirNextCondensed-Heavy",
      "AvenirNextCondensed-HeavyItalic",
      "AvenirNextCondensed-Italic",
      "AvenirNextCondensed-Medium",
      "AvenirNextCondensed-MediumItalic",
      "AvenirNextCondensed-Regular",
      "AvenirNextCondensed-UltraLight",
      "AvenirNextCondensed-UltraLightItalic",
      "Chalkboard SE",
      "ChalkboardSE-Bold",
      "ChalkboardSE-Light",
      "ChalkboardSE-Regular",
      "GujaratiSangamMN-Bold",
      "Gurmukhi Sangam MN",
      "Kaiti SC",
      "KannadaSangamMN-Bold",
      "MalayalamSangamMN-Bold",
      "Marion",
      "OriyaSangamMN-Bold",
      "SinhalaSangamMN-Bold",
      "Songti SC",
      "TamilSangamMN-Bold",
      "Yuppy SC",
      "Yuppy TC",
      "Al Nile",
      "Al Tarikh",
      "AlNile",
      "AlNile-Bold",
      "ArialHebrew-Light",
      "Athelas",
      "Baoli SC",
      "Beirut",
      "Charter",
      "DIN Alternate",
      "DIN Condensed",
      "DamascusMedium",
      "DamascusSemiBold",
      "Diwan Kufi",
      "Diwan Thuluth",
      "DiwanMishafi",
      "Farah",
      "Farisi",
      "GillSans-SemiBold",
      "GillSans-SemiBoldItalic",
      "GillSans-UltraBold",
      "Hannotate SC",
      "Hannotate TC",
      "HanziPen SC",
      "HanziPen TC",
      "HelveticaNeue-MediumItalic",
      "HelveticaNeue-Thin",
      "HelveticaNeue-ThinItalic",
      "Iowan Old Style",
      "IowanOldStyle-Bold",
      "IowanOldStyle-BoldItalic",
      "IowanOldStyle-Italic",
      "IowanOldStyle-Roman",
      "Kaiti TC",
      "Lantinghei SC",
      "Lantinghei TC",
      "Libian SC",
      "Mishafi",
      "Muna",
      "PT Mono",
      "PT Serif",
      "PT Serif Caption",
      "Sana",
      "Savoye LET",
      "SavoyeLetPlain",
      "Seravek",
      "Snell Roundhand",
      "SnellRoundhand",
      "SnellRoundhand-Black",
      "SnellRoundhand-Bold",
      "Songti TC",
      "Superclarendon",
      "Thonburi-Light",
      "Waseem",
      "Wawati SC",
      "Wawati TC",
      "Weibei SC",
      "Weibei TC",
      "Xingkai SC",
      "YuGothic",
      "YuMincho",
      "Yuanti SC",
      "Arial Bold",
      "Arial Bold Italic",
      "Arial Italic",
      "Comic Sans MS Bold",
      "Courier New Bold",
      "Courier New Bold Italic",
      "Courier New Italic",
      "Estrangelo Edessa",
      "Franklin Gothic Medium",
      "Franklin Gothic Medium Italic",
      "Gautami",
      "Georgia Bold",
      "Georgia Bold Italic",
      "Georgia Italic",
      "Latha",
      "Lucida Console",
      "Lucida Sans Unicode",
      "MV Boli",
      "Mangal",
      "Marlett",
      "Palatino Linotype",
      "Palatino Linotype Bold",
      "Palatino Linotype Bold Italic",
      "Palatino Linotype Italic",
      "Raavi",
      "Shruti",
      "Sylfaen",
      "Tahoma Bold",
      "Times New Roman Bold",
      "Times New Roman Bold Italic",
      "Times New Roman Italic",
      "Trebuchet MS Bold",
      "Trebuchet MS Bold Italic",
      "Trebuchet MS Italic",
      "Tunga",
      "Verdana Bold",
      "Verdana Bold Italic",
      "Verdana Italic",
      "Webdings",
      "Wingdings",
      "Aharoni Bold",
      "Andalus",
      "Angsana New",
      "Angsana New Bold",
      "Angsana New Bold Italic",
      "Angsana New Italic",
      "AngsanaUPC",
      "Arabic Transparent",
      "Arabic Transparent Bold",
      "Batang",
      "BatangChe",
      "Browallia New",
      "Browallia New Bold",
      "Browallia New Bold Italic",
      "Browallia New Italic",
      "BrowalliaUPC",
      "Cordia New",
      "Cordia New Bold",
      "Cordia New Bold Italic",
      "Cordia New Italic",
      "CordiaUPC",
      "David",
      "David Bold",
      "David Transparent",
      "DilleniaUPC",
      "DilleniaUPC Bold",
      "DilleniaUPC Bold Italic",
      "DilleniaUPC Italic",
      "Dotum",
      "DotumChe",
      "EucrosiaUPC",
      "EucrosiaUPC Bold",
      "EucrosiaUPC Bold Italic",
      "EucrosiaUPC Italic",
      "Fixed Miriam Transparent",
      "FrankRuehl",
      "FreesiaUPC",
      "FreesiaUPC Bold",
      "FreesiaUPC Bold Italic",
      "FreesiaUPC Italic",
      "Gulim",
      "GulimChe",
      "Gungsuh",
      "GungsuhChe",
      "IrisUPC",
      "IrisUPC Bold",
      "IrisUPC Bold Italic",
      "IrisUPC Italic",
      "JasmineUPC",
      "JasmineUPC Bold",
      "JasmineUPC Bold Italic",
      "JasmineUPC Italic",
      "KodchiangUPC",
      "KodchiangUPC Bold",
      "KodchiangUPC Bold Italic",
      "KodchiangUPC Italic",
      "Levenim MT",
      "Levenim MT Bold",
      "LilyUPC",
      "LilyUPC Bold",
      "LilyUPC Bold Italic",
      "LilyUPC Italic",
      "MS Gothic",
      "MS Mincho",
      "MS PGothic",
      "MS PMincho",
      "MS UI Gothic",
      "MingLiU",
      "Miriam",
      "Miriam Fixed",
      "Miriam Transparent",
      "NSimSun",
      "Narkisim",
      "PMingLiU",
      "Rod",
      "Rod Transparent",
      "SimHei",
      "SimSun",
      "Simplified Arabic",
      "Simplified Arabic Bold",
      "Simplified Arabic Fixed",
      "Traditional Arabic",
      "Traditional Arabic Bold",
      "AngsanaUPC Bold",
      "AngsanaUPC Bold Italic",
      "AngsanaUPC Italic",
      "Aparajita",
      "Aparajita Bold",
      "Aparajita Bold Italic",
      "Aparajita Italic",
      "Arabic Typesetting",
      "BrowalliaUPC Bold",
      "BrowalliaUPC Bold Italic",
      "BrowalliaUPC Italic",
      "FontAwesome",
      "Calibri",
      "Calibri Bold",
      "Calibri Bold Italic",
      "Calibri Italic",
      "Calibri Light",
      "Calibri Light Italic",
      "Cambria",
      "Cambria Bold",
      "Cambria Bold Italic",
      "Cambria Italic",
      "Cambria Math",
      "Candara",
      "Candara Bold",
      "Candara Bold Italic",
      "Candara Italic",
      "Consolas",
      "Consolas Bold",
      "Consolas Bold Italic",
      "Consolas Italic",
      "Constantia",
      "Constantia Bold",
      "Constantia Bold Italic",
      "Constantia Italic",
      "Corbel",
      "Corbel Bold",
      "Corbel Bold Italic",
      "Corbel Italic",
      "CordiaUPC Bold",
      "CordiaUPC Bold Italic",
      "CordiaUPC Italic",
      "DFKai-SB",
      "DaunPenh",
      "DokChampa",
      "Ebrima",
      "Ebrima Bold",
      "Euphemia",
      "FangSong",
      "Gabriola",
      "Gautami Bold",
      "Gisha",
      "Gisha Bold",
      "Iskoola Pota",
      "IskoolaPota-Bold",
      "KaiTi",
      "Kalinga",
      "Kalinga Bold",
      "Kartika",
      "Kartika Bold",
      "Khmer UI",
      "Khmer UI Bold",
      "Kokila",
      "Kokila Bold",
      "Kokila Bold Italic",
      "Kokila Italic",
      "Lao UI",
      "Lao UI Bold",
      "Latha Bold",
      "Leelawadee",
      "Leelawadee Bold",
      "Malgun Gothic",
      "Malgun Gothic Bold",
      "Mangal Bold",
      "Meiryo",
      "Meiryo Bold",
      "Meiryo Bold Italic",
      "Meiryo Italic",
      "Meiryo UI",
      "Meiryo UI Bold",
      "Meiryo UI Bold Italic",
      "Meiryo UI Italic",
      "Microsoft Himalaya",
      "Microsoft JhengHei",
      "Microsoft JhengHei Bold",
      "Microsoft New Tai Lue",
      "Microsoft New Tai Lue Bold",
      "Microsoft PhagsPa",
      "Microsoft PhagsPa Bold",
      "Microsoft Tai Le",
      "Microsoft Tai Le Bold",
      "Microsoft Uighur",
      "Microsoft YaHei",
      "Microsoft YaHei Bold",
      "Microsoft Yi Baiti",
      "MingLiU-ExtB",
      "MingLiU_HKSCS",
      "MingLiU_HKSCS-ExtB",
      "Mongolian Baiti",
      "MoolBoran",
      "Nyala",
      "PMingLiU-ExtB",
      "Raavi Bold",
      "Sakkal Majalla",
      "Sakkal Majalla Bold",
      "Segoe Print",
      "Segoe Print Bold",
      "Segoe Script",
      "Segoe Script Bold",
      "Segoe UI",
      "Segoe UI Bold",
      "Segoe UI Bold Italic",
      "Segoe UI Italic",
      "Segoe UI Light",
      "Segoe UI Semibold",
      "Segoe UI Symbol",
      "Shonar Bangla",
      "Shonar Bangla Bold",
      "Shruti Bold",
      "SimSun-ExtB",
      "Tunga Bold",
      "Utsaah",
      "Utsaah Bold",
      "Utsaah Bold Italic",
      "Utsaah Italic",
      "Vani",
      "Vani Bold",
      "Vijaya",
      "Vijaya Bold",
      "Vrinda",
      "Vrinda Bold",
      "Aldhabi",
      "Comic Sans MS Bold Italic",
      "Comic Sans MS Italic",
      "Gadugi",
      "Gadugi Bold",
      "Iskoola Pota Bold",
      "Microsoft JhengHei UI",
      "Microsoft JhengHei UI Bold",
      "Microsoft Uighur Bold",
      "Microsoft YaHei UI",
      "Microsoft YaHei UI Bold",
      "Myanmar Text",
      "Nirmala UI",
      "Nirmala UI Bold",
      "Segoe UI Light Italic",
      "Segoe UI Semibold Italic",
      "Segoe UI Semilight",
      "Segoe UI Semilight Italic",
      "Urdu Typesetting",
      ".Helvetica LT MM",
      ".Times LT MM",
      "Academy Engraved LET",
      "AcademyEngravedLetPlain",
      "Bodoni 72",
      "Bodoni 72 Oldstyle",
      "Bodoni 72 Smallcaps",
      "Bodoni Ornaments",
      "BodoniOrnamentsITCTT",
      "BodoniSvtyTwoITCTT-Bold",
      "BodoniSvtyTwoITCTT-Book",
      "BodoniSvtyTwoITCTT-BookIta",
      "BodoniSvtyTwoOSITCTT-Bold",
      "BodoniSvtyTwoOSITCTT-Book",
      "BodoniSvtyTwoOSITCTT-BookIt",
      "BodoniSvtyTwoSCITCTT-Book",
      "Bradley Hand",
      "BradleyHandITCTT-Bold",
      "DB LCD Temp",
      "Kailasa-Bold",
      "Party LET",
      "PartyLetPlain",
      "Avenir Black",
      "Avenir Black Oblique",
      "Avenir Book",
      "Avenir Heavy",
      "Avenir Light",
      "Avenir Medium",
      "Avenir Next Condensed Demi Bold",
      "Avenir Next Condensed Heavy",
      "Avenir Next Condensed Medium",
      "Avenir Next Condensed Ultra Light",
      "Avenir Next Demi Bold",
      "Avenir Next Heavy",
      "Avenir Next Medium",
      "Avenir Next Ultra Light",
      "Helvetica Bold",
      "Helvetica Bold Oblique",
      "Helvetica Light",
      "Helvetica Neue Bold Italic",
      "Helvetica Neue Light Italic",
      "Helvetica Oblique",
      "Hiragino Kaku Gothic ProN W3",
      "Hiragino Kaku Gothic ProN W6",
      "Hiragino Mincho ProN W3",
      "Hiragino Mincho ProN W6",
      "DamascusLight",
      "Kohinoor Devanagari",
      "KohinoorDevanagari-Light",
      "-apple-system",
      "Charter Black",
      "HiraginoSans-W3",
      "HiraginoSans-W6",
      "KohinoorBangla-Light",
      "KohinoorBangla-Regular",
      "KohinoorBangla-Semibold",
      "KohinoorDevanagari-Regular",
      "KohinoorDevanagari-Semibold",
      "KohinoorTelugu-Light",
      "KohinoorTelugu-Medium",
      "KohinoorTelugu-Regular",
      "Noto Sans Lisu",
      "Noto Sans Mandaic",
      "Noto Sans Tagalog",
      "Noto Sans Tai Viet",
      "PingFangHK-Light",
      "PingFangHK-Medium",
      "PingFangHK-Regular",
      "PingFangHK-Semibold",
      "PingFangHK-Thin",
      "PingFangHK-Ultralight",
      "PingFangSC-Light",
      "PingFangSC-Medium",
      "PingFangSC-Regular",
      "PingFangSC-Semibold",
      "PingFangSC-Thin",
      "PingFangSC-Ultralight",
      "PingFangTC-Light",
      "PingFangTC-Medium",
      "PingFangTC-Regular",
      "PingFangTC-Semibold",
      "PingFangTC-Thin",
      "PingFangTC-Ultralight",
      "Seravek ExtraLight",
      "Seravek Light",
      "Seravek Medium",
      "System Font",
      "System Font Bold",
      "System Font Regular",
      "Droid Sans",
      "Goudy",
      "ITC Stone Serif",
      "sans-serif-condensed",
      "sans-serif-light",
      "sans-serif-thin",
      "Casual",
      "sans-serif-black",
      "sans-serif-condensed-light",
      "sans-serif-medium",
      "sans-serif-monospace",
      "sans-serif-smallcaps",
      "serif-monospace",
      "Abyssinica SIL",
      "Bitstream Charter",
      "Century Schoolbook L",
      "Courier 10 Pitch",
      "DejaVu Sans",
      "DejaVu Sans Mono",
      "DejaVu Serif",
      "Dingbats",
      "Droid Arabic Naskh",
      "Droid Sans Armenian",
      "Droid Sans Ethiopic",
      "Droid Sans Fallback",
      "Droid Sans Georgian",
      "Droid Sans Hebrew",
      "Droid Sans Japanese",
      "Droid Sans Mono",
      "Droid Sans Thai",
      "Droid Serif",
      "FreeMono",
      "FreeSans",
      "FreeSerif",
      "Garuda",
      "KacstArt",
      "KacstBook",
      "KacstDecorative",
      "KacstDigital",
      "KacstFarsi",
      "KacstLetter",
      "KacstNaskh",
      "KacstOffice",
      "KacstOne",
      "KacstPen",
      "KacstPoster",
      "KacstQurn",
      "KacstScreen",
      "KacstTitle",
      "KacstTitleL",
      "Kedage",
      "Khmer OS",
      "Khmer OS System",
      "Kinnari",
      "LKLUG",
      "Liberation Mono",
      "Liberation Sans",
      "Liberation Sans Narrow",
      "Liberation Serif",
      "Lohit Bengali",
      "Lohit Devanagari",
      "Lohit Gujarati",
      "Lohit Punjabi",
      "Lohit Tamil",
      "Loma",
      "Mallige",
      "Meera",
      "Mukti Narrow",
      "NanumBarunGothic",
      "Nimbus Mono L",
      "Nimbus Roman No9 L",
      "Nimbus Sans L",
      "Norasi",
      "OpenSymbol",
      "Padauk",
      "Padauk Book",
      "Phetsarath OT",
      "Pothana2000",
      "Purisa",
      "Rachana",
      "Rekha",
      "Saab",
      "Sawasdee",
      "Standard Symbols L",
      "TakaoPGothic",
      "Tibetan Machine Uni",
      "Tlwg Typist",
      "Tlwg Typo",
      "TlwgMono",
      "TlwgTypewriter",
      "URW Bookman L",
      "URW Chancery L",
      "URW Gothic L",
      "URW Palladio L",
      "Ubuntu",
      "Ubuntu Condensed",
      "Ubuntu Light",
      "Ubuntu Medium",
      "Ubuntu Mono",
      "Umpush",
      "Vemana2000",
      "Waree",
      "gargi",
      "mry_KacstQurn",
      "ori1Uni",
      "utkal",
      "AR PL UMing CN",
      "AR PL UMing HK",
      "AR PL UMing TW",
      "AR PL UMing TW MBE",
      "Caladea",
      "Cantarell",
      "Carlito",
      "Cursor",
      "DejaVu Sans Condensed",
      "DejaVu Sans Light",
      "DejaVu Serif Condensed",
      "Eeyek Unicode",
      "Jomolhari",
      "Khmer OS Content",
      "Lohit Assamese",
      "Lohit Kannada",
      "Lohit Malayalam",
      "Lohit Oriya",
      "Lohit Telugu",
      "Mingzat",
      "Noto Sans Meetei Mayek",
      "Noto Sans Tai Tham",
      "Nuosu SIL",
      "PakType Naqsh",
      "Utopia",
      "VL Gothic",
      "WenQuanYi Zen Hei",
      "WenQuanYi Zen Hei Mono",
      "WenQuanYi Zen Hei Sharp",
      "C059",
      "cmex10",
      "cmmi10",
      "cmr10",
      "cmsy10",
      "D050000L",
      "DejaVu Math TeX Gyre",
      "DejaVu Sans,DejaVu Sans Condensed",
      "DejaVu Sans,DejaVu Sans Light",
      "DejaVu Serif,DejaVu Serif Condensed",
      "dsrom10",
      "esint10",
      "eufm10",
      "Hack",
      "Lato",
      "Lato,Lato Black",
      "Lato,Lato Hairline",
      "Lato,Lato Heavy",
      "Lato,Lato Light",
      "Lato,Lato Medium",
      "Lato,Lato Semibold",
      "Lato,Lato Thin",
      "Minecraft",
      "msam10",
      "msbm10",
      "Nimbus Mono PS",
      "Nimbus Roman",
      "Nimbus Sans",
      "Nimbus Sans Narrow",
      "Noto Color Emoji",
      "Noto Kufi Arabic",
      "Noto Looped Lao,Noto Looped Lao Bold",
      "Noto Looped Lao,Noto Looped Lao Regular",
      "Noto Looped Lao UI,Noto Looped Lao UI Bold",
      "Noto Looped Lao UI,Noto Looped Lao UI Regular",
      "Noto Looped Thai,Noto Looped Thai Bold",
      "Noto Looped Thai,Noto Looped Thai Regular",
      "Noto Looped Thai UI,Noto Looped Thai UI Bold",
      "Noto Looped Thai UI,Noto Looped Thai UI Regular",
      "Noto Mono",
      "Noto Music",
      "Noto Naskh Arabic",
      "Noto Naskh Arabic UI",
      "Noto Nastaliq Urdu",
      "Noto Rashi Hebrew",
      "Noto Sans",
      "Noto Sans Adlam",
      "Noto Sans Adlam Unjoined",
      "Noto Sans Anatolian Hieroglyphs,Noto Sans AnatoHiero",
      "Noto Sans Arabic",
      "Noto Sans Arabic UI",
      "Noto Sans Armenian",
      "Noto Sans Avestan",
      "Noto Sans Balinese",
      "Noto Sans Bamum",
      "Noto Sans Bassa Vah",
      "Noto Sans Batak",
      "Noto Sans Bengali",
      "Noto Sans Bengali UI",
      "Noto Sans Bhaiksuki",
      "Noto Sans Brahmi",
      "Noto Sans Buginese",
      "Noto Sans Buhid",
      "Noto Sans Canadian Aboriginal,Noto Sans CanAborig",
      "Noto Sans Carian",
      "Noto Sans Caucasian Albanian,Noto Sans CaucAlban",
      "Noto Sans Chakma",
      "Noto Sans Cham",
      "Noto Sans Cherokee",
      "Noto Sans CJK HK",
      "Noto Sans CJK JP",
      "Noto Sans CJK KR",
      "Noto Sans CJK SC",
      "Noto Sans CJK TC",
      "Noto Sans Coptic",
      "Noto Sans Cuneiform",
      "Noto Sans Cypriot",
      "Noto Sans Deseret",
      "Noto Sans Devanagari",
      "Noto Sans Devanagari UI",
      "Noto Sans Display",
      "Noto Sans Duployan",
      "Noto Sans Egyptian Hieroglyphs,Noto Sans EgyptHiero",
      "Noto Sans Elbasan",
      "Noto Sans Elymaic",
      "Noto Sans Ethiopic",
      "Noto Sans Georgian",
      "Noto Sans Glagolitic",
      "Noto Sans Gothic",
      "Noto Sans Grantha",
      "Noto Sans Gujarati",
      "Noto Sans Gujarati UI",
      "Noto Sans Gunjala Gondi",
      "Noto Sans Gurmukhi",
      "Noto Sans Gurmukhi UI",
      "Noto Sans Hanifi Rohingya",
      "Noto Sans Hanunoo",
      "Noto Sans Hatran",
      "Noto Sans Hebrew",
      "Noto Sans Imperial Aramaic,Noto Sans ImpAramaic",
      "Noto Sans Indic Siyaq Numbers",
      "Noto Sans Inscriptional Pahlavi,Noto Sans InsPahlavi",
      "Noto Sans Inscriptional Parthian,Noto Sans InsParthi",
      "Noto Sans Javanese",
      "Noto Sans Kaithi",
      "Noto Sans Kannada",
      "Noto Sans Kannada UI",
      "Noto Sans Kayah Li",
      "Noto Sans Kharoshthi",
      "Noto Sans Khmer",
      "Noto Sans Khmer UI",
      "Noto Sans Khojki",
      "Noto Sans Khudawadi",
      "Noto Sans Lao",
      "Noto Sans Lao UI",
      "Noto Sans Lepcha",
      "Noto Sans Limbu",
      "Noto Sans Linear A",
      "Noto Sans Linear B",
      "Noto Sans Lycian",
      "Noto Sans Lydian",
      "Noto Sans Mahajani",
      "Noto Sans Malayalam",
      "Noto Sans Malayalam UI",
      "Noto Sans Manichaean",
      "Noto Sans Marchen",
      "Noto Sans Masaram Gondi",
      "Noto Sans Math",
      "Noto Sans Mayan Numerals",
      "Noto Sans Medefaidrin",
      "Noto Sans Mende Kikakui",
      "Noto Sans Meroitic",
      "Noto Sans Miao",
      "Noto Sans Modi",
      "Noto Sans Mongolian",
      "Noto Sans Mono",
      "Noto Sans Mono CJK HK",
      "Noto Sans Mono CJK JP",
      "Noto Sans Mono CJK KR",
      "Noto Sans Mono CJK SC",
      "Noto Sans Mono CJK TC",
      "Noto Sans Mro",
      "Noto Sans Multani",
      "Noto Sans Myanmar",
      "Noto Sans Myanmar UI",
      "Noto Sans Nabataean",
      "Noto Sans Newa",
      "Noto Sans New Tai Lue",
      "Noto Sans NKo",
      "Noto Sans Nushu",
      "Noto Sans Ogham",
      "Noto Sans Ol Chiki",
      "Noto Sans Old Hungarian,Noto Sans OldHung",
      "Noto Sans Old Italic",
      "Noto Sans Old North Arabian,Noto Sans OldNorArab",
      "Noto Sans Old Permic",
      "Noto Sans Old Persian",
      "Noto Sans Old Sogdian",
      "Noto Sans Old South Arabian,Noto Sans OldSouArab",
      "Noto Sans Old Turkic",
      "Noto Sans Oriya",
      "Noto Sans Oriya UI",
      "Noto Sans Osage",
      "Noto Sans Osmanya",
      "Noto Sans Pahawh Hmong",
      "Noto Sans Palmyrene",
      "Noto Sans Pau Cin Hau",
      "Noto Sans PhagsPa",
      "Noto Sans Phoenician",
      "Noto Sans Psalter Pahlavi,Noto Sans PsaPahlavi",
      "Noto Sans Rejang",
      "Noto Sans Runic",
      "Noto Sans Samaritan",
      "Noto Sans Saurashtra",
      "Noto Sans Sharada",
      "Noto Sans Shavian",
      "Noto Sans Siddham",
      "Noto Sans SignWriting,Noto Sans SignWrit",
      "Noto Sans Sinhala",
      "Noto Sans Sinhala UI",
      "Noto Sans Sogdian",
      "Noto Sans Sora Sompeng",
      "Noto Sans Soyombo",
      "Noto Sans Sundanese",
      "Noto Sans Syloti Nagri",
      "Noto Sans Symbols",
      "Noto Sans Symbols2",
      "Noto Sans Syriac",
      "Noto Sans Tagbanwa",
      "Noto Sans Tai Le",
      "Noto Sans Takri",
      "Noto Sans Tamil",
      "Noto Sans Tamil Supplement",
      "Noto Sans Tamil UI",
      "Noto Sans Telugu",
      "Noto Sans Telugu UI",
      "Noto Sans Thaana",
      "Noto Sans Thai",
      "Noto Sans Thai UI",
      "Noto Sans Tifinagh",
      "Noto Sans Tifinagh Adrar",
      "Noto Sans Tifinagh Agraw Imazighen",
      "Noto Sans Tifinagh Ahaggar",
      "Noto Sans Tifinagh Air",
      "Noto Sans Tifinagh APT",
      "Noto Sans Tifinagh Azawagh",
      "Noto Sans Tifinagh Ghat",
      "Noto Sans Tifinagh Hawad",
      "Noto Sans Tifinagh Rhissa Ixa",
      "Noto Sans Tifinagh SIL",
      "Noto Sans Tifinagh Tawellemmet",
      "Noto Sans Tirhuta",
      "Noto Sans Ugaritic",
      "Noto Sans Vai",
      "Noto Sans Wancho",
      "Noto Sans Warang Citi",
      "Noto Sans Yi",
      "Noto Sans Zanabazar Square,Noto Sans Zanabazar",
      "Noto Serif",
      "Noto Serif Ahom",
      "Noto Serif Armenian",
      "Noto Serif Balinese",
      "Noto Serif Bengali",
      "Noto Serif CJK HK",
      "Noto Serif CJK JP",
      "Noto Serif CJK KR",
      "Noto Serif CJK SC",
      "Noto Serif CJK TC",
      "Noto Serif Devanagari",
      "Noto Serif Display",
      "Noto Serif Dogra",
      "Noto Serif Ethiopic",
      "Noto Serif Georgian",
      "Noto Serif Grantha",
      "Noto Serif Gujarati",
      "Noto Serif Gurmukhi",
      "Noto Serif Hebrew",
      "Noto Serif Hmong Nyiakeng",
      "Noto Serif Kannada",
      "Noto Serif Khmer",
      "Noto Serif Khojki",
      "Noto Serif Lao",
      "Noto Serif Malayalam",
      "Noto Serif Myanmar",
      "Noto Serif Sinhala",
      "Noto Serif Tamil",
      "Noto Serif Tamil Slanted",
      "Noto Serif Tangut",
      "Noto Serif Telugu",
      "Noto Serif Thai",
      "Noto Serif Tibetan",
      "Noto Serif Yezidi",
      "Noto Traditional Nushu",
      "P052",
      "rsfs10",
      "Standard Symbols PS",
      "stmary10",
      "Ubuntu Sans",
      "Ubuntu Sans Mono",
      "URW Bookman",
      "URW Gothic",
      "wasy10",
      "Z003",
    ];
    function isFontAvailable(font) {
      const testString = "mmmmmmmmmmlli";
      const baseFonts = ["monospace", "serif", "sans-serif"];
      const testSize = "72px";

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // baseline widths
      const widths = {};
      for (const base of baseFonts) {
        ctx.font = `${testSize} ${base}`;
        widths[base] = ctx.measureText(testString).width;
      }

      // now test with custom font
      ctx.font = `${testSize} "${font}", monospace`;
      const width = ctx.measureText(testString).width;

      return !baseFonts.some((base) => width === widths[base]);
    }
    const result = [];
    for (let font of fonts) {
      if (isFontAvailable(font)) result.push(font);
    }
    return result;
  }
  getMath() {
    const e = Math;
    const custom = {
      acoshPf: (x) => e.log(x + e.sqrt(x * x - 1)),
      asinhPf: (x) => e.log(x + e.sqrt(x * x + 1)),
      atanhPf: (x) => e.log((1 + x) / (1 - x)) / 2,
      sinhPf: (x) => (e.exp(x) - 1 / e.exp(x)) / 2,
      coshPf: (x) => (e.exp(x) + 1 / e.exp(x)) / 2,
      tanhPf: (x) => (e.exp(2 * x) - 1) / (e.exp(2 * x) + 1),
      expm1Pf: (x) => e.exp(x) - 1,
      log1pPf: (x) => e.log(1 + x),
      powPI: (x) => e.pow(e.PI, x),
    };

    return {
      acos: e.acos(0.12312423423423424),
      acosh: e.acosh(1e308),
      acoshPf: custom.acoshPf(1e154),
      asin: e.asin(0.12312423423423424),
      asinh: e.asinh(1),
      asinhPf: custom.asinhPf(1),
      atanh: e.atanh(0.5),
      atanhPf: custom.atanhPf(0.5),
      atan: e.atan(0.5),
      sin: e.sin(-1e300),
      sinh: e.sinh(1),
      sinhPf: custom.sinhPf(1),
      cos: e.cos(10.000000000123),
      cosh: e.cosh(1),
      coshPf: custom.coshPf(1),
      tan: e.tan(-1e300),
      tanh: e.tanh(1),
      tanhPf: custom.tanhPf(1),
      exp: e.exp(1),
      expm1: e.expm1(1),
      expm1Pf: custom.expm1Pf(1),
      log1p: e.log1p(10),
      log1pPf: custom.log1pPf(10),
      powPI: custom.powPI(-100),
    };
  }

  detectRuntime() {
    // Browser detection
    if (typeof window !== "undefined" && typeof document !== "undefined") {
      if ("v8BreakIterator" in Intl) return "Browser (V8)";
      if (typeof InternalError === "function" && typeof uneval === "function")
        return "Browser (SpiderMonkey)";
      if (Intl.Collator.supportedLocalesOf("sr-Latn").length === 0)
        return "Browser (JavaScriptCore)";
      return "Browser (Unknown engine)";
    }

    // Web Worker detection
    if (typeof self !== "undefined" && typeof importScripts === "function") {
      return "Web Worker";
    }

    // Server / runtime environments
    try {
      if (typeof Deno?.version?.deno !== "undefined")
        return "Deno " + Deno.version.deno;
      if (typeof Bun?.version !== "undefined") return "Bun " + Bun.version;
      if (typeof process?.versions?.node !== "undefined") {
        if (
          typeof navigator !== "undefined" &&
          navigator.userAgent.includes("jsdom")
        )
          return "Node.js with jsdom (" + process.versions.node + ")";
        return "Node.js " + process.versions.node;
      }
    } catch { }

    return "Unknown runtime";
  }

  minimalFingerprint(fingerprint) {
    return {
      webdriver: {
        isHuman: fingerprint.webdriver?.isHuman,
      },
      userAgent: fingerprint.userAgent ?? "",
      userAgentMatches: fingerprint.userAgentMatches,
      isCanvaHashStable: fingerprint.isCanvaHashStable,
      isAudioHashStable: fingerprint.isAudioHashStable,
      browserFunctionsNative: fingerprint.browserFunctionsNative,
      isTimeZoneFuncModified: fingerprint.isTimeZoneFuncModified,
      isVM: fingerprint.isVM,
      plugins: fingerprint.plugins ?? [],
      maxTouchPoints: fingerprint.maxTouchPoints ?? 0,
      isMobile: fingerprint.isMobile,
      cryptoSupported: fingerprint.cryptoSupported,
    };
  }
  async getProps() {
    if (this.fp) log("info", "Fingerprint found on cache")
    if (this.fp) return this.fp

    log("info", "Generating fingerprint")
    if (typeof window?.wavecaptcha === "object")
      window.wavecaptcha.currentIframe.contentWindow.postMessage(
        {
          type: "FINGERPRINT_START",
          fromWaveCaptcha: true,
        },
        "*"
      );
    let props = {};
    const canvasHashes = [];
    const audioHashes = [];
    props.httpUserAgent = await this.getUserAgent();
    props.userAgent = navigator.userAgent;
    props.cookiesEnabled = navigator.cookieEnabled;
    props.deviceMemory = navigator.deviceMemory;
    props.languages = navigator.languages;
    props.webdriver = await this.testWebDriver(props.httpUserAgent);
    props.isMobile = this.mobileCheck();
    props.width = screen.width;
    props.fonts = this.detectFonts();
    props.height = screen.height;
    props.availWidth = screen.availWidth;
    props.availHeight = screen.availHeight;
    props.doNotTrack = navigator?.doNotTrack;
    props.timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    props.userAgentMatches = props.httpUserAgent === props.userAgent;
    props.runtime = this.detectRuntime();

    const c = document.createElement("canvas");
    const gl = c.getContext("webgl");
    let glInfo = {};
    if (gl) {
      const ext = gl.getExtension("WEBGL_debug_renderer_info");
      if (ext) {
        glInfo.vendor = gl.getParameter(ext.UNMASKED_VENDOR_WEBGL);
        glInfo.renderer = gl.getParameter(ext.UNMASKED_RENDERER_WEBGL);
      }
    }
    props.glInfo = glInfo;

    for (let i = 0; i < 3; i++) {
      try {
        canvasHashes.push(await this.getCanvasHash());
      } catch {
        canvasHashes.push("unknown");
      }
      try {
        audioHashes.push(await this.getAudioHash());
      } catch {
        audioHashes.push("unknown");
      }
    }
    props.browserFunctionsNative = { navigator: {}, window: {} };
    this.check(navigator, props.browserFunctionsNative, "navigator");
    this.check(window, props.browserFunctionsNative, "window");
    props.isTimeZoneFuncModified = !Intl.DateTimeFormat()
      .resolvedOptions.toString()
      .includes("[native code]");
    props.plugins = [...navigator.plugins];
    props.canvasHash = canvasHashes[2];
    props.audioHash = audioHashes[2];
    props.isCanvaHashStable = this.isEqual(canvasHashes);
    props.isAudioHashStable = this.isEqual(audioHashes);
    if (!props.isAudioHashStable) props.audioHash = "unstable";
    if (!props.isCanvaHashStable) props.canvasHash = "unstable";
    props.maxTouchPoints = navigator.maxTouchPoints;
    props.audioSimpleRate = new AudioContext().sampleRate;
    props.mediaDevices = await navigator.mediaDevices.enumerateDevices();
    props.isChromeInUserAgent =
      navigator.userAgent.includes("Chrome/") &&
      navigator.vendor === "Google Inc.";
    props.adblocker = await this.detectAdBlock();
    const VM_RENDERERS = [
      "Google SwiftShader",
      "SwiftShader",
      "Microsoft Basic Render Driver",
      "llvmpipe",
      "LLVMpipe",
      "Software Rasterizer",
      "WebKit WebGL",
      "ANGLE (Software Renderer)",
      "Mesa X11",
      "VirtualBox Graphics Adapter",
      "VMware SVGA",
      "Parallels Graphics Adapter",
      "QEMU Virtual GPU",
      "X.Org",
      "Gallium",
    ];
    props.isVM = VM_RENDERERS.some((renderer) =>
      props.glInfo.renderer.includes(renderer)
    );
    // little hack, check for known elements, variables etc
    props.math = this.getMath();
    // if no sha256 = uses md5
    props.hash = await sha256(JSON.stringify(props) + ":" + location.hostname);
    props.hashMethod = props.hash.length === 64 ? "sha256" : "md5";

    props.cryptoSupported = props.hashMethod === "sha256";
    const raw = JSON.stringify(this.minimalFingerprint(props));

    // provide minimal info to server so not privacy invasive
    props.encoded = btoa(raw);
    this.fp = props
    return props;
  }
}

const fingerprint = new Fingerprint();

export { fingerprint };
