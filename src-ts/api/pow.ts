import { log } from '../logger';
import sha256 from './sha256';

class WvPow {
    challenge;
    diffuctly;
    constructor(challenge, diffuctly) {
        this.challenge = challenge;
        this.diffuctly = diffuctly;
    }
    hash(text) {
        return sha256(text);
    }
    wait(ms) {
        return new Promise((res) => setTimeout(res, ms));
    }
    canvaToText(c) {
        return c;
    }
    async solve() {
        const start = Date.now();
        let solved = false,
            foundHash,
            foundNonce,
            tries = 0;

        while (!solved) {
            const n = tries;
            const c = this.canvaToText(String(n));
            const h = this.hash(this.challenge + c);
            tries++;
            if (h.startsWith('0'.repeat(this.diffuctly))) {
                solved = true;
                foundHash = h;
                foundNonce = c;
                break;
            }
        }
        const timeMs = Date.now() - start;
        log('info', 'Took ' + timeMs / 1e3 + ' s to solve pow');
        return {
            tries,
            hash: foundHash,
            nonce: foundNonce,
            timeMs,
        };
    }

    async verify(nonce: string) {
        return this.hash(this.challenge + nonce).startsWith(
            '0'.repeat(this.diffuctly),
        );
    }
}
export { WvPow };
