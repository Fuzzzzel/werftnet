/**
 * Created by Fuzzzzel on 10.09.2016.
 */

angular
    .module('app.customer')
    .factory('customerLoaded', customerLoaded);


function customerLoaded() {
    var custLoaded = {};
    custLoaded.itemsTotal = 0;
    custLoaded.itemsPerPage = 0;
    custLoaded.pageCurrent = 0;
    custLoaded.pageMax = 0;

    custLoaded.setNewList = function(newList) {
        if(typeof newList.items !== 'undefined' && Array.isArray(newList.items))
            custLoaded.items = newList.items;
        else
            custLoaded.items = [];

        if(typeof newList.itemsTotal !== 'undefined' && newList.itemsTotal > 0)
            custLoaded.itemsTotal = newList.itemsTotal;
        else
            custLoaded.itemsTotal = 0;

        if(typeof newList.itemsPerPage !== 'undefined' && newList.itemsPerPage > 0)
            custLoaded.itemsPerPage = newList.itemsPerPage;
        else
            custLoaded.itemsPerPage = 0;

        if(typeof newList.pageCurrent !== 'undefined' && newList.pageCurrent > 0)
            custLoaded.pageCurrent = newList.pageCurrent;
        else
            custLoaded.pageCurrent = 0;

        if(typeof newList.pageMax !== 'undefined' && newList.pageMax > 0)
            custLoaded.pageMax = newList.pageMax;
        else
            custLoaded.pageMax = 0;
    };

    return custLoaded;
}