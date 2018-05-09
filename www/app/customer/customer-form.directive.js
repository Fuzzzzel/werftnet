/**
 * Created by Fuzzzzel on 10.09.2016.
 *
 * Directive für die Anlage oder die Bearbeitung eines Kunden
 */

angular.module('app.customer')
    .directive('fzCustomerForm', fzCustomerForm);

fzCustomerForm.$inject = ['$window', '$http', 'customerLoaded'];

function fzCustomerForm($window, $http, customerLoaded) {
    return {
        restrict: 'E',
        scope: {
            cust_edit_obj: "=custeditobj",
            core_data: "=coredata"
        },
        controller: directiveController,
        controllerAs: 'cFormCtrl',
        templateUrl: './app/customer/customer-form.html'
    };

    // Controller für die Directive
    function directiveController($scope) {

        var vm = this;

        // Für den Fall der Fälle, dass noch kein leerer Kunde existiert
        if(Object.keys($scope.cust_edit_obj.cust).length === 0) {
            $scope.cust_edit_obj.reset();
        }

        vm.cust_edit = angular.copy($scope.cust_edit_obj.cust);

        // Methode um Daten an Symfony zu senden
        vm.saveCust = function() {
            $http({
                method: 'POST',
                url: 'customer/editCustomer',
                data: vm.cust_edit
            }).then(function successCallback(response) {
                angular.extend($scope.cust_edit_obj.cust, vm.cust_edit);
                $scope.cust_edit_obj.reset();
                $window.history.back();
            }, function errorCallback(error) {
                $scope.cust_edit_obj.reset();
                console.log(error);
                alert("Fehler beim Speichern:" + error);
            });
        };

        // Bearbeitung abbrechen
        vm.cancelEdit = function() {
            $scope.cust_edit_obj.reset();
            $window.history.back();
        };

        // Freelancer löschen
        vm.deleteCust = function() {
            if(!confirm('Kunde ' + vm.cust_edit.name1 + ', ' + vm.cust_edit.name2 + ' wirklich löschen?!')) {
                return;
            }

            $http({
                method: 'POST',
                url: 'customer/deleteCustomer',
                data: vm.cust_edit.id
            }).then(function successCallback(response) {
                $scope.cust_edit_obj.reset();
                $window.history.back();

                // Freelancer aus der Liste der geladenen Freelancer entfernen
                if(customerLoaded.items.indexOf(vm.cust_edit) > -1) {
                    customerLoaded.items.splice(customerLoaded.items.indexOf(vm.cust_edit), 1);
                }
            }, function errorCallback(error) {
                $scope.cust_edit_obj.reset();
                console.log(error);
                alert("Fehler beim Löschen:" + error);
            });
        };


        // Fügt ein Element zum angegebenen Array hinzu
        vm.addToArray = function (targetArray, obj) {
            if (obj) {
                targetArray.push(obj);
            }
        };

        // Fügt ein Element zum angegebenen Array hinzu
        vm.addCopyToArray = function (targetArray, obj) {
            if (obj) {
                var copyObj = angular.copy(obj);
                targetArray.push(copyObj);
            }
        };

        // Entfernt Element aus dem angegebenen Array
        vm.removeFromArray = function(targetArray, obj) {
            if(targetArray.length > 0) {
                for(var i = 0; i < targetArray.length; i++) {
                    if(targetArray[i].id == obj.id) {
                        targetArray.splice(i, 1);
                        break;
                    }
                }
            }
        };

        // Prüft, ob das Preisobjekt gültig ist
        vm.addPrice = function (targetArray, obj) {
            if ((obj.price_unit != null) && (obj.service != null) && (obj.price_per_unit != null)) {
                $scope.addCopyToArray(targetArray, obj);
            }
        };

    }

}