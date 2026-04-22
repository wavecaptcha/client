import { log } from './logger';

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
    var txt = '';
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

function md5blk(s) {
    var md5blks = [],
        i;
    for (i = 0; i < 64; i += 4) {
        md5blks[i >> 2] =
            s.charCodeAt(i) +
            (s.charCodeAt(i + 1) << 8) +
            (s.charCodeAt(i + 2) << 16) +
            (s.charCodeAt(i + 3) << 24);
    }
    return md5blks;
}

var hex_chr = '0123456789abcdef'.split('');

function rhex(n) {
    var s = '',
        j = 0;
    for (; j < 4; j++)
        s +=
            hex_chr[(n >> (j * 8 + 4)) & 0x0f] + hex_chr[(n >> (j * 8)) & 0x0f];
    return s;
}

function hex(x) {
    for (var i = 0; i < x.length; i++) x[i] = rhex(x[i]);
    return x.join('');
}

function md5(s) {
    return hex(md51(s));
}

function add32(a, b) {
    return (a + b) & 0xffffffff;
}

if (md5('hello') != '5d41402abc4b2a76b9719d911017c592') {
    function add32(x, y) {
        var lsw = (x & 0xffff) + (y & 0xffff),
            msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xffff);
    }
}
async function sha256(message) {
    if (!crypto?.subtle) return md5(message);
    const msgBuffer = new TextEncoder().encode(message);

    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

    const hashArray = Array.from(new Uint8Array(hashBuffer));

    const hashHex = hashArray
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');
    return hashHex;
}
class Fingerprint {
    constructor() {}
    hash(data) {
        return sha256(data);
    }
    async testWebDriver(ua) {
        const currentValue = navigator.webdriver;
        const props = Object.getOwnPropertyDescriptor(
            Navigator.prototype,
            'webdriver',
        );

        let iframeValue;
        let iframeToString;
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.srcdoc = 'discord';
        document.body.appendChild(iframe);
        iframeValue = iframe.contentWindow.navigator.webdriver;
        iframeToString = (iframe.contentWindow as any).Function.prototype.toString;
        const webDrivergetter = iframeToString.call(props.get);
        let isStealth = !!(iframe.contentWindow as any).self.get?.toString();
        const result = {
            isModified: !webDrivergetter.includes('[native code]'),
            value: currentValue,
            iframeValue: iframeValue,
            ...this.detectBots(),
        };
        return {
            ...result,
            isHuman: Object.values(result).every((e) => e === false),
        };
    }
    detectBots() {
        const bots = {
            Awesomium: {
                window: ['awesomium'],
            },
            Cef: {
                window: ['RunPerfTest'],
            },
            CefSharp: {
                window: ['CefSharp'],
            },
            CoachJS: {
                window: ['emit'],
            },
            FMiner: {
                window: ['fmget_targets'],
            },
            Geb: {
                window: ['geb'],
            },
            NightmareJS: {
                window: ['__nightmare', 'nightmare'],
            },
            Phantomas: {
                window: ['__phantomas'],
            },
            PhantomJS: {
                window: ['callPhantom', '_phantom'],
            },
            Rhino: {
                window: ['spawn'],
            },
            Selenium: {
                window: [
                    '_Selenium_IDE_Recorder',
                    '_selenium',
                    'calledSelenium',
                ],
                document: [
                    '__selenium_evaluate',
                    'selenium-evaluate',
                    '__selenium_unwrapped',
                ],
            },
            WebDriverIO: {
                window: ['wdioElectron'],
            },
            WebDriver: {
                window: [
                    'webdriver',
                    '__webdriverFunc',
                    '__lastWatirAlert',
                    '__lastWatirConfirm',
                    '__lastWatirPrompt',
                    '_WEBDRIVER_ELEM_CACHE',
                    'ChromeDriverw',
                ],
                document: [
                    '__webdriver_script_fn',
                    '__driver_evaluate',
                    '__webdriver_evaluate',
                    '__fxdriver_evaluate',
                    '__driver_unwrapped',
                    '__webdriver_unwrapped',
                    '__fxdriver_unwrapped',
                    '__webdriver_script_fn',
                    '__webdriver_script_func',
                    '__webdriver_script_function',
                    '$cdc_asdjflasutopfhvcZLmcf',
                    '$cdc_asdjflasutopfhvcZLmcfl_',
                    '$chrome_asyncScriptInfo',
                    '__$webdriverAsyncExecutor',
                ],
            },
            HeadlessChrome: {
                window: ['domAutomation', 'domAutomationController'],
            },
        };
        const result = Object.fromEntries(
            Object.entries(bots).map(([key]) => [key, false] as [string, boolean])
        );
        for (let bot in bots) {
            let isBot = false;
            for (let [k, v] of Object.entries(bots[bot])) {
                if (k === 'window') {
                    isBot = (v as string[]).some((e) => e in window);
                }
                if (k === 'document') {
                    isBot = (v as string[]).some((e) => e in document);
                }
            }
            result[bot] = isBot;
        }
        return result;
    }
    async getUserAgent() {
        const txt = await fetch(
            'https://wavecaptcha.happyendermandev.workers.dev/api/ua',
        ).then((r) => r.text());
        return txt;
    }

    async getCanvasHash() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        ctx.fillRect(10, 20, 30, 30);
        ctx.fillText('This is a fingerprint test, to avoid bots🎉🎉', 10, 10);
        const data = canvas.toDataURL();
        return this.hash(data);
    }
    async getAudioHash() {
        const audioCtx = new AudioContext();

        const osc = audioCtx.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = 440;

        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = 2048;

        osc.connect(analyser);
        osc.start();

        const freqData = new Float32Array(analyser.frequencyBinCount);
        const sumData = new Float32Array(analyser.frequencyBinCount);

        const frames = 60;

        for (let i = 0; i < frames; i++) {
            analyser.getFloatFrequencyData(freqData);
            for (let j = 0; j < freqData.length; j++) {
                sumData[j] += freqData[j];
            }
            await new Promise((r) => setTimeout(r, 16));
        }

        for (let j = 0; j < sumData.length; j++) {
            sumData[j] /= frames;
        }

        const strData = Array.from(sumData)
            .map((v) => v.toFixed(2))
            .join(',');
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
                if (typeof obj[prop] === 'function') {
                    saveTo[name][prop] = obj[prop]
                        .toString()
                        .includes('[native code]');
                }
            } catch {}
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
                    a,
                ) ||
                /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
                    a.substr(0, 4),
                )
            )
                check = true;
        })(navigator.userAgent || navigator.vendor || (window as any).opera);
        return check;
    }
    async detectAdBlock() {
        const result: any = {};
        try {
            await fetch('https://googlesyndication.com');
            result.urls = false;
        } catch {
            result.urls = true;
        }
        const fakeAdDiv = document.createElement('div');
        fakeAdDiv.classList.add('ads');
        document.querySelector('body').appendChild(fakeAdDiv);
        result.elements =
            fakeAdDiv.style.display === 'none' ||
            fakeAdDiv.hidden ||
            !fakeAdDiv.offsetHeight;
        return result;
    }
    detectExtensions() {
        const exts = [];
        const textarea = document.createElement('textarea');
        textarea.style.display = 'none';
        document.querySelector('body').appendChild(textarea);
        if (textarea.getAttribute('grammarly-editor-plugin'))
            exts.push('Grammarly');
        if ((window as any).ethereum) exts.push('Ethereum wallet extension');
        if (window.solana) exts.push('Solana Wallet extension');
        if (window.__VUE_DEVTOOLS_GLOBAL_HOOK__) exts.push('Vue.js devtools');
        if (window.__ngDevTools__) exts.push('Angular Devtools');
        if (window.__REACT_DEVTOOLS_GLOBAL_HOOK__)
            exts.push('React Developer Tools');
        if (window.__REDUX_DEVTOOLS_EXTENSION__) exts.push('Redux Devtools');
        if (window.__APOLLO_DEVTOOLS_GLOBAL_HOOK__)
            exts.push('Apollo Devtools');
        if (window.languagetool) exts.push('LanguageTool');

        return exts;
    }
    detectFonts() {
        const fonts = [
            'cursive',
            'fantasy',
            'monospace',
            'sans-serif',
            'serif',
            '.Keyboard',
            'Al Bayan',
            'American Typewriter',
            'AmericanTypewriter',
            'AmericanTypewriter-Bold',
            'AmericanTypewriter-Condensed',
            'AmericanTypewriter-CondensedBold',
            'AmericanTypewriter-CondensedLight',
            'AmericanTypewriter-Light',
            'Andale Mono',
            'Apple Braille',
            'Apple Chancery',
            'Apple LiGothic',
            'Apple LiSung',
            'Apple Symbols',
            'AppleGothic',
            'AppleMyungjo',
            'Arial',
            'Arial Black',
            'Arial Hebrew',
            'Arial Narrow',
            'Arial Rounded MT Bold',
            'Arial Unicode MS',
            'Arial-BoldItalicMT',
            'Arial-BoldMT',
            'Arial-ItalicMT',
            'ArialHebrew',
            'ArialHebrew-Bold',
            'ArialMT',
            'ArialRoundedMTBold',
            'Ayuthaya',
            'Baghdad',
            'Baskerville',
            'Baskerville-Bold',
            'Baskerville-BoldItalic',
            'Baskerville-Italic',
            'Baskerville-SemiBold',
            'Baskerville-SemiBoldItalic',
            'BiauKai',
            'Big Caslon',
            'Brush Script MT',
            'Chalkboard',
            'Chalkduster',
            'Charcoal CY',
            'Cochin',
            'Cochin-Bold',
            'Cochin-BoldItalic',
            'Cochin-Italic',
            'Comic Sans MS',
            'Copperplate',
            'Copperplate-Bold',
            'Copperplate-Light',
            'Corsiva Hebrew',
            'Courier',
            'Courier New',
            'Courier-Bold',
            'Courier-BoldOblique',
            'Courier-Oblique',
            'CourierNewPS-BoldItalicMT',
            'CourierNewPS-BoldMT',
            'CourierNewPS-ItalicMT',
            'CourierNewPSMT',
            'DecoType Naskh',
            'Devanagari MT',
            'Didot',
            'Didot-Bold',
            'Didot-Italic',
            'Euphemia UCAS',
            'EuphemiaUCAS',
            'EuphemiaUCAS-Bold',
            'EuphemiaUCAS-Italic',
            'Futura',
            'Futura-CondensedExtraBold',
            'Futura-CondensedMedium',
            'Futura-Medium',
            'Futura-MediumItalic',
            'GB18030 Bitmap',
            'Geeza Pro',
            'GeezaPro',
            'GeezaPro-Bold',
            'Geneva',
            'Geneva CY',
            'Georgia',
            'Georgia-Bold',
            'Georgia-BoldItalic',
            'Georgia-Italic',
            'Gill Sans',
            'GillSans',
            'GillSans-Bold',
            'GillSans-BoldItalic',
            'GillSans-Italic',
            'GillSans-Light',
            'GillSans-LightItalic',
            'Gujarati MT',
            'GungSeo',
            'Gurmukhi MT',
            'HeadLineA',
            'Hei',
            'Heiti SC',
            'Heiti TC',
            'Helvetica',
            'Helvetica CY',
            'Helvetica Neue',
            'Helvetica-Bold',
            'Helvetica-BoldOblique',
            'Helvetica-Light',
            'Helvetica-LightOblique',
            'Helvetica-Oblique',
            'HelveticaNeue',
            'HelveticaNeue-Bold',
            'HelveticaNeue-BoldItalic',
            'HelveticaNeue-CondensedBlack',
            'HelveticaNeue-CondensedBold',
            'HelveticaNeue-Italic',
            'HelveticaNeue-Light',
            'HelveticaNeue-LightItalic',
            'HelveticaNeue-Medium',
            'HelveticaNeue-UltraLight',
            'HelveticaNeue-UltraLightItalic',
            'Herculanum',
            'HiraMinProN-W3',
            'HiraMinProN-W6',
            'Hiragino Kaku Gothic Pro',
            'Hiragino Kaku Gothic ProN',
            'Hiragino Kaku Gothic Std',
            'Hiragino Kaku Gothic StdN',
            'Hiragino Maru Gothic Pro',
            'Hiragino Maru Gothic ProN',
            'Hiragino Mincho Pro',
            'Hiragino Mincho ProN',
            'Hiragino Sans GB',
            'Hoefler Text',
            'HoeflerText-Black',
            'HoeflerText-BlackItalic',
            'HoeflerText-Italic',
            'HoeflerText-Regular',
            'Impact',
            'InaiMathi',
            'Kai',
            'Kailasa',
            'Kokonor',
            'Krungthep',
            'KufiStandardGK',
            'LastResort',
            'LiHei Pro',
            'LiSong Pro',
            'Lucida Grande',
            'Marker Felt',
            'MarkerFelt-Thin',
            'MarkerFelt-Wide',
            'Menlo',
            'Menlo-Bold',
            'Menlo-BoldItalic',
            'Menlo-Italic',
            'Menlo-Regular',
            'Microsoft Sans Serif',
            'Monaco',
            'Mshtakan',
            'Nadeem',
            'New Peninim MT',
            'Optima',
            'Optima-Bold',
            'Optima-BoldItalic',
            'Optima-ExtraBlack',
            'Optima-Italic',
            'Optima-Regular',
            'Osaka',
            'Osaka-Mono',
            'PCMyungjo',
            'Papyrus',
            'Papyrus-Condensed',
            'PilGi',
            'Plantagenet Cherokee',
            'Raanana',
            'STFangsong',
            'STHeiti',
            'STKaiti',
            'STSong',
            'STXihei',
            'Sathu',
            'Silom',
            'Skia',
            'Symbol',
            'Tahoma',
            'Thonburi',
            'Thonburi-Bold',
            'Times',
            'Times New Roman',
            'TimesNewRomanPS-BoldItalicMT',
            'TimesNewRomanPS-BoldMT',
            'TimesNewRomanPS-ItalicMT',
            'TimesNewRomanPSMT',
            'Trebuchet MS',
            'Trebuchet-BoldItalic',
            'TrebuchetMS',
            'TrebuchetMS-Bold',
            'TrebuchetMS-Italic',
            'Verdana',
            'Verdana-Bold',
            'Verdana-BoldItalic',
            'Verdana-Italic',
            'Zapf Dingbats',
            'ZapfDingbatsITC',
            'Zapfino',
            'Apple Color Emoji',
            'AppleColorEmoji',
            'Bangla MN',
            'Bangla Sangam MN',
            'Damascus',
            'DamascusBold',
            'Devanagari Sangam MN',
            'DevanagariSangamMN',
            'DevanagariSangamMN-Bold',
            'Gujarati Sangam MN',
            'GujaratiSangamMN',
            'Gurmukhi MN',
            'GurmukhiMN',
            'GurmukhiMN-Bold',
            'Kannada MN',
            'Kannada Sangam MN',
            'KannadaSangamMN',
            'Kefa',
            'Khmer MN',
            'Khmer Sangam MN',
            'KhmerSangamMN',
            'Lao MN',
            'Lao Sangam MN',
            'LaoSangamMN',
            'Malayalam MN',
            'Malayalam Sangam MN',
            'MalayalamSangamMN',
            'Myanmar MN',
            'Myanmar Sangam MN',
            'Nanum Brush Script',
            'Nanum Gothic',
            'Nanum Myeongjo',
            'Nanum Pen Script',
            'NanumGothic',
            'NanumGothicExtraBold',
            'NanumMyeongjo',
            'Noteworthy',
            'Noteworthy-Bold',
            'Noteworthy-Light',
            'Oriya MN',
            'Oriya Sangam MN',
            'OriyaSangamMN',
            'PT Sans',
            'PT Sans Caption',
            'PT Sans Narrow',
            'Palatino',
            'Palatino-Bold',
            'Palatino-BoldItalic',
            'Palatino-Italic',
            'Palatino-Roman',
            'STIXGeneral',
            'STIXGeneral-Bold',
            'STIXGeneral-BoldItalic',
            'STIXGeneral-Italic',
            'STIXGeneral-Regular',
            'STIXIntegralsD',
            'STIXIntegralsD-Bold',
            'STIXIntegralsD-Regular',
            'STIXIntegralsSm',
            'STIXIntegralsSm-Bold',
            'STIXIntegralsSm-Regular',
            'STIXIntegralsUp',
            'STIXIntegralsUp-Bold',
            'STIXIntegralsUp-Regular',
            'STIXIntegralsUpD',
            'STIXIntegralsUpD-Bold',
            'STIXIntegralsUpD-Regular',
            'STIXIntegralsUpSm',
            'STIXIntegralsUpSm-Bold',
            'STIXIntegralsUpSm-Regular',
            'STIXNonUnicode',
            'STIXNonUnicode-Bold',
            'STIXNonUnicode-BoldItalic',
            'STIXNonUnicode-Italic',
            'STIXNonUnicode-Regular',
            'STIXSizeFiveSym',
            'STIXSizeFiveSym-Regular',
            'STIXSizeFourSym',
            'STIXSizeFourSym-Bold',
            'STIXSizeFourSym-Regular',
            'STIXSizeOneSym',
            'STIXSizeOneSym-Bold',
            'STIXSizeOneSym-Regular',
            'STIXSizeThreeSym',
            'STIXSizeThreeSym-Bold',
            'STIXSizeThreeSym-Regular',
            'STIXSizeTwoSym',
            'STIXSizeTwoSym-Bold',
            'STIXSizeTwoSym-Regular',
            'STIXVariants',
            'STIXVariants-Bold',
            'STIXVariants-Regular',
            'Sinhala MN',
            'Sinhala Sangam MN',
            'SinhalaSangamMN',
            'Tamil MN',
            'Tamil Sangam MN',
            'TamilSangamMN',
            'Telugu MN',
            'Telugu Sangam MN',
            'TeluguSangamMN',
            'Apple SD Gothic Neo',
            'AppleSDGothicNeo-Bold',
            'AppleSDGothicNeo-Light',
            'AppleSDGothicNeo-Medium',
            'AppleSDGothicNeo-Regular',
            'AppleSDGothicNeo-SemiBold',
            'AppleSDGothicNeo-Thin',
            'AppleSDGothicNeo-UltraLight',
            'Avenir',
            'Avenir Next',
            'Avenir Next Condensed',
            'Avenir-Black',
            'Avenir-BlackOblique',
            'Avenir-Book',
            'Avenir-BookOblique',
            'Avenir-Heavy',
            'Avenir-HeavyOblique',
            'Avenir-Light',
            'Avenir-LightOblique',
            'Avenir-Medium',
            'Avenir-MediumOblique',
            'Avenir-Oblique',
            'Avenir-Roman',
            'AvenirNext-Bold',
            'AvenirNext-BoldItalic',
            'AvenirNext-DemiBold',
            'AvenirNext-DemiBoldItalic',
            'AvenirNext-Heavy',
            'AvenirNext-HeavyItalic',
            'AvenirNext-Italic',
            'AvenirNext-Medium',
            'AvenirNext-MediumItalic',
            'AvenirNext-Regular',
            'AvenirNext-UltraLight',
            'AvenirNext-UltraLightItalic',
            'AvenirNextCondensed-Bold',
            'AvenirNextCondensed-BoldItalic',
            'AvenirNextCondensed-DemiBold',
            'AvenirNextCondensed-DemiBoldItalic',
            'AvenirNextCondensed-Heavy',
            'AvenirNextCondensed-HeavyItalic',
            'AvenirNextCondensed-Italic',
            'AvenirNextCondensed-Medium',
            'AvenirNextCondensed-MediumItalic',
            'AvenirNextCondensed-Regular',
            'AvenirNextCondensed-UltraLight',
            'AvenirNextCondensed-UltraLightItalic',
            'Chalkboard SE',
            'ChalkboardSE-Bold',
            'ChalkboardSE-Light',
            'ChalkboardSE-Regular',
            'GujaratiSangamMN-Bold',
            'Gurmukhi Sangam MN',
            'Kaiti SC',
            'KannadaSangamMN-Bold',
            'MalayalamSangamMN-Bold',
            'Marion',
            'OriyaSangamMN-Bold',
            'SinhalaSangamMN-Bold',
            'Songti SC',
            'TamilSangamMN-Bold',
            'Yuppy SC',
            'Yuppy TC',
            'Al Nile',
            'Al Tarikh',
            'AlNile',
            'AlNile-Bold',
            'ArialHebrew-Light',
            'Athelas',
            'Baoli SC',
            'Beirut',
            'Charter',
            'DIN Alternate',
            'DIN Condensed',
            'DamascusMedium',
            'DamascusSemiBold',
            'Diwan Kufi',
            'Diwan Thuluth',
            'DiwanMishafi',
            'Farah',
            'Farisi',
            'GillSans-SemiBold',
            'GillSans-SemiBoldItalic',
            'GillSans-UltraBold',
            'Hannotate SC',
            'Hannotate TC',
            'HanziPen SC',
            'HanziPen TC',
            'HelveticaNeue-MediumItalic',
            'HelveticaNeue-Thin',
            'HelveticaNeue-ThinItalic',
            'Iowan Old Style',
            'IowanOldStyle-Bold',
            'IowanOldStyle-BoldItalic',
            'IowanOldStyle-Italic',
            'IowanOldStyle-Roman',
            'Kaiti TC',
            'Lantinghei SC',
            'Lantinghei TC',
            'Libian SC',
            'Mishafi',
            'Muna',
            'PT Mono',
            'PT Serif',
            'PT Serif Caption',
            'Sana',
            'Savoye LET',
            'SavoyeLetPlain',
            'Seravek',
            'Snell Roundhand',
            'SnellRoundhand',
            'SnellRoundhand-Black',
            'SnellRoundhand-Bold',
            'Songti TC',
            'Superclarendon',
            'Thonburi-Light',
            'Waseem',
            'Wawati SC',
            'Wawati TC',
            'Weibei SC',
            'Weibei TC',
            'Xingkai SC',
            'YuGothic',
            'YuMincho',
            'Yuanti SC',
            'Arial Bold',
            'Arial Bold Italic',
            'Arial Italic',
            'Comic Sans MS Bold',
            'Courier New Bold',
            'Courier New Bold Italic',
            'Courier New Italic',
            'Estrangelo Edessa',
            'Franklin Gothic Medium',
            'Franklin Gothic Medium Italic',
            'Gautami',
            'Georgia Bold',
            'Georgia Bold Italic',
            'Georgia Italic',
            'Latha',
            'Lucida Console',
            'Lucida Sans Unicode',
            'MV Boli',
            'Mangal',
            'Marlett',
            'Palatino Linotype',
            'Palatino Linotype Bold',
            'Palatino Linotype Bold Italic',
            'Palatino Linotype Italic',
            'Raavi',
            'Shruti',
            'Sylfaen',
            'Tahoma Bold',
            'Times New Roman Bold',
            'Times New Roman Bold Italic',
            'Times New Roman Italic',
            'Trebuchet MS Bold',
            'Trebuchet MS Bold Italic',
            'Trebuchet MS Italic',
            'Tunga',
            'Verdana Bold',
            'Verdana Bold Italic',
            'Verdana Italic',
            'Webdings',
            'Wingdings',
        ];
        return fonts;
    }
    getProps() {
        return Promise.resolve({});
    }
}

const fingerprint = new Fingerprint();
export { fingerprint };