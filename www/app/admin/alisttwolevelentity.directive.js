/**
 * Created by Fuzzzzel on 03.08.2017.
 */
/**
 * Directive für Sprachen
 * Hinzufügen und entfernen
 * Korrespondierender Controller in Symfony nimmt Änderungen
 * auf und persistiert diese in der Datenbank
 */

angular.module('app.admin')
    .directive('fzAlistTwoLevelEntity', fzAlistTwoLevelEntity);

fzAlistTwoLevelEntity.$inject = ['$uibModal'];

function fzAlistTwoLevelEntity($uibModal) {
    return {
        restrict: 'E',
        scope: {
            entity: '@',
            valuearray: '=',
            methods: '='
        },
        controller: directiveController,
        templateUrl: './app/admin/alisttwolevelentity.html'
    };

    // Controller für die Directive
    function directiveController($scope) {
        var itemToEdit = null;

        // get all entities from core
        // on click add/delete and update db on server
        $scope.openModalSelectMain = function (newSubItem) {
            var itemToEdit = newSubItem;
            console.log

            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'myModalContent.html',
                controller: 'ModalSelectMainCtrl',
                controllerAs: 'modSelMainCtrl',
                size: 'sm',
                resolve: {
                    mainItems: function () {
                        return $scope.valuearray;
                }}
            });

            modalInstance.result.then(function (mainItem) {
                // Antwort aus Modal verarbeiteen
                // ItemToEdit
                $scope.methods.addAsSubItem($scope.entity, $scope.valuearray, newSubItem, mainItem);
            }, function () {
                // Cancel wurde gedrückt
                newSubItem = null;
            });
        };

    }

}

angular.module('app.admin')
    .controller('ModalSelectMainCtrl', ModalSelectMainCtrl);

ModalSelectMainCtrl.$inject = ['$uibModalInstance', 'mainItems'];

function ModalSelectMainCtrl($uibModalInstance, mainItems) {
    var vm = this;
    vm.mainItems = mainItems;

    vm.mainSelectOk = function (mainItemSelected) {
        $uibModalInstance.close(mainItemSelected);
    };

    vm.mainSelectCancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}