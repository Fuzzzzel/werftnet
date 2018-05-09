/**
 * Created by Fuzzzzel on 17.07.2016.
 */

angular.module('app.core')
    .controller('coreController', coreController);

coreController.$inject = ['$scope', 'dataService', 'userService', '$location', '$window'];

function coreController($scope, dataService, userService, $location, $window) {
    var scope = this;
    scope.data = [];
    scope.dataloaded = false;

    activate();

    $scope.$watch(userService.isLoggedIn, function (isLoggedIn) {
        // Do something if user is not logged in any more
        // $scope.isLoggedIn = isLoggedIn;
        // $scope.currentUser = userService.getCurrentUser();
    });

    scope.login = userService.login;
    scope.logout = userService.logout;
    scope.getCurrentUser = userService.getCurrentUser;
    scope.isLoggedIn = userService.isLoggedIn;
    scope.hasRole = userService.hasRole;
    scope.getLoginError = userService.getLoginError;

    function activate() {
        userService.testServerForLogedInUser(
            function () {
                $location.path("/");
            });
        dataService.getDefaultData()
            .then(function (data) {
                scope.data = data;
                scope.dataloaded = true;
            });
    }

    // Function to change location on ng-click
    scope.go = function (path) {
        $location.path(path);
    };

    // function to make alert work
    scope.alert = function (msg) {
        $window.alert(msg);
    };


    // Fügt ein Element zum angegebenen Array hinzu
    scope.addToArray = function (targetArray, obj) {
        if (obj) {
            targetArray.push(obj);
        }
    };

    // Fügt ein Element zum angegebenen Array hinzu
    scope.addCopyToArray = function (targetArray, obj) {
        if (obj) {
            var copyObj = angular.copy(obj);
            targetArray.push(copyObj);
        }
    };

    // Entfernt Element aus dem angegebenen Array
    scope.removeFromArray = function (targetArray, obj) {
        if (targetArray.length > 0) {
            for (var i = 0; i < targetArray.length; i++) {
                if (targetArray[i].id == obj.id) {
                    targetArray.splice(i, 1);
                    break;
                }
            }
        }
    };

    scope.historyBack = function () {
        $window.history.back();
    };

    scope.getPages = function (pageCurrent, pageMax) {
        var pages = [];
        var pageStart = 1;

        if ((pageCurrent > 10) && (pageMax - 21 > 0)) {
            pageStart = pageCurrent - 10;
        }

        for (var i = pageStart; i <= pageMax && i < pageStart + 21; i++) {
            pages.push(i);
        }

        return pages;
    }
}

/**
 * Filter für Listen. Filtert alle Einträge aus einer Liste (input),
 * die in der anderen Liste (search) bereits enthalten sind.
 */
angular.module('app.core')
    .filter('filterSelected', function () {
        return function (input, search) {
            if (!input) return input;
            if (!search || search.length == 0) return input;

            var result = [];

            angular.forEach(input, function (value, key) {
                var found = false;

                if (search.length > 0) {
                    for (var i = 0; i < search.length; i++) {
                        if (value.id == search[i].id) {
                            found = true;
                            break;
                        }
                    }
                }
                if (!found) {
                    result.push(value);
                }
            });

            return result;
        }
    });

/**
 * Filter sortiert einen Array nach dem Attribut name
 */
angular.module('app.core')
    .filter('orderByName', function (dataService) {
        return function (input, property) {
            if (!property) property = 'name';
            if (!input) {
                return null;
            }

            if (property === 'name') {
                return input.sort(function (a, b) {
                    var valA = dataService.getCombinedDisplayName(a);
                    var valB = dataService.getCombinedDisplayName(b);
                    return (valA.localeCompare(valB))
                });
            } else {
                return input.sort(function (a, b) {
                    var valA = eval('a.' + property);
                    var valB = eval('b.' + property);
                    return (valA.localeCompare(valB))
                });
            }
        }
    });

angular.module('app.core')
    .filter('orderPrices', function (dataService) {
        return function (input, property) {
            if (!input) {
                return null;
            }

            return input.sort(function (a, b) {
                var result = 0;

                var valA = dataService.getCombinedDisplayName(a.lng_source);
                var valB = dataService.getCombinedDisplayName(b.lng_source);
                if (valA && valB)
                    result = valA.localeCompare(valB);

                if (result === 0) {
                    valA = dataService.getCombinedDisplayName(a.lng_target);
                    valB = dataService.getCombinedDisplayName(b.lng_target);
                    if (valA && valB)
                        result = valA.localeCompare(valB);
                }

                if (result === 0) {
                    valA = dataService.getCombinedDisplayName(a.service);
                    valB = dataService.getCombinedDisplayName(b.service);
                    if (valA && valB)
                        result = valA.localeCompare(valB);
                }

                return result;
            });

        }
    });

/**
 * Filter sortiert Array mit zwei Werten nach dem Attribut name
 */
angular.module('app.core')
    .filter('orderTwoProps', function () {
        return function (input, propMain, propSub) {
            if (!input) {
                return null;
            }
            return input.sort(function (a, b) {
                var prop1 = eval('a.' + propMain);
                var prop2 = eval('b.' + propMain);
                var result = prop1.name.localeCompare(prop2.name);
                if (result == 0) {
                    var subProp1 = eval('a.' + propSub);
                    var subProp2 = eval('b.' + propSub);
                    result = subProp1.name.localeCompare(subProp2.name);
                }
                return result;
            });
        }
    });

/**
 * Filter für Sprachen. Aus Sprachen und Subsprachen wird ein
 * eindimensionaler Array gemacht.
 */
angular.module('app.core')
    .filter('flatten', function () {
        return function (array) {
            return array.reduce(function (flatten, group) {
                group.subLanguages.forEach(function (item) {
                    flatten.push({mainLang: group.name, name: item.name})
                });
                return flatten;
            }, []);
        }
    });