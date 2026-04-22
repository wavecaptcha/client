interface WaveCaptchaConfig {
    baseUrl: string;
    iframeUrl: string;
}

interface WaveCaptchaBuild {
    buildNumber: string;
    versionHash: string;
    builtAt: string;
}

interface WaveCaptcha {
    build?: WaveCaptchaBuild;
    config: WaveCaptchaConfig;
    siteKey?: string;
    currentIframe?: HTMLIFrameElement;
    onSolved?: (response: string) => void;
    getCaptcha?: (check?: boolean, pow?: any) => Promise<any>;
    render?: (element: HTMLElement, responseInput: HTMLInputElement, siteKey: string) => void;
}

declare global {
    interface Window {
        wavecaptcha: WaveCaptcha;
        Swal: any;
        ethereum?: any;
        solana?: any;
        __VUE_DEVTOOLS_GLOBAL_HOOK__?: any;
        __ngDevTools__?: any;
        __REACT_DEVTOOLS_GLOBAL_HOOK__?: any;
        __REDUX_DEVTOOLS_EXTENSION__?: any;
        __APOLLO_DEVTOOLS_GLOBAL_HOOK__?: any;
        languagetool?: any;
        opera?: any;
    }

    interface Navigator {
        webdriver?: boolean;
    }
}

declare module 'crypto-js' {
    const CryptoJS: any;
    export default CryptoJS;
}

declare module 'murmurhash' {
    export function v3(str: string): number;
}

export {};