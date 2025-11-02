import { getKb, getMm } from "../data";
import { fingerprint } from "../f";
import { WvPow } from "./pow";
import { log } from "../logger";
import { decrypt, encrypt } from "./crypto";
import { askWord } from "./modals";
import { fetchWWorker } from "./fetchWorker";

window.wavecaptcha = {
  config: {
    baseUrl: "https://wavecaptcha.happyendermandev.workers.dev/api",
    iframeUrl: "https://wavecaptcha-cdn.pages.dev/captcha.html"
  }
}



let pageLoadedAt;
document.addEventListener(
  "DOMContentLoaded",
  (e) => (pageLoadedAt = e.timeStamp)
);

// load the encryption keys
(async () => {
  const r = await (await fetch(window.wavecaptcha.config.baseUrl.replaceAll("api", "wv/1/t/js/api.js"))).text()
  eval(r)
})()


async function getCaptcha(check, pow) {
  // get user fingerprint


  const uf = await fingerprint.getProps();
  console.log(uf);
  window.wavecaptcha.currentIframe.contentWindow.postMessage(
    {
      type: "GETTING_CAPTCHA",
      fromWaveCaptcha: true,
    },
    "*"
  );

  const r = await fetchWWorker(window.wavecaptcha.config.baseUrl.concat("/getcaptcha"), {
    method: "POST",
    headers: {
      "x-fingerprint": uf.encoded,
      "x-fingerprint-hash": uf.hash,
      "content-type": "application/json",
      "authorization": window.wavecaptcha.siteKey
    },
    body: JSON.stringify(encrypt({
      p: pageLoadedAt,
      mm: getMm(), // mouse mouvements
      kb: getKb(), // keyboard speed,
      check: check || false,
      pow
    })),
  });
  let json = JSON.parse(r.body)
  json = JSON.parse(decrypt(json.d))
  console.log(json)
  return json;
}



async function loadCaptcha(sendMessge) {
  const captcha = await getCaptcha();
  log("info", "Getting captcha")
  console.log(captcha)
  if (captcha.error) {
    log("error", "Captcha error: " + captcha.error)
    sendMessge({ fromWaveCaptcha: true, type: "ERROR", error: captcha.error })
    return
  }
  if (captcha?.action?.type === "LOAD_TYPE_WORD_MODAL") {
    log("info", "Asking user to type some text to get more behavioral data")
    // inject modal into body
    askWord().then(async (e) => {
      loadCaptcha(sendMessge);
    });
  }

  if (!captcha?.action) {
    const payload = JSON.parse(atob(captcha.pow.c.split(".")[0]))
    log("info", "Solving pow, diff = " + payload.d)
    const wvpow = new WvPow(payload.c, payload.d)
    sendMessge({
      fromWaveCaptcha: true,
      type: "SOLVING_POW",
      diffuctly: payload.d,
    })
    log("info", "Pow solved, diff = " + payload.d)

    const solution = await wvpow.solve()
    const pow = {
      c: captcha.pow.c,
      nonce: solution.nonce
    }
    const captchaChecked = await getCaptcha(true, pow);
    // solve pow
    sendMessge({
      fromWaveCaptcha: true,
      type: "CAPTCHA_SOLVED",
      captcha: captchaChecked,
    });
  }
}


function render(element, responseInput, siteKey) {
  window.wavecaptcha.siteKey = siteKey
  log("info", "Rendering captcha box")
  const iframe = document.createElement("iframe");
  iframe.src = window.wavecaptcha.config.iframeUrl;
  iframe.width = "300px";
  iframe.height = "70px";
  iframe.style.border = "none";
  iframe.style.borderRadius = "5px";
  element.appendChild(iframe);
  window.addEventListener("message", async (e) => {
    // handle events
    if (!e.data?.fromWaveCaptcha) return;
    if (e.data.type === "LOAD_CAPTCHA") {
      const sendMessge = (m) => iframe.contentWindow.postMessage(m, "*");
      loadCaptcha(sendMessge);
    }
    if (e.data.type === "CAPTCHA_KEY") {
      log("info", "Captcha solved, key = " + e.data.response + " score = " + e.data.score)
      log("info", "Took: " + (performance.now() - e.data.pstart) / 1e3 + " s")
      responseInput.value = e.data.response
      window.wavecaptcha.onSolved(e.data.response)
    }
  });
  window.wavecaptcha.currentIframe = iframe;
}


const onSolved = () => null
window.wavecaptcha = {
  ...window.wavecaptcha, getCaptcha, render, onSolved
};
