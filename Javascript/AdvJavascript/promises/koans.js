'use strict';
import Runner from '../koans/runner.js';

const runner = new Runner();

runner.addKoan(`Does a Promise have a then function?`, ({ expect }) => {
    let promise = new Promise(() => { });
    expect(typeof promise.then, 'function');
});

runner.addKoan(`Is the Promise function run immediately?`, ({ expect }) => {
    let promiseHasRun = false;
    let promise = new Promise((resolve, reject) => {
        promiseHasRun = true;
    })
    expect(promiseHasRun, true);
});

runner.addKoan(`What value is passed to the promise continuation?`, ({ expect, done }) => {
    let promise = new Promise((resolve, reject) => {
        resolve('Hello');
    }).then((value) => {
        expect(value, 'Hello');
        done();
    })
});

runner.addKoan(`Does a Promise have a catch function?`, ({ expect }) => {
    let promise = new Promise(() => { });
    expect(typeof promise.catch, 'function');
});

runner.addKoan(`What value is passed to the promise catch?`, ({ expect, done }) => {
    let promise = new Promise((resolve, reject) => {
        reject('Help');
    }).catch((error) => {
        expect(error, 'Help');
        done();
    })
});

runner.addKoan(`Is an immediately resolving Promise continued immediately?`, ({ expect }) => {
    let promiseHasResolved = false;
    let promise = new Promise((resolve, reject) => {
        resolve();
    }).then(() => {
        promiseHasResolved = true;
    });
    expect(() => promiseHasResolved === false);
});

runner.addKoan(`Is a resolved Promise continued immediately?`, ({ expect }) => {
    let thenExecuted = false;
    let promise = Promise.resolve()
        .then(() => {
            thenExecuted = true;
        });
    expect(() => thenExecuted === false);
});

runner.addKoan(`Is a Promise continued immediately when resolve is triggered?`, ({ expect }) => {
    let triggerResolve;
    let thenExecuted = false;
    new Promise((resolve, reject) => {
        triggerResolve = resolve;
    }).then(() => {
        thenExecuted = true;
    });
    expect(() => thenExecuted === false);
    triggerResolve();
    expect(() => thenExecuted === false);
});

runner.addKoan(`Is a resolved Promise continued before/after a queued microtask?`, ({ expect, done }) => {
    let microtaskExecuted = false;

    addMicroTask(() => {
        microtaskExecuted = true;
    });

    Promise.resolve()
        .then(() => {
            expect(() => microtaskExecuted === true);
            done();
        });
});

runner.addKoan(`Is a resolved Promise continued before/after the next microtask?`, ({ expect, done }) => {
    let microtaskExecuted = false;

    Promise.resolve()
        .then(() => {
            expect(() => microtaskExecuted === false);
            done();
        });

    addMicroTask(() => {
        microtaskExecuted = true;
    });
});

runner.addKoan(`Is a resolved Promise continued before/after a queued task?`, ({ expect, done }) => {
    let taskExecuted = false;

    addTask(() => {
        taskExecuted = true;
    });

    Promise.resolve()
        .then(() => {
            expect(() => taskExecuted === false);
            done();
        });
});

runner.addKoan(`Is a resolved Promise continued before/after the next task?`, ({ expect, done }) => {
    let taskExecuted = false;

    Promise.resolve()
        .then(() => {
            expect(() => taskExecuted === false);
            done();
        });

    addTask(() => {
        taskExecuted = true;
    });
});

runner.addKoan(`Is a resolved Promise continued before/after a queued animation frame?`, ({ expect, done }) => {
    let animationExecuted = false;

    requestAnimationFrame(() => {
        animationExecuted = true;
    });

    Promise.resolve()
        .then(() => {
            expect(() => animationExecuted === false);
            done();
        });
});

runner.addKoan(`Is a resolved Promise continued before/after the next animation frame?`, ({ expect, done }) => {
    let animationExecuted = false;

    Promise.resolve()
        .then(() => {
            expect(() => animationExecuted === false);
            done();
        });

    requestAnimationFrame(() => {
        animationExecuted = true;
    });
});

runner.addKoan(`Please schedule the completion for an appropriate time?`, ({ expect, done }) => {
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve(2), 110);
    })
    if (true) { // Block scoped. Do not modify this code!
        let timersCompleted = [];
        promise.then((value) => {
            timersCompleted.push('Timer' + value);
        });
        setTimeout(() => timersCompleted.push('Timer1'), 100);
        setTimeout(() => timersCompleted.push('Timer3'), 120);
        setTimeout(() => {
            expect(timersCompleted, ['Timer1', 'Timer2', 'Timer3']);
            done();
        }, 130);
    }
});

runner.addKoan(`Chaining: What value is passed to a subsequent continuation?`, ({ expect }) => {
    return Promise.resolve('Hello')
        .then((value) => {
            expect(() => value === 'Hello');
        })
        .then((value) => {
            expect(value, undefined);
        });
});

runner.addKoan(`Chaining: How do I pass a value to a subsequent continuation?`, ({ expect }) => {
    return Promise.resolve('Hello')
        .then((value) => {
            expect(() => value === 'Hello');
            return("World");
        })
        .then((value) => {
            expect(value, 'World');
        });
});

runner.addKoan(`Chaining: How do I make the subsequent continuation wait for some async work to complete?`, ({ expect }) => {
    let asycWorkComplete = false;
    function someAsyncWork() {
        return new Promise((resolve) => setTimeout(() => {
            asycWorkComplete = true;
            resolve("Work done!");
        }, 10));
    }

    return Promise.resolve('Hello')
        .then((value) => {
            expect(() => value === 'Hello');
            return(someAsyncWork());
        })
        .then((value) => {
            expect(() => asycWorkComplete === true);
            expect(value, "Work done!");
        })
});

runner.addKoan(`Recap: What value is passed to a catch handler?`, ({ expect }) => {
    return Promise.reject(new Error('My error'))
        .catch((error) => {
            expect(error.message, 'My error');
        });
});

runner.addKoan(`Chaining: How do I handle an error and pass a value to a subsequent continuation?`, ({ expect }) => {
    return Promise.reject(new Error('My error'))
        .catch((error) => {
            return(error.message);
        })
        .then((value) => {
            expect(value, 'My error');
        });
});

runner.addKoan(`Chaining: What happens when you throw an error from a continuation?`, ({ expect }) => {
    return Promise.resolve()
        .then(() => {
            throw new Error('Some error!');
        })
        .catch((error) => {
           expect(error.message, 'Some error!');
        });
});

runner.addKoan(`Chaining: What happens to the continuations between your error and the catch?`, ({ expect }) => {
    let hits = [];
    return Promise.resolve()
        .then(() => {
            hits.push(1);
            throw new Error('Some error!');
        })
        .then(() => hits.push(2))
        .then(() => hits.push(3))
        .catch(() => hits.push('catch'))
        .then(() => hits.push(4))
        .then(() => {
            expect(hits, [ 1,'catch',4 ]);
        });
});

runner.addKoan(`Parallelization: Execute promises in sequence?`, ({ expect }) => {

    function first() { return Promise.resolve("Hello"); }
    function second(value) { return Promise.resolve(value + " World"); }

    return first()
        .then((value) => {
            return second(value);
        })
        .then((value) => {
            expect(value, "Hello World");
        })
});

runner.addKoan(`Parallelization: Execute promises in parallel?`, ({ expect }) => {

    function first() { return Promise.resolve(10); }
    function third() { return Promise.resolve(30); }
    function second() { return Promise.resolve(20); }

    let promiseArray = [
        first(),
        second(),
        third(),
    ];
    return Promise.all(promiseArray)
        .then((value) => {
            expect(value, [10,20,30]);
        })
});

runner.addKoan(`Parallelization: Return the first completed promise?`, ({ expect }) => {

    function first() { return Promise.resolve(10).then(() => 11); }
    function second() { return Promise.resolve(20); }
    function third() { return Promise.resolve(30); }

    let promiseArray = [
        first(),
        second(),
        third(),
    ];
    return Promise.race(promiseArray)
        .then((value) => {
            expect(value, 20);
        })

    // Do you understand why you see the behavior above?
});

runner.addKoan(`Parallelization: Does the order of continuation subscription matter?`, ({ expect }) => {

    let promises = [
        Promise.resolve(0),
        Promise.resolve(1),
        Promise.resolve(2),
    ];

    let hits = [];
    promises[2].then((value) => hits.push(value));
    promises[0].then((value) => hits.push(value));
    promises[1].then((value) => hits.push(value));

    return Promise.all(promises)
        .then(() => {
            expect(hits, [2,0,1]);
        });

    // Discuss if what you have discovered in this koan should affect the way you code?
});

window.koansLoader.setRunner(runner);

//export default runner;
/*
runner.run(({ message, error }) => {
    console.log(message);
    if (error) {
        console.error(error);
        console.error({ ...error });
    }
});
*/


function addMicroTask(fn) {
    Promise.resolve().then(fn);
}

function addTask(fn) {
    setTimeout(fn, 0);
}
