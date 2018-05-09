/**
 * Created by Fuzzzzel on 30.08.2016.
 *
 * Directive für die Anlage oder die Bearbeitung eines Freelancers
 */

angular.module('app.freelancer')
    .directive('fzFreelancerForm', fzFreelancerForm);

fzFreelancerForm.$inject = ['$window', '$http', 'freelancerLoaded', 'dataService'];

function fzFreelancerForm($window, $http, freelancerLoaded, dataService) {
    return {
        restrict: 'E',
        scope: {
            fl_edit_obj: "=fleditobj",
            core_data: "=coredata"
        },
        controller: directiveController,
        controllerAs: 'flFormCtrl',
        templateUrl: './app/freelancer/freelancer-form.html'
    };

    // Controller für die Directive
    function directiveController($scope) {
        var vm = this;
        $scope.getCombinedDisplayName = dataService.getCombinedDisplayName;

        if(Object.keys($scope.fl_edit_obj.fl).length === 0) {
            $scope.fl_edit_obj.reset();
        }

        vm.fl_edit = angular.copy($scope.fl_edit_obj.fl);

        // Methode um Daten an Symfony zu senden
        vm.saveFl = function() {

            // Kopie des Freelancers erstellen, um Datum in yyyy-mm-dd String zu wandeln, falls vorhanden
            var fl_save = angular.copy(vm.fl_edit);
            if(typeof vm.fl_edit.geburtstag !== 'undefined' && vm.fl_edit.geburtstag !== null && !isNaN(vm.fl_edit.geburtstag.getTime())) {
                fl_save.geburtstag = vm.fl_edit.geburtstag.toISOString().slice(0,10);
            }

            $http({
                method: 'POST',
                url: 'freelancer/editFreelancer',
                data: fl_save
            }).then(function successCallback(response) {
                angular.extend($scope.fl_edit_obj.fl, vm.fl_edit);
                $window.history.back();
            }, function errorCallback(error) {
                console.log(error);
                alert("Fehler beim Speichern:" + error);
            });
        };

        vm.cancelEdit = function() {
            $window.history.back();
        };

        vm.deleteFl = function() {
            if(!confirm('Freelancer ' + vm.fl_edit.name2 + ', ' + vm.fl_edit.name1 + ' wirklich löschen?!')) {
                return;
            }

            $http({
                method: 'POST',
                url: 'freelancer/deleteFreelancer',
                data: vm.fl_edit.id
            }).then(function successCallback(response) {
                $window.history.back();

                // Freelancer aus der Liste der geladenen Freelancer entfernen
                if(freelancerLoaded.items.indexOf(vm.fl_edit) > -1) {
                    freelancerLoaded.items.splice(freelancerLoaded.items.indexOf(vm.fl_edit), 1);
                }
            }, function errorCallback(error) {
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
                vm.addCopyToArray(targetArray, obj);
            }
        };

    }

}