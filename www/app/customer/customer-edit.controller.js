/**
 * Created by Fuzzzzel on 16.07.2016.
 */

angular
    .module('app.customer')
    .controller('customerEditController', customerEditController);

customerEditController.$inject = ['customerActive'];

function customerEditController(customerActive) {

    // Leeren Kunden erstellen, damit alle Werte verschickt werden
    var vm = this;

    vm.cust_edit_obj = customerActive;
}