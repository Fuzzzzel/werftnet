/**
 * Created by Fuzzzzel on 16.07.2016.
 */

angular.module('app')
    .config([
        '$compileProvider',
        function ($compileProvider) {
            $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|skype):/);
        }
    ]);

angular.module('app')
    .run([
        '$route',
        function () {
        }]);