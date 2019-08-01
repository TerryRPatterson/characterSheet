export default class Deferred {
    constructor(handler = () => {}) {
        // eslint-disable-next-line promise/avoid-new
        this.promise = new Promise((resolve, reject) => {
            this.reject = reject;
            this.resolve = resolve;
            handler(resolve, reject);
        });
        return this;
    }
}
