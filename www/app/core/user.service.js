/**
 * Created by Fuzzzzel on 31.08.2017.
 */

angular
    .module('app.core')
    .factory('userService', userService);

userService.$inject = ['$http', '$location'];

function userService($http, $location) {
    var currentUser = null;
    var loginError = null;

    return {
        login: login,
        logout: logout,
        isLoggedIn: isLoggedIn,
        hasRole: hasRole,
        getCurrentUser: getCurrentUser,
        testServerForLogedInUser: testServerForLogedInUser,
        getLoginError: getLoginError
    };

    function login(username, password) {
        // try to authenticate
        // Symfony: send redirect browser to /login
        // name: _username, _password route: login_check
        // set user logged in
        var credentials = {
            _username: username,
            _password: password,
            _remember_me: true
        };

        var formData = new FormData();
        formData.append('_username', username);
        formData.append('_password', password);
        formData.append('_remember_me', true);

        $http({
            method: 'POST',
            url: '/login_check',
            data: credentials,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            transformRequest: function(obj) {
                var str = [];
                for(var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            }
        }).then(function successCallback(response) {
            currentUser = null;
            if(typeof response.data.username !== 'undefined' && response.data.username !== null) {
                currentUser = {};
                currentUser.username = response.data.username;
                currentUser.roles = response.data.roles;
                loginError = null;
                $location.path( "/" );
            }

            if (currentUser === null) {
                if(typeof response.data.errors !== 'undefined' && response.data.errors.length > 0) {
                    loginError = response.data.errors[0].message;
                } else {
                    loginError = null;
                    alert("Logindaten nicht korrekt!");
                }
            }
        }, function errorCallback(error) {
            currentUser = null;
            alert("Es ist ein Fehler beim Login aufgetreten!");
        });
    }

    function testServerForLogedInUser(callback) {
        $http({
            method: 'POST',
            url: '/get_logged_in_user'
        }).then(function successCallback(response) {
            if (typeof response.data.username !== 'undefined') {
                currentUser = {};
                currentUser.username = response.data.username;
                currentUser.roles = response.data.roles;
                if(typeof callback === 'function')
                    callback();
            }
        });
    }

    function logout() {
        // logout from server
        $http({
            method: 'POST',
            url: '/logout'
        }).then(function successCallback(response) {
            currentUser = null;
            $location.path( "/loggedout" );
        }, function errorCallback(error) {
            alert("Es ist ein Fehler beim Logout aufgetreten!");
        });
    }

    function getCurrentUser() {
        return currentUser;
    }

    function getLoginError() {
        return loginError;
    }

    function isLoggedIn() {
        return currentUser !== null;
    }

    function hasRole(role) {
        if (typeof currentUser === 'undefined' || currentUser === null)
            return false;

        if (typeof currentUser.roles === 'undefined' || Object.prototype.toString.call( currentUser.roles ) !== '[object Array]' )
            return false;

        return currentUser.roles.indexOf(role) >= 0;
    }

}