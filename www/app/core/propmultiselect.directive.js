/**
 * Created by Fuzzzzel on 30.08.2016.
 *
 * Directive für eine einfache Liste aus id und name
 * Hinzufügen und entfernen aus anderer liste
 */

angular.module('app.core')
    .directive('fzPropMultiSelect', fzPropMultiSelect);

fzPropMultiSelect.$inject = ['dataService'];

function fzPropMultiSelect(dataService) {
    return {
        restrict: 'E',
        scope: {
            objarray: '=',
            valuearray: '=',
            twolevel: '='
        },
        controller: directiveController,
        templateUrl: './app/core/propmultiselect.html'
    };

    // Controller für die Directive
    function directiveController($scope) {
        $scope.valuelist = null;
        $scope.getCombinedDisplayName = dataService.getCombinedDisplayName;
        $scope.currentSelection = { selectedItems : []};

        if (typeof $scope.twolevel !== 'undefined' && $scope.twolevel) {
            $scope.valuelist = dataService.getFlattenedTwoLevelEntity($scope.valuearray);
        } else {
            $scope.valuelist = $scope.valuearray;
        }

        $scope.addSelectedItems = function() {
            for(var i = 0; i < $scope.currentSelection.selectedItems.length; i++) {
                $scope.addToArray($scope.objarray, $scope.currentSelection.selectedItems[i]);
            }
            $scope.currentSelection.selectedItems = [];
        };

        // Fügt ein Element zum angegebenen Array hinzu
        $scope.addToArray = function (targetArray, obj) {
            if (obj) {
                targetArray.push(obj);
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