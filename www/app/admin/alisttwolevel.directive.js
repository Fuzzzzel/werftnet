/**
 * Created by Fuzzzzel on 07.08.2016.
 */
/**
 * Directive für eine Liste aus zwei Ebenen
 * Hinzufügen und entfernen
 * Korrespondierender Controller in Symfony nimmt Änderungen
 * auf und persistiert diese in der Datenbank
 */

angular.module('app.admin')
    .directive('fzAlistTwoLevel', fzAlistTwoLevel);

function fzAlistTwoLevel() {
    return {
        restrict: 'E',
        scope: {
            entity: '@',
            valuearray: '=',
            subpropname: '@',
            methods: '='
        },
        controller: directiveController,
        templateUrl: './app/admin/alisttwolevel.html'
    };

    // Controller für die Directive
    function directiveController($scope) {
        // get all entities from core
        // on click add/delete and update db on server

    }

}/**
 * Created by Fuzzzzel on 07.08.2016.
 */
