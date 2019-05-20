export class ExpectationFailure extends Error {
    constructor(message) {
        super(message);
    }
}

export class Koan {
    constructor(name, func) {
        this.name = name;
        this.func = func;
        this.completed = false;
        this.success = false;
    }

    run() {
        return new Promise((resolve, reject) => {
            this.completed = false;
            let done = (...args) => {
                if (this.completed) return;
                if (!this.success) {
                    throw new ExpectationFailure('Failed: No expectations run!');
                }
                this.completed = true;
                resolve(...args);
            };
            let errored = false;
            let handleError = (error) => {
                if (errored) return;
                reject(error);
                this.success = false;
                errored = true;
            };
            let expect = (actual, expected) => {
                if (typeof actual === 'function'
                    && typeof expected === 'undefined') {
                    this.success = actual();
                    if (!this.success) {
                        let error = new ExpectationFailure(`Failed: ${actual.toString()}`);
                        error.expectionFn = actual;
                        handleError(error);
                        throw error;
                    }
                    return;
                }

                if (Array.isArray(actual)) {
                    actual = actual.toString();
                    expected = expected && expected.toString();
                }

                this.success = actual === expected;
                if (!this.success) {
                    let error = new ExpectationFailure(`Expected ${expected} but got ${actual}`);
                    error.expected = expected;
                    error.actual = actual;
                    error.stack
                    handleError(error);
                    throw error;
                }

            };
            let usesDoneArg = false;
            const input = { expect, done };
            Reflect.defineProperty(input, 'done', {
                get: () => {
                    usesDoneArg = true;
                    return done;
                }
            });
            try {

                let result = this.func(input);
                if (!usesDoneArg && result && result.then) {
                    result.then(done)
                        .catch(handleError);
                } else if (!usesDoneArg) {
                    done();
                }
            } catch (error) {
                handleError(error);
            }

        });
    }
}

export default class Runner {
    constructor() {
        this._koans = [];
    }

    addKoan(name, func) {
        const koan = new Koan(name, func);
        this._koans.push(koan);
    }

    run(observer) {
        let koans = this._koans;
        let all = koans.reduce((previous, koan) => {
            let promise = previous.promise.then(() => {
                observer({
                    message: `Executing koan '${koan.name}'`,
                    previous: previous.koan,
                    current: koan,
                    error: null,
                    koans
                });
                return koan.run();
            })
            return {
                promise,
                koan
            };
        }, {
                promise: Promise.resolve()
            });
        all.promise.then(() => {
            observer({
                message: `All koans completed!`,
                current: null,
                error: null,
                koans
            });
        }).catch((error) => {
            if (error instanceof ExpectationFailure) {
                observer({
                    message: `Have a look at the result and try again... `,
                    error,
                    koans
                });
            } else {
                observer({
                    message: `Now, let's look at the koan...`,
                    error: null,
                    koans
                });
            }
        })
    }
}