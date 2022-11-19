export interface Koan {
    new (name, func) : Koan;
    name: string;
    func: KoanFunc;
    completed: boolean;
    success: boolean;
    run() : Promise;
}

type KoanFunc = (args: KoanArgs) => void | Promise;

interface KoanArgs {
    expect(expectation: () => bool);
    expect<T>(expected: T, actual: T);
    done();
}

interface Observer {
    message: string;
    current: Koan;
    koans: Koan[];
    error: Error;
}

export interface Runner {
    addKoan(name: string, func: KoanFunc): void;
    run(observer: any): void;
}
