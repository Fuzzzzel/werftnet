/**
 * Created by Fuzzzzel on 16.07.2016.
 */

angular
    .module('app.admin')
    .controller('adminController', adminController);

adminController.$inject = ['$http', '$uibModal'];

function adminController($http, $uibModal) {
    var scope = this;

    scope.alistMethods = {};
    scope.new_item = "";

    // Einfache Entities
    scope.alistMethods.addAlistSimpleEntity = addAlistSimpleEntity;
    scope.alistMethods.removeAlistSimpleEntity = removeAlistSimpleEntity;
    scope.alistMethods.updateAlistSimpleEntity = updateAlistSimpleEntity;

    // Entities mit Subentity
    scope.alistMethods.addAlistSimpleSubEntity = addAlistSimpleSubEntity;
    scope.alistMethods.removeAlistSimpleSubEntity = removeAlistSimpleSubEntity;
    scope.alistMethods.updateAlistSimpleSubEntity = updateAlistSimpleSubEntity;

    // Sprachen (etwas komplizierter mit der Subsprache)
    scope.alistMethods.addAlistTwoLevelEntity = addAlistTwoLevelEntity;
    scope.alistMethods.removeAlistTwoLevelEntity = removeAlistTwoLevelEntity;
    scope.alistMethods.updateAlistTwoLevelEntity = updateAlistTwoLevelEntity;
    scope.alistMethods.makeMainItem = makeMainItem;
    scope.alistMethods.addAsSubItem = addAsSubItem;


    /**
     * Adds item to the database, receives id and adds item
     * to the according array in angular
     */
    function addAlistSimpleEntity(entity, valueArray, newItemName) {

        if (entity == null || entity == "") {
            alert("Bug: Name der Entity nicht angegeben");
            return null;
        }

        if (newItemName == null || newItemName == "") {
            alert("Der neue Name darf nicht leer sein!");
            return null;
        }

        $http({
            method: 'POST',
            url: 'admin/addAlistSimpleEntity',
            data: {
                entity: entity,
                newItemName: newItemName
            }
        }).then(function successCallback(response) {
            // add to valueArray - reponse is object from DB
            if (response.data.id > 0) {
                valueArray.values.push(response.data);
            }
        }, function errorCallback(error) {
            console.log(error);
        });

    }

    /**
     * Removes item in database and updates angular array
     * on success
     */
    function removeAlistSimpleEntity(entity, valueArray, id) {
        if (confirm("Eintrag wird gelöscht!")) {
            $http({
                method: 'POST',
                url: 'admin/removeAlistSimpleEntity',
                data: {
                    entity: entity,
                    removeItemId: id
                }
            }).then(function successCallback(response) {
                // remove from valueArray
                for (var i = 0; i < valueArray.values.length; i++) {
                    var obj = valueArray.values[i];
                    if (obj.id == id) {
                        valueArray.values.splice(i, 1);
                    }
                }

            }, function errorCallback(error) {
                console.log(error);
            });
        }
    }

    /**
     * Updates item in database and updates angular array
     * on success
     *
     * // Change to input on first click, then update on second click!
     */
    function updateAlistSimpleEntity(entity, item_id, item_edited_name) {
        if (entity == null || entity == "") {
            alert("Bug: Name der Entity nicht angegeben")
            return null;
        }

        if (item_edited_name == null || item_edited_name == "") {
            alert("Der neue Name darf nicht leer sein!");
            return null;
        }

        $http({
            method: 'POST',
            url: 'admin/updateAlistSimpleEntity',
            data: {
                entity: entity,
                editedItemId: item_id,
                editedItemName: item_edited_name
            }
        }).then(function successCallback(response) {
            // add to valueArray - reponse is object from DB
        }, function errorCallback(error) {
            console.log(error);
        });
    }


    /**
     * Adds item to the database, receives id and adds item
     * to the according array in angular
     */
    function addAlistSimpleSubEntity(mainEntity, values, mainItemId, newSubItemName) {

        if (mainEntity == null || mainEntity == "") {
            alert("Bug: Name der Entity nicht angegeben")
            return null;
        }

        if (newSubItemName == null || newSubItemName == "") {
            alert("Der neue Name darf nicht leer sein!");
            return null;
        }

        $http({
            method: 'POST',
            url: 'admin/addAlistSimpleSubEntity',
            data: {
                entity: mainEntity,
                mainItemId: mainItemId,
                newSubItemName: newSubItemName
            }
        }).then(function successCallback(response) {
            // add to valueArray - reponse is object from DB
            if (response.data.id > 0) {
                values.push(response.data);
            }
        }, function errorCallback(error) {
            console.log(error);
        });

    }

    /**
     * Removes item in database and updates angular array
     * on success
     */
    function removeAlistSimpleSubEntity(mainEntity, values, mainItemId, subItemId) {
        if (confirm("Eintrag wird gelöscht!")) {
            $http({
                method: 'POST',
                url: 'admin/removeAlistSimpleSubEntity',
                data: {
                    mainEntity: mainEntity,
                    mainItemId: mainItemId,
                    removeItemId: subItemId
                }
            }).then(function successCallback(response) {
                // remove from valueArray
                for (var i = 0; i < values.length; i++) {
                    var obj = values[i];
                    if (obj.id == subItemId) {
                        values.splice(i, 1);
                    }
                }
            }, function errorCallback(error) {
                console.log(error);
            });
        }
    }

    /**
     * Updates item in database and updates angular array
     * on success
     *
     * // Change to input on first click, then update on second click!
     */
    function updateAlistSimpleSubEntity(entity, sub_item_id, sub_item_edited_name) {
        if (entity == null || entity == "") {
            alert("Bug: Name der Entity nicht angegeben")
            return null;
        }

        if (sub_item_edited_name == null || sub_item_edited_name == "") {
            alert("Der neue Name darf nicht leer sein!");
            return null;
        }

        $http({
            method: 'POST',
            url: 'admin/updateAlistSimpleSubEntity',
            data: {
                entity: entity,
                editedItemId: sub_item_id,
                editedItemName: sub_item_edited_name
            }
        }).then(function successCallback(response) {
            // add to valueArray - reponse is object from DB
        }, function errorCallback(error) {
            console.log(error);
        });
    }

    // Neues Item anlegen und dem valueArray hinzufügen
    function addAlistTwoLevelEntity(entityName, valueArray, newItemName, itemMainId) {

        if (newItemName === null || newItemName === "") {
            alert("Der neue Name darf nicht leer sein!");
            return null;
        }

        if (typeof itemMainId === 'undefined') {
            itemMainId = null;
        }

        $http({
            method: 'POST',
            url: 'admin/addTwoLevelEntity',
            data: {
                entityName: entityName,
                newItemName: newItemName,
                itemMainId: itemMainId
            }
        }).then(function successCallback(response) {
            // add to valueArray - reponse is object from DB
            console.log("itemMainId: " + itemMainId);
            if (response.data.id > 0) {
                if (itemMainId === null) {
                    // Neue Hauptsprache wurde angelegt
                    valueArray.values.push(response.data);
                } else {
                    var itemMain = valueArray.values.find(function (lang) {
                        return lang.id === itemMainId;
                    });
                    console.log(itemMainId);
                    console.log(response.data);
                    if (typeof itemMain.subItems === 'undefined') {
                        itemMain.subItems = [];
                    }
                    itemMain.subItems.push(response.data);
                }
            }
        }, function errorCallback(error) {
            console.log(error);
        });
    }

    // Item mit gegebener ID löschen
    function removeAlistTwoLevelEntity(entityName, valueArray, item, itemMain) {
        if (typeof itemMain === 'undefined') {
            itemMain = null;
        }

        if (itemMain === null && typeof item.subItems !== 'undefined' && item.subItems.length > 0) {
            alert("Sprache hat noch Subsprachen und kann nicht gelöscht werden!");
            return null;
        }

        if (confirm("Eintrag wird gelöscht!")) {
            $http({
                method: 'POST',
                url: 'admin/removeTwoLevelEntity',
                data: {
                    entityName: entityName,
                    removeItemId: item.id
                }
            }).then(function successCallback(response) {
                // remove from valueArray
                if (itemMain === null) {
                    var idx = valueArray.values.indexOf(item);
                    valueArray.values.splice(idx, 1);
                } else {
                    console.log(item);
                    console.log(itemMain.subItems);
                    var idx = itemMain.subItems.indexOf(item);
                    itemMain.subItems.splice(idx, 1);
                }

            }, function errorCallback(error) {
                console.log(error);
            });
        }
    }

    // Name der Sprache mit gegebener ID aktualisieren
    function updateAlistTwoLevelEntity(entityName, itemEditedId, itemEditedName) {
        if (entityName === null || entityName === "") {
            alert("Bug: Name der Entity nicht angegeben")
            return null;
        }

        if (itemEditedName === null || itemEditedName === "") {
            alert("Der neue Name darf nicht leer sein!");
            return null;
        }

        $http({
            method: 'POST',
            url: 'admin/updateTwoLevelEntity',
            data: {
                entityName: entityName,
                itemEditedId: itemEditedId,
                itemEditedName: itemEditedName
            }
        }).then(function successCallback(response) {
            // Do nothing. Valuearray is updated automatically.
        }, function errorCallback(error) {
            console.log(error);
        });
    }

    // Subsprache zu Hauptsorache machen (falls nicht selbst Hauptsprache ist)
    // und aus dem Array der Hauptsprache entfernen
    function makeMainItem(entityName, valueArray, item, itemMain) {

        $http({
            method: 'POST',
            url: 'admin/makeMainItem',
            data: {
                entityName: entityName,
                itemId: item.id,
                itemMainId: itemMain.id
            }
        }).then(function successCallback(response) {

            // Remove as sub-item
            var idx = itemMain.subItems.indexOf(item);
            itemMain.subItems.splice(idx, 1);

            // Add as main in vlaueArray
            valueArray.values.push(item);

        }, function errorCallback(error) {
            console.log(error);
        });
    }

    // Sprache als Subsprache hinzufügen und prüfen, ob die neue Hauptsprache nicht
    // selbst bereits eine Subsprache ist
    function addAsSubItem(entityName, valuearray, item, itemMain) {
        if (item.id === itemMain.id) {
            alert("Eine Sprache kann nicht Subsprache von sich selbst sein!");
            return;
        }

        $http({
            method: 'POST',
            url: 'admin/addAsSubItem',
            data: {
                entityName: entityName,
                itemId: item.id,
                itemMainId: itemMain.id
            }
        }).then(function successCallback(response) {

            var newItemMain = valuearray.values.find(function (e) {
                return e.id === itemMain.id
            });

            if (typeof newItemMain === 'undefined') {
                alert('Fehler beim Hinzufügen als Subelement.');
                return null;
            }

            // Remove from valueArray
            var idx = valuearray.values.indexOf(item);
            valuearray.values.splice(idx, 1);

            // Create subItems array if not available yet

            if (typeof newItemMain.subItems === 'undefined') {
                newItemMain.subItems = [];
            }
            newItemMain.subItems.push(item);


        }, function errorCallback(error) {
            console.log(error);
        });

    }
}