/**
 * Created by Fuzzzzel on 04.09.2016.
 */

angular
    .module('app.freelancer')
    .factory('freelancerActive', freelancerActive);


function freelancerActive() {
    var flActive = {};
    flActive.fl = {};

    flActive.reset = function () {
        delete flActive.fl;

        var fl_new = {};

        // Contact
        fl_new.anrede = null;
        fl_new.name1 = "";
        fl_new.name2 = "";
        fl_new.company_name = "";

        fl_new.supplier_no = null;
        fl_new.email = "";
        fl_new.email2 = "";
        fl_new.phone = "";
        fl_new.phone2 = "";
        fl_new.fax = "";
        fl_new.skype = "";
        fl_new.correspond_language = null;
        fl_new.comment = "";

        // Address
        fl_new.address = {};
        fl_new.address.street = "";
        fl_new.address.street2 = "";
        fl_new.address.zipcode = "";
        fl_new.address.city = "";
        fl_new.address.country = null;

        fl_new.fl_status = null;
        fl_new.fl_rating = null;

        fl_new.sworn = false;
        fl_new.nda = null;
        fl_new.fl_payment_type = null;
        fl_new.fl_invoicing_type = null;
        fl_new.vat_payer = false;
        fl_new.cat_prices = false;

        fl_new.lang_combos = [];
        fl_new.cat_tools = [];
        fl_new.prices = [];
        fl_new.sectors = [];

        fl_new.vat_no = "";
        fl_new.bankdetails = "";

        flActive.fl = fl_new;
    };

    return flActive;
}