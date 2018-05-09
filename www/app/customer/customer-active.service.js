/**
 * Created by Fuzzzzel on 04.09.2016.
 */

angular
    .module('app.customer')
    .factory('customerActive', customerActive);


function customerActive() {
    var custActive = {};
    custActive.cust = {};

    custActive.reset = function () {
        delete custActive.cust;

        // ToDo: Werte anpassen, die beim Kunden tatsächlich genutzt werden

        var cust_new = {};

        // Contact
        cust_new.anrede = null;
        cust_new.name1 = "";
        cust_new.name2 = "";

        cust_new.email = "";
        cust_new.email2 = "";
        cust_new.phone = "";
        cust_new.phone2 = "";
        cust_new.fax = "";
        cust_new.skype = "";
        cust_new.comment = "";

        // Address

        cust_new.address = {};
        cust_new.address.street = "";
        cust_new.address.street2 = "";
        cust_new.address.zipcode = "";
        cust_new.address.city = "";
        cust_new.address.country = null;

        cust_new.origin = null;
        cust_new.potential = null;
        cust_new.status = null;

        cust_new.invoicing_details = "";

        cust_new.account_manager = null;
        cust_new.contacts = [];

        custActive.cust = cust_new;
    };

    return custActive;
}