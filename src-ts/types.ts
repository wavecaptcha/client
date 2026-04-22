interface WaveCaptcha {
    // build info
    build: {
        buildNumber: string;
        versionHash: string;
        builtAt: string;
    };
    config: {
        /**
         * Api base url used by wavecaptcha
         * Default is: 'https://wavecaptcha.happyendermandev.workers.dev/api'
         */
        baseUrl: string;
        /**
         * Iframe url used by wavecaptcha for showing captcha
         * Default is: 'https://wavecaptcha-cdn.pages.dev/captcha.html'
         */
        iframeUrl: 'https://wavecaptcha-cdn.pages.dev/captcha.html';
    };
    siteKey?: string | undefined;
    currentIframe?: HTMLIFrameElement | null;
    onSolved(token: string): void;
    // TODO: add types for captcha return
    getCaptcha(
        check?: boolean,
        pow?: { c: string; nonce: number },
    ): Promise<any>;
    render(
        element: HTMLElement,
        responseInput: HTMLInputElement | { value: any },
        siteKey: string,
    ): void;
}
