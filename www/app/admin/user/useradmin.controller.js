/**
 * Created by Fuzzzzel on 16.07.2016.
 */

angular
    .module('app.admin')
    .controller('userAdminController', userAdminController);

userAdminController.$inject = ['$http', '$uibModal', 'allUsers', 'userRoles'];

function userAdminController($http, $uibModal, allUsers, userRoles) {
    var vm = this;

    vm.allUsers = allUsers;
    vm.userRoles = userRoles;
    vm.userActive = null;

    // Delete etc. all in one window + edit in modal!

    vm.openModalEditUser = function (user) {
        vm.userActive = user;

        // Modal erzeugen
        var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'UserEditModalContent.html',
                controller: 'ModalEditUserController',
                controllerAs: 'ModalEditUserCtrl',
                size: 'lg',
                resolve: {
                    userEditTemp: function () {
                        if (typeof user !== 'undefined') {
                            return angular.copy(user);
                        } else {
                            var new_user = {
                                username: "",
                                email: "",
                                password: "",
                                roles: []
                            };
                            return new_user;
                        }
                    },
                    userRoles: function () {
                        return vm.userRoles;
                    }
                }
            }
        );

// Antwort aus Modal verarbeiteen
        modalInstance.result.then(
            function success(editedUser) {
                if (typeof editedUser !== 'undefined') {
                    if (typeof editedUser.id === 'undefined' || editedUser.id === null) {
                        // new user
                        $http({
                            method: 'POST',
                            url: 'admin/addUser',
                            data: {
                                newUser: editedUser
                            }
                        }).then(function successCallback(response) {
                            // add to valueArray - reponse is object from DB
                            if (response.data.id > 0) {
                                allUsers.push(response.data);
                            }
                        }, function errorCallback(error) {
                            console.log(error);
                        });
                    } else {
                        // user was edited
                        $http({
                            method: 'POST',
                            url: '/admin/editUser',
                            data: editedUser
                        }).then(function successCallback(response) {
                            if (typeof response.data.errors !== 'undefined' && response.data.errors.length > 0) {
                                alert(response.data.errors[0].message);
                            } else {
                                angular.extend(vm.userActive, editedUser);
                            }
                        }, function errorCallback(error) {
                            console.log(error);
                        });
                    }
                }
            }, function error() {
                // Cancel wurde gedrückt - keine Aktion
            });
    }
}


/**
 * Controller für das Modal zum Bearbeiten/Anlegen eines Benutzers
 */
angular.module('app.admin')
    .controller('ModalEditUserController', ModalEditUserController);

ModalEditUserController.$inject = ['$uibModalInstance', '$http', 'userEditTemp', 'userRoles'];

function ModalEditUserController($uibModalInstance, $http, userEditTemp, userRoles) {
    var vm = this;
    vm.userEditTemp = userEditTemp;
    vm.userRoles = userRoles;
    vm.pwdNew = null;

    vm.mainSelectOk = function (user_edit_form, userEditResult) {
        user_edit_form.$setSubmitted();
        if (!user_edit_form.$valid) {
            return;
        }
        $uibModalInstance.close(userEditResult);
    };

    vm.mainSelectCancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    vm.mainSelectDelete = function () {
        if (confirm("Benutzer wirklich löschen?!")) {
            // Delete User
            alert("Löschen ist noch nicht implementiert, kommt noch.")
        }
    };

    vm.changeUserPwd = function (user_edit_pwd_form) {
        if (typeof vm.userEditTemp !== 'undefined') {
            if (typeof vm.userEditTemp.id !== 'undefined' || vm.userEditTemp.id !== null) {
                user_edit_pwd_form.$setSubmitted();
                if (!user_edit_pwd_form.$valid) {
                    return;
                }
                // password change
                $http({
                    method: 'POST',
                    url: 'admin/changeUserPwd',
                    data: {
                        user_id: vm.userEditTemp.id,
                        pwd_new: vm.pwdNew
                    }
                }).then(function successCallback(response) {
                    if (typeof response.data.errors !== 'undefined' && response.data.errors.length > 0) {
                        alert(response.data.errors[0].message);
                    } else {
                        vm.pwdNew = null;
                        user_edit_pwd_form.$setPristine();
                        user_edit_pwd_form.$setUntouched();
                        alert(response.data.message);
                    }
                }, function errorCallback(error) {
                    console.log(error);
                });
            } else {
                // error when submitting password
                alert("Es wurde kein User zum Ändern angegeben!");
            }
        }
    };
}