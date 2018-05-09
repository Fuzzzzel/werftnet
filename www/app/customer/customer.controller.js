/**
 * Created by Fuzzzzel on 10.09.2016.
 */

angular
    .module('app.customer')
    .controller('customerController', customerController);

customerController.$inject = ['$http','$location', '$window', 'customerActive', 'contactActive', 'customerLoaded'];

function customerController($http, $location, $window, customerActive, contactActive, customerLoaded) {
    var vm = this;

    // Services zuweisen und initialisieren
    vm.customerActive = customerActive;
    vm.customerActive.reset();
    vm.contactActive = contactActive;
    vm.contactActive.reset();


    vm.customerLoaded = customerLoaded;

    vm.paginationClick = function(cust_search) {
        vm.searchCustomers(cust_search, vm.customerLoaded.pageCurrent)
    };

    vm.searchCustomers = function(params, pageNext) {
        if(typeof params === 'undefined') {
            params = {};
        }
        if(typeof pageNext !== 'undefined') {
            params.pageNext = pageNext;
        } else {
            params.pageNext = 1;
        }

        $http({
            method: 'POST',
            url: 'customer/searchCustomers',
            data: params
        }).then(function successCallback(response) {
            $window.scrollTo(0,0);
            vm.customerLoaded.setNewList(response.data);
        }, function errorCallback(error) {
            console.log(error);
            alert('Error in call to searchCustomers' + error);
        });
    };
    
    
    vm.editCustomer = function(cust_active) {
        vm.customerActive.cust = cust_active;
        $location.path('customer/edit');
    };

    vm.editContact = function(cust_active, contact_active) {
        vm.customerActive.cust = cust_active;
        if(typeof contact_active != 'undefined' && contact_active != null) {
            vm.contactActive.contact = contact_active;
        }
        $location.path('customer/editContact');
    }

}