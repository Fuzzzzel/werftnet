/**
 * Created by Fuzzzzel on 16.07.2016.
 */

angular
    .module('app.user')
    .controller('userController', userController);

userController.$inject = ['$http', '$uibModal', '$window', 'userService'];

function userController($http, $uibModal, $window, userService) {
    var vm = this;

    vm.userActive = null;

    vm.changeUserPwd = changeUserPwd;

    function changeUserPwd(user_changepwd_form, pwd_old, pwd_new) {
        user_changepwd_form.$setSubmitted();
        if(!user_changepwd_form.$valid) {
            return;
        }
        $http({
            method: 'POST',
            url: 'user/changeUserPwd',
            data: {
                pwd_old: pwd_old,
                pwd_new: pwd_new
            }
        }).then(function successCallback(response) {
            // add to valueArray - reponse is object from DB
            if (typeof response.data.errors !== 'undefined' && response.data.errors.length > 0) {
                alert(response.data.errors[0].message);
            } else {
                alert('Passwort wurde erfolgreich geändert!');
                $window.history.back();
            }
        }, function errorCallback(error) {
            console.log(error);
        });
    }
}