/**
 * Created by Fuzzzzel on 30.08.2016.
 *
 * Directive für eine einfache Liste aus id und name
 * Hinzufügen und entfernen aus anderer liste
 */

angular.module('app.core')
    .directive('fzLangComboMultiSelect', fzLangComboMultiSelect);

fzLangComboMultiSelect.$inject = ['dataService'];

function fzLangComboMultiSelect(dataService) {
    return {
        restrict: 'E',
        scope: {
            objarray: '=',
            valuearray: '='
        },
        controller: directiveController,
        templateUrl: './app/core/langcombomultiselect.html'
    };

    // Controller für die Directive
    function directiveController($scope) {

        // Sprachen in Quellsprachen kopieren
        $scope.srcLngArray = dataService.getFlattenedTwoLevelEntity($scope.valuearray);
        $scope.tgtLngArray = dataService.getFlattenedTwoLevelEntity($scope.valuearray);

        // Fügt ein Element zum angegebenen Array hinzu
        $scope.addToArray = function (targetArray, obj) {
            if (obj) {
                var valid = (obj.lng_source != null) && (obj.lng_target != null);
                var found = false;
                if(valid) {
                    for(var i = 0; i < targetArray.length; i++) {
                        if(targetArray[i].lng_source.id == obj.lng_source.id) {
                            if(targetArray[i].lng_target.id == obj.lng_target.id) {
                                found = true;
                            }
                        }
                    }

                    if(!found) targetArray.push(angular.copy(obj));
                }
            }
        };

        // Entfernt Element aus dem angegebenen Array
        $scope.removeFromArray = function(targetArray, obj) {
            if(targetArray.length > 0) {
                for(var i = 0; i < targetArray.length; i++) {
                    if(targetArray[i].id == obj.id) {
                        targetArray.splice(i, 1);
                        break;
                    }
                }
            }
        };

    }
}