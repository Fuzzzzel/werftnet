/**
 * Created by Fuzzzzel on 16.07.2016.
 */

angular
    .module('app.freelancer')
    .controller('freelancerEditController', freelancerEditController);

freelancerEditController.$inject = ['freelancerActive'];

function freelancerEditController(freelancerActive) {

    // Leeren Freelancer erstellen, damit alle Werte verschickt werden
    var vm = this;

    vm.fl_edit_obj = freelancerActive;
}