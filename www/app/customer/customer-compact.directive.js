/**
 * Created by Fuzzzzel on 21.02.2017.
 *
 * Kompakte Anzeige eines Kunden als Suchergebnis
 */

angular.module('app.customer')
    .directive('fzCustomerCompact', fzCustomerCompact);

fzCustomerCompact.$inject = [];

function fzCustomerCompact() {
    return {
        restrict: 'E',
        scope: {
            cust: "=cust",
            editmethod: "=",
            editcontact: "=",
            core: "="
        },
        controller: directiveController,
        controllerAs: 'ccCtrl',
        templateUrl: './app/customer/customer-compact.html'
    };

    // Controller für die Directive
    function directiveController($scope) {

    }

}