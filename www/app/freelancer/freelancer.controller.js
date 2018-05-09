/**
 * Created by Fuzzzzel on 16.07.2016.
 */

angular
    .module('app.freelancer')
    .controller('freelancerController', freelancerController);

freelancerController.$inject = ['$http', '$location', '$window', 'freelancerActive', 'freelancerLoaded', 'dataService'];

function freelancerController($http,
                              $location,
                              $window,
                              freelancerActive,
                              freelancerLoaded,
                              dataService) {
    var vm = this;
    vm.freelancerActive = freelancerActive;
    vm.freelancerActive.reset();

    vm.editFreelancer = function (fl_active) {
        vm.freelancerActive.fl = fl_active;

        // Date-Objekt erzeugen, damit dies im Input-Feld bearbeitet werden kann.
        vm.freelancerActive.fl.geburtstag = new Date(vm.freelancerActive.fl.geburtstag);

        $location.path('freelancer/edit');
    };

    vm.freelancerLoaded = freelancerLoaded;

    vm.paginationClick = function(fl_search) {
        vm.searchFreelancers(fl_search, vm.freelancerLoaded.pageCurrent);
    };

    vm.searchFreelancers = function(params, pageNext) {
        console.log(pageNext);
        if(typeof params === 'undefined') {
            params = {};
        }
        if(typeof pageNext !== 'undefined') {
            params.pageNext = pageNext;
        } else {
            params.pageNext = 1;
        }

        $http({
            method: 'POST',
            url: 'freelancer/searchFreelancers',
            data: params
        }).then(function successCallback(response) {
            $window.scrollTo(0, 0);
            vm.freelancerLoaded.setNewList(response.data);
        }, function errorCallback(error) {
            console.log(error);
            alert('Error in call to searchFreelancers' + error);
        });
    };

    
    function setCombinedProps(fl_list_temp) {
        // Kombinierte Schreibweisen anpassen
        for(var i = 0; i < fl_list_temp.length; i++) {
            var fl = fl_list_temp[i];

            // Sector in kombinierter Schreibweise
            var snew = [];
            for(var s = 0; s < fl.sectors.length; s++) {
                var sector = fl.sectors[s];
                console.log(fl.sectors);
                sector = dataService.getCombinedDisplayName(sector);
                snew.push(sector);
            }
            fl_list_temp[i].sectors = snew;

            // Zielsprache/Subsprache in kombinierter Schreibweise fl_list_temp.lang_combos
            var lcs_new = [];
            for(var lc = 0; lc < fl.lang_combos.length; lc++) {
                var lc_temp = fl.lang_combos[lc];
                lc_temp.lng_target = dataService.getCombinedDisplayName(lc_temp.lng_target);
                lc_temp.lng_source = dataService.getCombinedDisplayName(lc_temp.lng_source);
                lcs_new.push(lc_temp);
            }
            fl_list_temp[i].lang_combos = lcs_new;
        }

        return fl_list_temp;
    }
}