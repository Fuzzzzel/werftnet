/**
 * Created by Fuzzzzel on 29.07.2016.
 */
angular
    .module('app.core')
    .directive('fzOnEnterKey', fzOnEnterKey);

function fzOnEnterKey() {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                event.preventDefault();
                scope.$apply(function () {
                    scope.$eval(attrs.fzOnEnterKey);
                });
            }
        });
    };
}