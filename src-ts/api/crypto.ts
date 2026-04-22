import CryptoJS from 'crypto-js';
import { v3 } from 'murmurhash';

const d = (enc) => {
    let b = '';
    for (let i = 0; i < enc.length; i++) {
        b += String.fromCharCode(enc.charCodeAt(i) - 1);
    }
    return atob(b);
};

function findByHash(object, hash) {
    const props = Object.getOwnPropertyNames(object);
    for (let prop of props) {
        if (v3(prop) === hash) return object[prop];
    }
}

const O = {
    K1: 1049180957,
    K2: 2788730333,
    K3: 1751235126,
    K4: 2914232173,
    K5: 2107057199,
    K6: 296467145,
    K7: 3532742433,
    K8: 3305121364,
    K9: 2518646100,
    K10: 1353244412,
    K11: 843725010,
    K12: 3650469900,
    K13: 3489183584,
    K14: 3866312447,
    K15: 2514386435,
};

const dec = (arr) => {
    const result = [];
    const t = String.fromCharCode;
    const key = t(
        ...[
            71, 106, 89, 97, 80, 106, 111, 50, 70, 104, 52, 54, 78, 106, 89, 97,
            67, 104, 111, 43, 79, 104, 111, 43, 72, 106, 89, 50, 67, 110, 52,
            75, 67, 103, 111, 101, 68, 110, 53, 50, 67, 103, 111, 61,
        ],
    );
    for (let i = 0; i < arr.length; i++) {
        result.push(((arr[i] ^ key.charCodeAt(i % key.length)) + 10) & 0xff);
    }
    return result;
};
function numberArrayToWordArray(arr) {
    let hex = '';
    for (let b of arr) {
        if (b < 0 || b > 255) throw new Error('bytes must be 0..255');
        hex += (b < 16 ? '0' : '') + b.toString(16);
    }
    return findByHash(findByHash(findByHash(CryptoJS, O.K3), O.K4), O.K10)(hex);
}
function deriveIV(clientArr, serverArr) {
    const clientWA = numberArrayToWordArray(clientArr);
    const serverWA = numberArrayToWordArray(serverArr);
    const concat =
        findByHash(
            findByHash(findByHash(CryptoJS, O.K3), O.K4),
            O.K11,
        )(serverWA) +
        findByHash(
            findByHash(findByHash(CryptoJS, O.K3), O.K4),
            O.K11,
        )(clientWA);
    return CryptoJS.MD5(
        findByHash(findByHash(findByHash(CryptoJS, O.K3), O.K4), O.K10)(concat),
    );
}

const decrypt = (encrypted: string) => {
    let keys: any = {};
    findByHash(
        findByHash(findByHash(findByHash(window, O.K12), O.K13), O.K14),
        O.K15,
    )[0x2](keys);
    keys._c3_ = dec(keys._c3_[0]);
    keys._s3_ = dec(keys._s3_[0]);
    const [key, iv] = [
        numberArrayToWordArray(keys._s3_),
        deriveIV(keys._c3_, keys._s3_),
    ];

    const decryptedWA = findByHash(CryptoJS, O.K1).decrypt(encrypted, key, {
        iv: iv,
        mode: findByHash(CryptoJS, O.K6).CBC,
        padding: findByHash(CryptoJS, O.K8).Pkcs7,
    });

    return findByHash(
        findByHash(findByHash(CryptoJS, O.K3), O.K5),
        O.K11,
    )(decryptedWA);
};
const encrypt = (body: any) => {
    let keys: any = {};
    findByHash(
        findByHash(findByHash(findByHash(window, O.K12), O.K13), O.K14),
        O.K15,
    )[0x2](keys);
    keys._c3_ = dec(keys._c3_[0]);
    keys._s3_ = dec(keys._s3_[0]);
    let res = { d: null };
    const plaintext =
        typeof body === 'string' ? body : findByHash(JSON, O.K11)(body);
    const [key, iv] = [
        numberArrayToWordArray(keys._c3_),
        deriveIV(keys._c3_, keys._s3_),
    ];
    console.log(iv.toString());
    res.d = findByHash(CryptoJS, O.K1)
        .encrypt(plaintext, key, {
            iv: iv,
            mode: findByHash(CryptoJS, O.K6).CBC,
            padding: findByHash(CryptoJS, O.K8).Pkcs7,
        })
        .toString();
    return res;
};
export { encrypt, decrypt };