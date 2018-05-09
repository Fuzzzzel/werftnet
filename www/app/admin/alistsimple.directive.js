/**
 * Created by Fuzzzzel on 19.07.2016.
 */
/**
 * Directive für eine einfache Liste aus id und name
 * Hinzufügen und entfernen
 * Korrespondierender Controller in Symfony nimmt Änderungen
 * auf und persistiert diese in der Datenbank
 */

angular.module('app.admin')
    .directive('fzAlistSimple', fzAlistSimple);

function fzAlistSimple() {
    return {
        restrict: 'E',
        scope: {
            entity: '@',
            valuearray: '=',
            methods: '='
        },
        controller: directiveController,
        templateUrl: './app/admin/alistsimple.html'
    };

    // Controller für die Directive
    function directiveController($scope) {
        // get all entities from core
        // on click add/delete and update db on server
    }

}