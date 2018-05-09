/**
 * Created by Fuzzzzel on 04.09.2016.
 */

angular
    .module('app.freelancer')
    .factory('freelancerLoaded', freelancerLoaded);


function freelancerLoaded() {
    var flLoaded = {};

    flLoaded.items = [];
    flLoaded.itemsTotal = 0;
    flLoaded.itemsPerPage = 0;
    flLoaded.pageCurrent = 0;
    flLoaded.pageMax = 0;

    flLoaded.setNewList = function(newList) {
        if(typeof newList.items !== 'undefined' && Array.isArray(newList.items))
            flLoaded.items = newList.items;
        else
            flLoaded.items = [];

        if(typeof newList.itemsTotal !== 'undefined' && newList.itemsTotal > 0)
            flLoaded.itemsTotal = newList.itemsTotal;
        else
            flLoaded.itemsTotal = 0;

        if(typeof newList.itemsPerPage !== 'undefined' && newList.itemsPerPage > 0)
            flLoaded.itemsPerPage = newList.itemsPerPage;
        else
            flLoaded.itemsPerPage = 0;

        if(typeof newList.pageCurrent !== 'undefined' && newList.pageCurrent > 0)
            flLoaded.pageCurrent = newList.pageCurrent;
        else
            flLoaded.pageCurrent = 0;

        if(typeof newList.pageMax !== 'undefined' && newList.pageMax > 0)
            flLoaded.pageMax = newList.pageMax;
        else
            flLoaded.pageMax = 0;
    };

    return flLoaded;
}