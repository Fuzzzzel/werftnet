/**
 * Created by Fuzzzzel on 01.03.2017.
 *
 * Directive für die Anlage oder die Bearbeitung eines Ansprechpartners beim Kunden
 */

angular.module('app.customer')
    .directive('fzCustomerContactForm', fzCustomerContactForm);

fzCustomerContactForm.$inject = ['$window', '$http'];

function fzCustomerContactForm($window, $http) {
    return {
        restrict: 'E',
        scope: {
            cust_edit_obj: "=custeditobj",
            contact_edit_obj: "=contacteditobj",
            core_data: "=coredata"
        },
        controller: directiveController,
        controllerAs: 'contactFormCtrl',
        templateUrl: './app/customer/contact-form.html'
    };

    // Controller für die Directive
    function directiveController($scope) {

        var vm = this;

        if(Object.keys($scope.contact_edit_obj.contact).length === 0) {
            // Falls noch kein leeres Kontaktobjekt erstellt wurde
            $scope.contact_edit_obj.reset($scope.cust_edit_obj.cust);
        } else {
            // Sonst dem Kontakt den Kunden zuweisen
            $scope.contact_edit_obj.contact.customer_id = $scope.cust_edit_obj.cust.id;
        }

        vm.contact_edit = angular.copy($scope.contact_edit_obj.contact);

        // Methode um Daten an Symfony zu senden
        vm.saveContact = function() {
            $http({
                method: 'POST',
                url: 'customer/editCustomerContact',
                data: vm.contact_edit
            }).then(function successCallback(response) {
                if(typeof vm.contact_edit.id == 'undefined') {
                    // Kontakt ist neu und muss dem Array hinzugefügt werden
                    vm.addCopyToArray($scope.cust_edit_obj.cust.contacts, response.data);
                }
                angular.extend($scope.contact_edit_obj.contact, vm.contact_edit);
                $scope.contact_edit_obj.reset();
                $scope.cust_edit_obj.reset();
                $window.history.back();
            }, function errorCallback(error) {
                $scope.contact_edit_obj.reset();
                $scope.cust_edit_obj.reset();
                console.log(error);
                alert("Fehler beim Speichern:" + error);
            });
        };

        // Bearbeitung abbrechen
        vm.cancelEdit = function() {
            $scope.contact_edit_obj.reset();
            $scope.cust_edit_obj.reset();
            $window.history.back();
        };

        // Freelancer löschen
        vm.deleteContact = function() {
            if(!confirm('Ansprechpartner ' + vm.contact_edit.name1 + ', ' + vm.contact_edit.name2 + ' wirklich löschen?!')) {
                return;
            }

            $http({
                method: 'POST',
                url: 'customer/deleteContact',
                data: vm.contact_edit.id
            }).then(function successCallback(response) {
                // Freelancer aus der Liste der geladenen Kontakte entfernen
                if($scope.cust_edit_obj.cust.contacts.indexOf(vm.contact_edit) > -1) {
                    $scope.cust_edit_obj.cust.contacts.splice($scope.cust_edit_obj.cust.contacts.indexOf(vm.contact_edit), 1);
                }

                // Aktuell zu bearbeitenden Kontakt freigeben
                $scope.contact_edit_obj.reset();
                $scope.cust_edit_obj.reset();
                $window.history.back();
            }, function errorCallback(error) {
                $scope.contact_edit_obj.reset();
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

    }

}