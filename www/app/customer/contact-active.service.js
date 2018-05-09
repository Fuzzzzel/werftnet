/**
 * Created by Fuzzzzel on 28.02.2017.
 */

angular
    .module('app.customer')
    .factory('contactActive', contactActive);


function contactActive() {
    var contactActive = {};
    contactActive.contact = {};

    contactActive.reset = function (customer) {
        delete contactActive.contact;

        // ToDo: Werte anpassen, die beim Kunden tatsächlich genutzt werden

        var contact_new = {};

        // Contact
        contact_new.customer = customer;

        contact_new.anrede = null;
        contact_new.name1 = "";
        contact_new.name2 = "";
        contact_new.position = "";


        contact_new.email = "";
        contact_new.email2 = "";
        contact_new.phone = "";
        contact_new.phone2 = "";
        contact_new.fax = "";
        contact_new.skype = "";
        contact_new.correspond_language = null;
        contact_new.comment = "";

        contactActive.contact = contact_new;
    };

    return contactActive;
}