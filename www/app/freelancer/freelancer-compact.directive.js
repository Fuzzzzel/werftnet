/**
 * Created by Fuzzzzel on 30.08.2016.
 *
 * Kompakte Anzeige eines Freelancers als Suchergebnis
 */

angular.module('app.freelancer')
    .directive('fzFreelancerCompact', fzFreelancerCompact);

fzFreelancerCompact.$inject = ['dataService'];

function fzFreelancerCompact(dataService) {
    return {
        restrict: 'E',
        scope: {
            fl: "=fl",
            editmethod: "="
        },
        controller: directiveController,
        controllerAs: 'flCompCtrl',
        templateUrl: './app/freelancer/freelancer-compact.html'
    };

    // Controller für die Directive
    function directiveController($scope) {
        $scope.getCombinedDisplayName = dataService.getCombinedDisplayName;
    }

}