import CryptoJS from "crypto-js";
const d = (enc) => {
    // enc is the "shifted base64" string; reverse shift then atob
    let b = '';
    for (let i = 0; i < enc.length; i++) {
        b += String.fromCharCode(enc.charCodeAt(i) - 1);
    }
    return atob(b);
};

// obfuscated tokens (shifted-base64 of the real keys)
const O = {
    K1: 'RVWU',
    K2: 'UVR2',
    K3: '[X6k',
    K4: 'THW5',
    K5: 'WYSnPB>>',
    K6: 'cX:l[R>>',
    K7: 'R1KE',
    K8: 'dHGl',
    K9: 'VHukd{d>',
    K10: 'dHGzd3V>',
    K11: 'd4SzbX6obX[6',
    K12: "Y2:gW2[ERWCgU4h1PEJ1PEZzOEN1N{N{OUd5OEJ1PUBzN2:g",
    K13: "fEN>",
    K14: "b{J4",
    K15: "Zh>>"
};

const dec = (arr) => {
    const result = [];
    const t = String.fromCharCode
    const key = t(...[
        71,
        106,
        89,
        97,
        80,
        106,
        111,
        50,
        70,
        104,
        52,
        54,
        78,
        106,
        89,
        97,
        67,
        104,
        111,
        43,
        79,
        104,
        111,
        43,
        72,
        106,
        89,
        50,
        67,
        110,
        52,
        75,
        67,
        103,
        111,
        101,
        68,
        110,
        53,
        50,
        67,
        103,
        111,
        61
    ]);
    for (let i = 0; i < arr.length; i++) {
        result.push(((arr[i] ^ key.charCodeAt(i % key.length)) + 10) & 0xff);
    }
    return result;
};
function numberArrayToWordArray(arr) {
    // produce hex string
    let hex = '';
    for (let b of arr) {
        if (b < 0 || b > 255) throw new Error('bytes must be 0..255');
        hex += (b < 16 ? '0' : '') + b.toString(16);
    }
    return CryptoJS[d(O.K3)][d(O.K4)][d(O.K10)](hex);
}
function deriveIV(clientArr, serverArr) {
    const clientWA = numberArrayToWordArray(clientArr);
    const serverWA = numberArrayToWordArray(serverArr);
    const concat = CryptoJS[d(O.K3)][d(O.K4)][d(O.K11)](serverWA) + CryptoJS[d(O.K3)][d(O.K4)][d(O.K11)](clientWA);
    return CryptoJS.MD5(CryptoJS[d(O.K3)][d(O.K4)][d(O.K10)](concat));
}

const decrypt = (
    encrypted,
) => {

    let keys = {}; window[d(O.K12)][d(O.K13)][d(O.K14)][d(O.K15)][0x2](keys)
    keys._c3_ = dec(keys._c3_[0])
    keys._s3_ = dec(keys._s3_[0])
    const [key, iv] = [
        numberArrayToWordArray(keys._s3_),
        deriveIV(keys._c3_, keys._s3_),
    ];

    const decryptedWA = CryptoJS[d(O.K1)].decrypt(encrypted, key, {
        iv: iv,
        mode: CryptoJS[d(O.K6)].CBC,
        padding: CryptoJS[d(O.K8)].Pkcs7,
    });

    return CryptoJS[d(O.K3)][d(O.K5)][d(O.K11)](decryptedWA);
};
const encrypt = (body) => {

    let keys = {}; window[d(O.K12)][d(O.K13)][d(O.K14)][d(O.K15)][0x2](keys)
    keys._c3_ = dec(keys._c3_[0])
    keys._s3_ = dec(keys._s3_[0])
    let res = { d: null }
    const plaintext = typeof body === "string" ? body : JSON[d(O.K11)](body)
    const [key, iv] = [numberArrayToWordArray(keys._c3_), deriveIV(keys._c3_, keys._s3_)]
    console.log(iv.toString())
    res.d = CryptoJS[d(O.K1)].encrypt(plaintext, key, {
        iv: iv,
        mode: CryptoJS[d(O.K6)].CBC,
        padding: CryptoJS[d(O.K8)].Pkcs7,
    }).toString();
    return res
}
export { encrypt, decrypt }