/**
 * Created by Fuzzzzel on 16.07.2016.
 *
 * Service holt die Basisdaten beim Start der App einmalig vom Server
 */

angular
    .module('app.core')
    .factory('dataService', dataService);

dataService.$inject = ['$http', '$log'];

function dataService($http, $log) {
    return {
        getDefaultData: getDefaultData,
        getCombinedDisplayName: getCombinedDisplayName,
        getFlattenedTwoLevelEntity: getFlattenedTwoLevelEntity,
        getAllUsers: getAllUsers,
        getUserRoles: getUserRoles
    };

    // Lädt die Basisdaten aus Symfony
    function getDefaultData() {
        return $http.get('getDefaults')
            .then(getDefaultsComplete)
            .catch(getDefaultsFailed);
    }

    function getDefaultsComplete(response) {
        // Flat Languages
        response.data.languages_flat = {};
        var originalVal = response.data.languages_flat;
        Object.defineProperty(response.data, 'languages_flat', {
            get: function () {
                return getFlattenedTwoLevelEntity(response.data.languages);
            },
            set: function (val) {
                callback.call(o, p, val);
                return originalVal = val;
            }
        });

        // Flatten Sectors
        response.data.sectors_flat = {};
        originalVal = response.data.sectors_flat;
        Object.defineProperty(response.data, 'sectors_flat', {
            get: function () {
                return getFlattenedTwoLevelEntity(response.data.sectors);
            },
            set: function (val) {
                callback.call(o, p, val);
                return originalVal = val;
            }
        });

        return response.data;
    }

    function getDefaultsFailed(error) {
        $log.error('Basisdaten (Fachgebiete, Sprachen etc.) konnten nicht geladen werden.' + error.data);
    }

    /**
     * Used in userController routes
     * @returns {*}
     */
    function getAllUsers() {
        return $http.get('admin/getAllUsers')
            .then(
                function success(response) {
                    return response.data
                },
                function error() {
                    return "Fehler beim Laden der Benutzer!";
                });
    }

    /**
     * Used in userController routes
     * @returns {*}
     */
    function getUserRoles() {
        return $http.get('getUserRoles')
            .then(
                function success(response) {
                    return response.data
                },
                function error() {
                    return "Fehler beim Laden der Benutzer-Rollen!";
                });
    }
}

// Anzeigename für SubEntities ermitteln
function getCombinedDisplayName(obj) {
    if (!obj) return null;

    if (typeof obj.main_item === 'undefined')
        return obj.name;

    return obj.main_item.name + ' (' + obj.name + ')';
}

function getFlattenedTwoLevelEntity(twoLevelEntity) {
    var arrTemp = angular.copy(twoLevelEntity);
    var flatArr = [];

    if (typeof arrTemp.values !== 'undefined') {
        for (var idxMain = 0; idxMain < arrTemp.values.length; idxMain++) {
            flatArr.push(arrTemp.values[idxMain]);
            if (typeof arrTemp.values[idxMain].subItems !== 'undefined') {
                for (var idxSub = 0; idxSub < arrTemp.values[idxMain].subItems.length; idxSub++) {
                    arrTemp.values[idxMain].subItems[idxSub].name = arrTemp.values[idxMain].name + ' (' + arrTemp.values[idxMain].subItems[idxSub].name + ')';
                    flatArr.push(arrTemp.values[idxMain].subItems[idxSub]);
                }
            }
        }
    }

    arrTemp.values = flatArr;

    return arrTemp;
}