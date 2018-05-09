/**
 * Created by Fuzzzzel on 16.07.2016.
 */

require([
        // Angular als Basis
        'cdn_local/angular'
    ],
    function () {
        require([
            // Angular Module
            'cdn_local/angular-animate',
            'cdn_local/angular-aria.min',
            'cdn_local/angular-messages.min',
            'cdn_local/angular-route',
            'cdn_local/angular-sanitize.min',
            'cdn_local/angular-touch',
            'cdn_local/angular-xeditable/js/xeditable',
            'cdn_local/ui-bootstrap-tpls-2.5.0.min',
            'cdn_local/ui-select/select.min',
            'cdn_local/angular-locale_de-de',

            // App Module
            'core/core.module',
            'freelancer/freelancer.module',
            'customer/customer.module',
            'admin/admin.module',
            'user/user.module',
            'layout/shell.module'

        ], function () {
            require([
                'cdn_local/angular-material/js/angular-material.min',

                // Bestandteile der App Module
                'core/onenterkey.directive',
                'core/propmultiselect.directive',
                'core/langcombomultiselect.directive',
                'core/data.service',
                'core/user.service',
                'core/core.config',
                'core/core.controller',

                // Freelancer
                'freelancer/freelancer.controller',
                'freelancer/freelancer.routes',
                'freelancer/freelancer-edit.controller',
                'freelancer/freelancer-form.directive',
                'freelancer/freelancer-compact.directive',
                'freelancer/freelancer-active.service',
                'freelancer/freelancer-loaded.service',

                // Kunde
                'customer/customer.controller',
                'customer/customer.routes',
                'customer/customer-edit.controller',
                'customer/customer-form.directive',
                'customer/customer-compact.directive',
                'customer/customer-active.service',
                'customer/customer-loaded.service',
                'customer/contact-edit.controller',
                'customer/contact-form.directive',
                'customer/contact-active.service',

                // Adminbereich
                'admin/admin.controller',
                'admin/admin.routes',
                'admin/alistsimple.directive',
                'admin/alisttwolevel.directive',
                'admin/alisttwolevelentity.directive',

                'admin/user/useradmin.controller',

                // Userbereich/Userprofil
                'user/user.controller',
                'user/user.routes',

                // Hauptlayout
                'layout/shell.controller',
                'layout/shell.routes',
                'layout/topnav.controller',

                // Hauptmodul der App
                'app.module'
            ], function () {
                require([
                    // Hauptkonfiguration
                    'app.config'
                ], function () {

                    // manual bootstrap application after all scripts are loaded
                    angular.bootstrap(document, ['app']);
                });
            });

        });

    });

