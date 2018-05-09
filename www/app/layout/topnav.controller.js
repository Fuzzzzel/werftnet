/**
 * Created by Fuzzzzel on 16.07.2016.
 */

angular.module('app.shell')
    .controller('topNavCtrl', topNavCtrl);

topNavCtrl.$inject = ['$location', '$route', '$rootScope'];

function topNavCtrl($location, $route, $rootScope) {
    var scope = this;
    scope.isCollapsed = true;

    $rootScope.$on('$routeChangeSuccess', function () {
        scope.isCollapsed = true;
    });

    scope.getActiveNavElement = function (path) {
        if(path === '/') {
            if($location.path() === '/') {
                return "active";
            } else {
                return "";
            }
        }

        if ($location.path().substr(0, path.length) === path) {
            return "active";
        } else {
            return "";
        }
    }
}