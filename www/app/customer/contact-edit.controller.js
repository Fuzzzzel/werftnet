/**
 * Created by Fuzzzzel on 01.03.2017.
 */

angular
    .module('app.customer')
    .controller('customerContactEditController', customerContactEditController);

customerContactEditController.$inject = ['customerActive', 'contactActive'];

function customerContactEditController(customerActive, contactActive) {

    // Leeren Kunden erstellen, damit alle Werte verschickt werden
    var vm = this;

    vm.cust_edit_obj = customerActive;
    vm.contact_edit_obj = contactActive;
}