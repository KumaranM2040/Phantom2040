window.koansLoader = (function () {
    return {
        setObserver(observer) {
            this.observer = observer;
            this._load();
        },
        setRunner(runner) {
            this.runner = runner;
            this._load();
        },
        _load() {
            let { runner, observer } = this;
            if (!runner) return;
            if (!observer) return;

            runner.run((update) => {
                let { message, error } = update;
                console.log(message);
                if (error) {
                    console.error(error);
                    console.error({ ...error });
                }
                if (observer) {
                    observer(update);
                }
            });
        }
    };
})();


(function (angular, koansLoader) {
    'use strict';

    class KoansViewModel {
        constructor(observer) {
            this.message = "";
            this.koans = [];
            this.error = null;
            this.current = null;
            this._observer = observer;
        }

        update(updateDetails) {
            Object.assign(this, updateDetails);
            this._observer();
        }

        get completedKoans() {
            return this.koans.filter(o => o.completed);
        }

        get unCompletedKoans() {
            return this.koans
                .filter(o => !o.completed)
                //.filter(o => o !== this.current);
        }

        init() {
            let self = this;
            koansLoader.setObserver((update) => {
                self.update(update);
            });
            return;
            import(window.location.pathname + 'koans.js')
                .then((imported) => {
                    let runner = imported.default;
                    runner.run((update) => {
                        let { message, error } = update;
                        console.log(message);
                        if (error) {
                            console.error(error);
                            console.error({ ...error });
                        }
                        self.update(update);
                    });
                });
        }
    }

    function KoansResultsController($scope) {
        let viewModel = new KoansViewModel(() => {
            $scope.$apply();
        });
        viewModel.init();

        this.viewModel = viewModel;
    }

    angular.module('koansApp', [])
        .component('koansResults', {
            controller: KoansResultsController,
            templateUrl: '/koans/results.html'
        });
})(window.angular, window.koansLoader);
