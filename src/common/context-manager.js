
export default async function context(context, func) {
    const value = context.__enter__();
    try {
        await func(value);
        context.__exit__();
    } catch (error) {
        context.__exit__(error);
    }
}

export class contextManager {
    constructor(func) {
        this.gen = func();
    }

    __enter__() {
        const {value} = this.gen.next();
        return value;
    }

    __exit__(error?: Error) {
        if (error) {
            this.gen.throw(error);
        } else {
            this.gen.next();
        }
    }
}
