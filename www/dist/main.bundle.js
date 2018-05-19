webpackJsonp(["main"],{

/***/ "../../../../../src/$$_gendir lazy recursive":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"app/admin/admin.module": [
		"../../../../../src/app/admin/admin.module.ts",
		"admin.module"
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = "../../../../../src/$$_gendir lazy recursive";
module.exports = webpackAsyncContext;

/***/ }),

/***/ "../../../../../src/app/app-routing.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// app-routing.module.ts
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var router_1 = __webpack_require__("../../../router/@angular/router.es5.js");
var login_component_1 = __webpack_require__("../../../../../src/app/layout/login/login.component.ts");
var home_component_1 = __webpack_require__("../../../../../src/app/layout/home/home.component.ts");
var auth_guard_service_1 = __webpack_require__("../../../../../src/app/user/auth-guard.service.ts");
/**
 * Routes used in the app
 */
var ROUTE_CONFIG = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: login_component_1.LoginComponent
    },
    {
        path: 'logout',
        redirectTo: '/login'
    },
    {
        path: 'home',
        component: home_component_1.HomeComponent,
        canActivate: [auth_guard_service_1.AuthGuardService]
    },
    {
        path: 'admin',
        loadChildren: 'app/admin/admin.module#AdminModule'
    }
    /*,
    // Needs to be imported last, otherwise it overrides all other routes
    {
        path: '**',
        redirectTo: '/home'
    }
    */
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forRoot(ROUTE_CONFIG, {
                    useHash: true,
                    preloadingStrategy: router_1.PreloadAllModules
                })
            ],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<!--The content below is only a placeholder and can be replaced.-->\n<div id=\"bg_frame\">\n  <div id=\"loading\" flex=\"100\" flex-gt-sm=\"none\" layout=\"row\" *ngIf=\"!coreDataLoaded\">\n    Daten werden geladen ...\n  </div>\n  <div id=\"container\" flex=\"100\" flex-gt-sm=\"none\" layout=\"row\" *ngIf=\"coreDataLoaded\">\n    <div id=\"header\">\n      <div id=\"version-info\">WerftNET Version 1.1</div>\n      <app-top-nav *ngIf=\"isUserLoggedIn()\"></app-top-nav>\n    </div>\n    <div id=\"content\" ng-controller=\"shellController as shell\">\n      <router-outlet></router-outlet>\n    </div>\n    <div id=\"footer\">Footer für die Seite</div>\n  </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/app.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var core_data_service_1 = __webpack_require__("../../../../../src/app/core/core-data.service.ts");
var user_service_1 = __webpack_require__("../../../../../src/app/user/user.service.ts");
var util_service_1 = __webpack_require__("../../../../../src/app/core/util.service.ts");
var AppComponent = (function () {
    function AppComponent(coreDataService, userService, util) {
        this.coreDataService = coreDataService;
        this.userService = userService;
        this.util = util;
        this.title = 'WerftNET Version 1.1';
        this.coreDataLoaded = false;
    }
    AppComponent.prototype.isUserLoggedIn = function () {
        return this.userService.isLoggedIn();
    };
    AppComponent.prototype.userHasRole = function (role) {
        return this.userService.userHasRole(role);
    };
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.coreDataService.getDataLoaded().subscribe(function (dataLoaded) {
            _this.coreDataLoaded = dataLoaded;
        });
        this.userService.testServerForLoggedInUser(function () { _this.util.goTo('/home'); }, null);
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            template: __webpack_require__("../../../../../src/app/app.component.html"),
            styles: [__webpack_require__("../../../../../src/app/app.component.scss")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof core_data_service_1.CoreDataService !== "undefined" && core_data_service_1.CoreDataService) === "function" && _a || Object, typeof (_b = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" && _b || Object, typeof (_c = typeof util_service_1.UtilService !== "undefined" && util_service_1.UtilService) === "function" && _c || Object])
    ], AppComponent);
    return AppComponent;
    var _a, _b, _c;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Angular modules and components
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var platform_browser_1 = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
// Third party modules and components
var ng_bootstrap_1 = __webpack_require__("../../../../@ng-bootstrap/ng-bootstrap/index.js");
var ng2_select_1 = __webpack_require__("../../../../ng2-select/index.js");
// Own modules
var app_routing_module_1 = __webpack_require__("../../../../../src/app/app-routing.module.ts");
var shared_module_1 = __webpack_require__("../../../../../src/app/shared/shared.module.ts");
var core_module_1 = __webpack_require__("../../../../../src/app/core/core.module.ts");
var user_module_1 = __webpack_require__("../../../../../src/app/user/user.module.ts");
var freelancer_module_1 = __webpack_require__("../../../../../src/app/freelancer/freelancer.module.ts");
var customer_module_1 = __webpack_require__("../../../../../src/app/customer/customer.module.ts");
// import { AdminModule } from './admin/admin.module';
// Own components
var app_component_1 = __webpack_require__("../../../../../src/app/app.component.ts");
var login_component_1 = __webpack_require__("../../../../../src/app/layout/login/login.component.ts");
var home_component_1 = __webpack_require__("../../../../../src/app/layout/home/home.component.ts");
var top_nav_component_1 = __webpack_require__("../../../../../src/app/layout/top-nav/top-nav.component.ts");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                ng_bootstrap_1.NgbModule.forRoot(),
                ng2_select_1.SelectModule,
                core_module_1.CoreModule,
                shared_module_1.SharedModule,
                app_routing_module_1.AppRoutingModule,
                // AdminModule,
                user_module_1.UserModule,
                freelancer_module_1.FreelancerModule,
                customer_module_1.CustomerModule
            ],
            declarations: [
                app_component_1.AppComponent,
                login_component_1.LoginComponent,
                home_component_1.HomeComponent,
                top_nav_component_1.TopNavComponent
            ],
            providers: [],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/core/core-data.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var http_1 = __webpack_require__("../../../common/@angular/common/http.es5.js");
var rxjs_1 = __webpack_require__("../../../../rxjs/Rx.js");
var util_service_1 = __webpack_require__("../../../../../src/app/core/util.service.ts");
var _ = __webpack_require__("../../../../lodash/lodash.js");
var CoreDataService = (function () {
    function CoreDataService(util, http) {
        var _this = this;
        this.util = util;
        this.http = http;
        this.$dataLoaded = new rxjs_1.BehaviorSubject(false);
        this.$data = new rxjs_1.BehaviorSubject(new CoreData);
        this.refreshDefaultData(function () { _this.$dataLoaded.next(true); }, null);
    }
    CoreDataService.prototype.getData = function () {
        return this.$data.asObservable();
    };
    CoreDataService.prototype.getDataLoaded = function () {
        return this.$dataLoaded.asObservable();
    };
    CoreDataService.prototype.coreDataLoaded = function () {
        return this.$dataLoaded.getValue();
    };
    CoreDataService.prototype.refreshDefaultData = function (resolve, reject) {
        var _this = this;
        // Set up post request
        var req = this.http.get('/getDefaults');
        // Execute post request and subscribe to response
        req.subscribe(function (data) {
            data.languages_flat = _this.util.getFlattenedTwoLevelEntity(data.languages);
            data.sectors_flat = _this.util.getFlattenedTwoLevelEntity(data.sectors);
            _this.$data.next(data);
            resolve && resolve(data);
        }, function (error) {
            reject && reject(error);
        });
        return;
    };
    /**
     *
     * @param entityName Can be passed in pascal case (php-classname) or snake case (collection name in CoreDataService)
     */
    CoreDataService.prototype.getSimpleEntityCollection = function (entityName) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var entityNameConverted = _this.util.ucfirst(_.camelCase(entityName));
            // Set up post request
            var req = _this.http.get('/admin/simple_entity/' + entityNameConverted);
            // Execute post request and subscribe to response
            req.subscribe(function (data) {
                var arrayOfValues = _this.$data.getValue();
                arrayOfValues[_.snakeCase(entityName)] = data;
                _this.$data.next(arrayOfValues);
                resolve && resolve(data);
            }, function (error) {
                reject && reject(error);
            });
        });
    };
    /**
       * Adds item to the database, receives id and adds item
       * to the according array in angular
       */
    CoreDataService.prototype.createSimpleEntityItem = function (entityName, newItemName) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (entityName == null || entityName == "") {
                alert("Bug: Name der Entity nicht angegeben");
                reject && reject();
            }
            else if (newItemName == null || newItemName == "") {
                alert("Der neue Name darf nicht leer sein!");
                reject && reject();
            }
            else {
                var entityNameConverted = _this.util.ucfirst(_.camelCase(entityName));
                // Set up post request
                var req = _this.http.post('/admin/simple_entity/' + entityNameConverted, {
                    newItemName: newItemName
                });
                // Execute post request and subscribe to response
                req.subscribe(function (data) {
                    resolve && resolve(data);
                }, function (error) {
                    console.log(error);
                    reject && reject(error);
                });
            }
        });
    };
    /**
     * Removes item in database and updates angular array
     * on success
     */
    CoreDataService.prototype.deleteSimpleEntityItem = function (entityName, item_id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!confirm("Eintrag wird gelöscht!")) {
                reject && reject();
            }
            else {
                var entityNameConverted = _this.util.ucfirst(_.camelCase(entityName));
                // Set up post request
                var req = _this.http.delete('/admin/simple_entity/' + entityNameConverted + '/' + item_id);
                // Execute post request and subscribe to response
                req.subscribe(function (data) {
                    resolve && resolve(data);
                }, function (error) {
                    console.log(error);
                    reject && reject(error);
                });
            }
        });
    };
    /**
     * Updates item in database and updates angular array
     * on success
     *
     * // Change to input on first click, then update on second click!
     */
    CoreDataService.prototype.updateSimpleEntityItem = function (entityName, item_id, item_edited_name) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (entityName == null || entityName == "") {
                alert("Bug: Name der Entity nicht angegeben");
                reject && reject();
            }
            else if (item_edited_name == null || item_edited_name == "") {
                alert("Der neue Name darf nicht leer sein!");
                reject && reject();
            }
            else {
                {
                    var entityNameConverted = _this.util.ucfirst(_.camelCase(entityName));
                    // Set up post request
                    var req = _this.http.post('/admin/simple_entity/' + entityNameConverted + '/' + item_id, {
                        itemEditedName: item_edited_name
                    });
                    // Execute post request and subscribe to response
                    req.subscribe(function (data) {
                        resolve && resolve(data);
                    }, function (error) {
                        console.log(error);
                        reject && reject(error);
                    });
                }
            }
        });
    };
    /**
       *
       * @param entityName Can be passed in pascal case (php-classname) or snake case (collection name in CoreDataService)
       */
    CoreDataService.prototype.getFlattenedTwoLevelEntityCollection = function (entityName) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var entityNameConverted = _this.util.ucfirst(_.camelCase(entityName));
            // Set up post request
            var req = _this.http.get('/admin/two_level_entity/' + entityNameConverted);
            // Execute post request and subscribe to response
            req.subscribe(function (data) {
                var arrayOfValues = _this.$data.getValue();
                arrayOfValues[_.snakeCase(entityName)] = data;
                arrayOfValues[_.snakeCase(entityName) + '_flat'] = _this.util.getFlattenedTwoLevelEntity(data);
                ;
                _this.$data.next(arrayOfValues);
                resolve && resolve(data);
            }, function (error) {
                reject && reject(error);
            });
        });
    };
    CoreDataService.prototype.createTwoLevelEntityItem = function (entityName, mainItemId, newItemName) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (entityName == null || entityName == "") {
                alert("Bug: Name der Entity nicht angegeben");
                reject && reject();
            }
            else if (newItemName == null || newItemName == "") {
                alert("Der neue Name darf nicht leer sein!");
                reject && reject();
            }
            else {
                var entityNameConverted = _this.util.ucfirst(_.camelCase(entityName));
                var url = '/admin/two_level_entity/' + entityNameConverted + (mainItemId ? '/' + mainItemId + '/sub_items' : '');
                // Set up post request
                var req = _this.http.post(url, {
                    newItemName: newItemName
                });
                // Execute post request and subscribe to response
                req.subscribe(function (data) {
                    resolve && resolve(data);
                }, function (error) {
                    reject && reject(error);
                });
            }
        });
    };
    CoreDataService.prototype.deleteTwoLevelEntityItem = function (entityName, mainItemId, subItemId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!confirm("Eintrag wird gelöscht!")) {
                reject && reject();
            }
            else if (entityName == null || entityName == "") {
                alert("Bug: Name der Entity nicht angegeben");
                reject && reject();
            }
            else if (!(mainItemId > 0)) {
                alert("Bug: Eine der angegebenen Item IDs ist keine positive Zahl!");
                reject && reject();
            }
            else {
                var entityNameConverted = _this.util.ucfirst(_.camelCase(entityName));
                var url = '/admin/two_level_entity/' + entityNameConverted + '/' + mainItemId + (subItemId ? '/sub_items/' + subItemId : '');
                // Set up post request
                var req = _this.http.delete(url);
                // Execute post request and subscribe to response
                req.subscribe(function (data) {
                    resolve && resolve(data);
                }, function (error) {
                    reject && reject(error);
                });
            }
        });
    };
    CoreDataService.prototype.updateTwoLevelEntityItem = function (entityName, mainItemId, subItemId, itemNewName) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (entityName == null || entityName == "") {
                alert("Bug: Name der Entity nicht angegeben");
                return null;
            }
            else if (itemNewName == null || itemNewName == "") {
                alert("Der neue Name darf nicht leer sein!");
                return null;
            }
            else {
                var entityNameConverted = _this.util.ucfirst(_.camelCase(entityName));
                var url = '/admin/two_level_entity/' + entityNameConverted + '/' + mainItemId + (subItemId ? '/sub_items/' + subItemId : '');
                // Set up post request
                var req = _this.http.post(url, {
                    itemNewName: itemNewName
                });
                // Execute post request and subscribe to response
                req.subscribe(function (data) {
                    resolve && resolve(data);
                }, function (error) {
                    reject && reject(error);
                });
            }
        });
    };
    CoreDataService.prototype.makeMainItem = function () {
    };
    CoreDataService.prototype.addAsSubItem = function () {
    };
    CoreDataService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [typeof (_a = typeof util_service_1.UtilService !== "undefined" && util_service_1.UtilService) === "function" && _a || Object, typeof (_b = typeof http_1.HttpClient !== "undefined" && http_1.HttpClient) === "function" && _b || Object])
    ], CoreDataService);
    return CoreDataService;
    var _a, _b;
}());
exports.CoreDataService = CoreDataService;
var CoreData = (function () {
    function CoreData() {
    }
    return CoreData;
}());
exports.CoreData = CoreData;
//# sourceMappingURL=core-data.service.js.map

/***/ }),

/***/ "../../../../../src/app/core/core.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var common_1 = __webpack_require__("../../../common/@angular/common.es5.js");
var module_import_guard_1 = __webpack_require__("../../../../../src/app/core/module-import-guard.ts");
var util_service_1 = __webpack_require__("../../../../../src/app/core/util.service.ts");
var core_data_service_1 = __webpack_require__("../../../../../src/app/core/core-data.service.ts");
var CoreModule = (function () {
    function CoreModule(parentModule) {
        module_import_guard_1.throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
    CoreModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule
            ],
            exports: [],
            declarations: [],
            providers: [
                util_service_1.UtilService,
                core_data_service_1.CoreDataService
            ]
        }),
        __param(0, core_1.Optional()), __param(0, core_1.SkipSelf()),
        __metadata("design:paramtypes", [CoreModule])
    ], CoreModule);
    return CoreModule;
}());
exports.CoreModule = CoreModule;
//# sourceMappingURL=core.module.js.map

/***/ }),

/***/ "../../../../../src/app/core/module-import-guard.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Helper to ensure that the core module is only imported once (to the app.module)
 * and was not loaded before.
 *
 * This is because services might be instanciated a second time if imported to another
 * module later.
 *
 * @param parentModule The instance of a module that was loaded before
 * @param moduleName Name of module to be imported - so it can be shown in error msg
 */
function throwIfAlreadyLoaded(parentModule, moduleName) {
    if (parentModule) {
        throw new Error(moduleName + " has already been loaded. Import Core modules in the AppModule only.");
    }
}
exports.throwIfAlreadyLoaded = throwIfAlreadyLoaded;
//# sourceMappingURL=module-import-guard.js.map

/***/ }),

/***/ "../../../../../src/app/core/util.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var router_1 = __webpack_require__("../../../router/@angular/router.es5.js");
var common_1 = __webpack_require__("../../../common/@angular/common.es5.js");
var simple_entity_model_1 = __webpack_require__("../../../../../src/app/shared/model/simple-entity.model.ts");
var _ = __webpack_require__("../../../../lodash/lodash.js");
/**
 * Service class with small helper methods used in multiple places of the app.
 */
var UtilService = (function () {
    function UtilService(router, location) {
        this.router = router;
        this.location = location;
    }
    UtilService.prototype.goTo = function (route) {
        this.router.navigate([route]);
    };
    UtilService.prototype.historyBack = function () {
        this.location.back();
    };
    UtilService.prototype.ucfirst = function (str) {
        str += '';
        var f = str.charAt(0)
            .toUpperCase();
        return f + str.substr(1);
    };
    // Create display name for entities with potential subentities
    UtilService.prototype.getCombinedDisplayName = function (obj) {
        if (!obj)
            return null;
        if (typeof obj.main_item === 'undefined')
            return obj.name;
        return obj.main_item.name + ' (' + obj.name + ')';
    };
    UtilService.prototype.getFlattenedTwoLevelEntity = function (twoLevelEntity) {
        var arrTemp = this.cloneDeep(twoLevelEntity);
        var result = new simple_entity_model_1.SimpleEntityCollection();
        var flatArr = [];
        if (typeof arrTemp.values !== 'undefined') {
            for (var idxMain = 0; idxMain < arrTemp.values.length; idxMain++) {
                flatArr.push(arrTemp.values[idxMain]);
                if (typeof arrTemp.values[idxMain].sub_items !== 'undefined') {
                    for (var idxSub = 0; idxSub < arrTemp.values[idxMain].sub_items.length; idxSub++) {
                        arrTemp.values[idxMain].sub_items[idxSub].name = arrTemp.values[idxMain].name + ' (' + arrTemp.values[idxMain].sub_items[idxSub].name + ')';
                        flatArr.push(arrTemp.values[idxMain].sub_items[idxSub]);
                    }
                }
            }
        }
        result.display_name = arrTemp.display_name;
        flatArr.sort(function (a, b) { return a.name.localeCompare(b.name); });
        result.values = flatArr;
        return result;
    };
    UtilService.prototype.compareById = function (obj1, obj2) {
        return obj1 && obj2 && (obj1.id === obj2.id);
    };
    UtilService.prototype.cloneDeep = function (obj) {
        return _.cloneDeep(obj);
    };
    UtilService.prototype.isObjectIdInArray = function (targetArray, obj) {
        for (var i = 0; i < targetArray.length; i++) {
            if (targetArray[i].id === obj.id) {
                return true;
            }
        }
        return false;
    };
    UtilService.prototype.addCopyToArray = function (targetArray, obj) {
        if (targetArray && obj) {
            var copyObj = this.cloneDeep(obj);
            targetArray.push(copyObj);
        }
    };
    UtilService.prototype.removeFromArray = function (targetArray, obj) {
        if (targetArray && obj) {
            for (var i = 0; i < targetArray.length; i++) {
                if (targetArray[i].id == obj.id) {
                    var test = targetArray.splice(i, 1);
                    break;
                }
            }
        }
    };
    UtilService.prototype.orderArrayByName = function (simpleEntityArray) {
        if (simpleEntityArray) {
            return simpleEntityArray.sort(function (a, b) { return a.name.localeCompare(b.name); });
        }
        return [];
    };
    UtilService.prototype.orderPrices = function (prices) {
        var _this = this;
        if (!prices) {
            return null;
        }
        return prices.sort(function (a, b) {
            var result = 0;
            var valA = _this.getCombinedDisplayName(a.lng_source);
            var valB = _this.getCombinedDisplayName(b.lng_source);
            if (valA && valB)
                result = valA.localeCompare(valB);
            if (result === 0) {
                valA = _this.getCombinedDisplayName(a.lng_target);
                valB = _this.getCombinedDisplayName(b.lng_target);
                if (valA && valB)
                    result = valA.localeCompare(valB);
            }
            if (result === 0) {
                if (a.service && b.service)
                    result = a.service.name.localeCompare(b.service.name);
            }
            return result;
        });
    };
    UtilService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [typeof (_a = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _a || Object, typeof (_b = typeof common_1.Location !== "undefined" && common_1.Location) === "function" && _b || Object])
    ], UtilService);
    return UtilService;
    var _a, _b;
}());
exports.UtilService = UtilService;
//# sourceMappingURL=util.service.js.map

/***/ }),

/***/ "../../../../../src/app/customer/customer-compact/customer-compact.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid compact-default tile small\">\n  <div class=\"row-xs\">\n    <div class=\"main-item col-sm-12\">\n      <strong>\n        <a class=\"clickable\" (click)=\"editCustomer(customer)\">{{ customer.name1 }}, {{ customer.name2 }}</a>\n      </strong>\n    </div>\n  </div>\n  <div class=\"row-sm\">\n    <div class=\"col-sm-3\">\n      <div class=\"row\">\n        <div class=\"col-xs-12\">\n          {{ customer.address && customer.address.city }} ({{ customer.address && customer.address.country }})\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class=\"col-xs-12\">&nbsp;</div>\n      </div>\n      <div class=\"row\">\n        <label class=\"col-xs-4\">Kd-Nr.:</label>\n        <div class=\"col-xs-8\">{{ customer.customer_no }}</div>\n      </div>\n      <div class=\"row\">\n        <label class=\"col-xs-4\">Herkunft:</label>\n        <div class=\"col-xs-8\">{{ customer.origin && customer.origin.name }}</div>\n      </div>\n      <div class=\"row\">\n        <label class=\"col-xs-4\">Potenzial:</label>\n        <div class=\"col-xs-8\">{{ customer.potential && customer.potential.name }}</div>\n      </div>\n      <div class=\"row\">\n        <label class=\"col-xs-4\">Accountmgr.:</label>\n        <div class=\"col-xs-8\">{{ customer.account_manager && customer.account_manager.username }}</div>\n      </div>\n      <div class=\"row\">\n        <label class=\"col-xs-4\">Status:</label>\n        <div class=\"col-xs-8\">{{ customer.status && customer.status.name }}</div>\n      </div>\n    </div>\n    <div class=\"col-sm-3\">\n      <div class=\"row\">\n        <label class=\"col-xs-4\">E-Mail:</label>\n        <div class=\"col-xs-8\">\n          <a href=\"mailto:{{ customer.email }}\">{{ customer.email }}</a>\n        </div>\n      </div>\n      <div class=\"row\">\n        <label class=\"col-xs-4\">E-Mail2:</label>\n        <div class=\"col-xs-8\">\n          <a href=\"mailto:{{ customer.email2 }}\">{{ customer.email2 }}</a>\n        </div>\n      </div>\n      <div class=\"row\">\n        <label class=\"col-xs-4\">Fon:</label>\n        <div class=\"col-xs-8\">{{ customer.phone }}</div>\n      </div>\n      <div class=\"row\">\n        <label class=\"col-xs-4\">Mobil:</label>\n        <div class=\"col-xs-8\">{{ customer.phone2 }}</div>\n      </div>\n      <div class=\"row\">\n        <label class=\"col-xs-4\">Fax:</label>\n        <div class=\"col-xs-8\">{{ customer.fax }}</div>\n      </div>\n      <div class=\"row\">\n        <label class=\"col-xs-4\">Skype:</label>\n        <div class=\"col-xs-8\">\n          <a [href]=\"'skype:'+customer.skype+'?chat' | safeUrl\">{{ customer.skype }}</a>\n        </div>\n      </div>\n    </div>\n    <div class=\"col-sm-4\">\n      <div>{{ customer.comment }}</div>\n    </div>\n    <div class=\"col-sm-2\">\n      <div class=\"row-sm\" *ngFor=\"let contact of customer.contacts\">\n        <div>\n          <a class=\"clickable\" (click)=\"editcontact(customer.id, contact.id)\">{{ contact.name2 }}, {{ contact.name1 }}</a>\n        </div>\n      </div>\n      <div class=\"row-sm\">\n        <div>\n          <a class=\"clickable text-warning\" (click)=\"editcontact(customer, null)\">Neuer Kontakt</a>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/customer/customer-compact/customer-compact.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/customer/customer-compact/customer-compact.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var customer_model_1 = __webpack_require__("../../../../../src/app/customer/customer.model.ts");
var util_service_1 = __webpack_require__("../../../../../src/app/core/util.service.ts");
var customer_edit_service_1 = __webpack_require__("../../../../../src/app/customer/customer-edit/customer-edit.service.ts");
var CustomerCompactComponent = (function () {
    function CustomerCompactComponent(util, customerEditService) {
        this.util = util;
        this.customerEditService = customerEditService;
    }
    CustomerCompactComponent.prototype.editCustomer = function (customer) {
        // Reload customer or pass empty new customer
        this.customerEditService.editCustomer(customer.id);
    };
    CustomerCompactComponent.prototype.editcontact = function (customer, contact) {
        this.customerEditService.editCustomerContact(customer, contact);
    };
    CustomerCompactComponent.prototype.getCombinedDisplayName = function (entity) {
        return this.util.getCombinedDisplayName(entity);
    };
    CustomerCompactComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.Input('customer'),
        __metadata("design:type", typeof (_a = typeof customer_model_1.Customer !== "undefined" && customer_model_1.Customer) === "function" && _a || Object)
    ], CustomerCompactComponent.prototype, "customer", void 0);
    CustomerCompactComponent = __decorate([
        core_1.Component({
            selector: 'app-customer-compact',
            template: __webpack_require__("../../../../../src/app/customer/customer-compact/customer-compact.component.html"),
            styles: [__webpack_require__("../../../../../src/app/customer/customer-compact/customer-compact.component.scss")]
        }),
        __metadata("design:paramtypes", [typeof (_b = typeof util_service_1.UtilService !== "undefined" && util_service_1.UtilService) === "function" && _b || Object, typeof (_c = typeof customer_edit_service_1.CustomerEditService !== "undefined" && customer_edit_service_1.CustomerEditService) === "function" && _c || Object])
    ], CustomerCompactComponent);
    return CustomerCompactComponent;
    var _a, _b, _c;
}());
exports.CustomerCompactComponent = CustomerCompactComponent;
//# sourceMappingURL=customer-compact.component.js.map

/***/ }),

/***/ "../../../../../src/app/customer/customer-edit-contact/customer-edit-contact.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\n  <h1 *ngIf=\"contact_edit.id\">Kontakt bearbeiten</h1>\n  <h1 *ngIf=\"!contact_edit.id\">Kontakt anlegen</h1>\n  <div class=\"row-md tile\">\n    <div class=\"form-box col-md-4 form-horizontal\">\n      <div class=\"form-input\">\n        <label class=\"control-label col-md-3\">{{ coreData.anrede.display_name }}</label>\n        <div class=\"col-md-9\">\n          <select class=\"form-control\" [(ngModel)]=\"contact_edit.anrede\" [compareWith]='util.compareById' required>\n            <option [value]='undefined' selected>-- Bitte wählen --</option>\n            <option *ngFor=\"let option of coreData.anrede.values\" [ngValue]=\"option\">{{ option.name }}</option>\n          </select>\n        </div>\n      </div>\n      <div class=\"form-input\">\n        <label class=\"control-label col-md-3\">Vorname</label>\n        <div class=\"col-md-9\">\n          <input class=\"form-control\" [(ngModel)]=\"contact_edit.name1\">\n        </div>\n      </div>\n      <div class=\"form-input\">\n        <label class=\"control-label col-md-3\">Nachname</label>\n        <div class=\"col-md-9\">\n          <input class=\"form-control\" [(ngModel)]=\"contact_edit.name2\">\n        </div>\n      </div>\n      <div class=\"form-input\">\n        <label class=\"control-label col-md-3\">Position</label>\n        <div class=\"col-md-9\">\n          <input class=\"form-control\" [(ngModel)]=\"contact_edit.position\">\n        </div>\n      </div>\n      <div class=\"form-input\">\n        <label class=\"control-label col-md-3\">Korr.Spr.</label>\n        <div class=\"col-md-9\">\n          <select class=\"form-control\" [(ngModel)]=\"contact_edit.correspond_language\" [compareWith]='util.compareById'>\n            <option [value]='undefined' selected>-- Bitte wählen --</option>\n            <option *ngFor=\"let option of coreData.languages_flat.values\" [ngValue]=\"option\">{{ option.name }}</option>\n          </select>\n        </div>\n      </div>\n    </div>\n    <div class=\"form-box col-md-4 form-horizontal\">\n      <div class=\"form-input row\">\n        <label class=\"control-label col-md-3\">E-Mail</label>\n        <div class=\"col-md-9\">\n          <input class=\"form-control\" [(ngModel)]=\"contact_edit.email\">\n        </div>\n      </div>\n      <div class=\"form-input row\">\n        <label class=\"control-label col-md-3\">E-Mail2</label>\n        <div class=\"col-md-9\">\n          <input class=\"form-control\" [(ngModel)]=\"contact_edit.email2\">\n        </div>\n      </div>\n      <div class=\"form-input row\">\n        <label class=\"control-label col-md-3\">Telefon</label>\n        <div class=\"col-md-9\">\n          <input class=\"form-control\" [(ngModel)]=\"contact_edit.phone\">\n        </div>\n      </div>\n      <div class=\"form-input row\">\n        <label class=\"control-label col-md-3\">Mobil</label>\n        <div class=\"col-md-9\">\n          <input class=\"form-control\" [(ngModel)]=\"contact_edit.phone2\">\n        </div>\n      </div>\n      <div class=\"form-input row\">\n        <label class=\"control-label col-md-3\">Fax</label>\n        <div class=\"col-md-9\">\n          <input class=\"form-control\" [(ngModel)]=\"contact_edit.fax\">\n        </div>\n      </div>\n      <div class=\"form-input row\">\n        <label class=\"control-label col-md-3\">Skype</label>\n        <div class=\"col-md-9\">\n          <input class=\"form-control\" [(ngModel)]=\"contact_edit.skype\">\n        </div>\n      </div>\n    </div>\n    <div class=\"form-box col-md-4\">\n      <label class=\"control-label col-md-3\">Kommentar</label>\n      <textarea class=\"form-control\" rows=\"8\" [(ngModel)]=\"contact_edit.comment\"></textarea>\n    </div>\n  </div>\n\n  <div class=\"row-md pull-right\">\n    <button class=\"btn btn-primary\" (click)=\"saveCustomerContact()\">Speichern</button>\n    <button class=\"btn btn-danger\" (click)=\"cancelEdit()\">Abbrechen</button>\n    <button class=\"btn btn-default\" (click)=\"deleteCustomerContact()\" ng-disabled=\"contact_edit.id == null\">Löschen\n    </button>\n  </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/customer/customer-edit-contact/customer-edit-contact.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/customer/customer-edit-contact/customer-edit-contact.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var core_data_service_1 = __webpack_require__("../../../../../src/app/core/core-data.service.ts");
var customer_edit_service_1 = __webpack_require__("../../../../../src/app/customer/customer-edit/customer-edit.service.ts");
var util_service_1 = __webpack_require__("../../../../../src/app/core/util.service.ts");
var customer_search_service_1 = __webpack_require__("../../../../../src/app/customer/customer-search/customer-search.service.ts");
var CustomerEditContactComponent = (function () {
    function CustomerEditContactComponent(util, coreDataService, customerEditService, customerSearchService) {
        this.util = util;
        this.coreDataService = coreDataService;
        this.customerEditService = customerEditService;
        this.customerSearchService = customerSearchService;
        this.coreData = new core_data_service_1.CoreData();
    }
    CustomerEditContactComponent.prototype.saveCustomerContact = function () {
        this.customerEditService.saveCustomerContact(this.contact_edit);
        // ToDo: Reload search list or update customer in list
    };
    CustomerEditContactComponent.prototype.deleteCustomerContact = function () {
        this.customerEditService.deleteCustomerContact(this.contact_edit);
        // ToDo: Reload search list or update customer in list
    };
    CustomerEditContactComponent.prototype.cancelEdit = function () {
        // this.customerSearchService.searchCustomers(null);
        this.util.historyBack();
    };
    CustomerEditContactComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.coreDataService.getData().subscribe(function (data) {
            _this.coreData = data;
        });
        this.contact_edit = this.customerEditService.getCustomerContactToEdit();
    };
    CustomerEditContactComponent = __decorate([
        core_1.Component({
            selector: 'app-customer-edit-contact',
            template: __webpack_require__("../../../../../src/app/customer/customer-edit-contact/customer-edit-contact.component.html"),
            styles: [__webpack_require__("../../../../../src/app/customer/customer-edit-contact/customer-edit-contact.component.scss")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof util_service_1.UtilService !== "undefined" && util_service_1.UtilService) === "function" && _a || Object, typeof (_b = typeof core_data_service_1.CoreDataService !== "undefined" && core_data_service_1.CoreDataService) === "function" && _b || Object, typeof (_c = typeof customer_edit_service_1.CustomerEditService !== "undefined" && customer_edit_service_1.CustomerEditService) === "function" && _c || Object, typeof (_d = typeof customer_search_service_1.CustomerSearchService !== "undefined" && customer_search_service_1.CustomerSearchService) === "function" && _d || Object])
    ], CustomerEditContactComponent);
    return CustomerEditContactComponent;
    var _a, _b, _c, _d;
}());
exports.CustomerEditContactComponent = CustomerEditContactComponent;
//# sourceMappingURL=customer-edit-contact.component.js.map

/***/ }),

/***/ "../../../../../src/app/customer/customer-edit/customer-edit.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid form-default\">\n  <h1 *ngIf=\"cust_edit.id\">Kunden bearbeiten</h1>\n  <h1 *ngIf=\"!cust_edit.id\">Kunden anlegen</h1>\n  <div class=\"row tile\">\n    <div class=\"col-sm-4 form-box\">\n      <div class=\"form-input\">\n        <label class=\"control-label col-md-3\">Firma1</label>\n        <div class=\"col-md-9\">\n          <input class=\"form-control\" [(ngModel)]=\"cust_edit.name1\">\n        </div>\n      </div>\n      <div class=\"form-input\">\n        <label class=\"control-label col-md-3\">Firma2</label>\n        <div class=\"col-md-9\">\n          <input class=\"form-control\" [(ngModel)]=\"cust_edit.name2\">\n        </div>\n      </div>\n      <!-- <div class=\"fomr-input\">&nbsp;</div> -->\n      <div class=\"form-input\">\n        <label class=\"control-label col-md-3\">Straße</label>\n        <div class=\"col-md-9\">\n          <input class=\"form-control\" [(ngModel)]=\"cust_edit.address.street\">\n        </div>\n      </div>\n      <div class=\"form-input\">\n        <label class=\"control-label col-md-3\">Straße2</label>\n        <div class=\"col-md-9\">\n          <input class=\"form-control\" [(ngModel)]=\"cust_edit.address.street2\">\n        </div>\n      </div>\n      <div class=\"form-input\">\n        <label class=\"control-label col-md-3\">Postleitzahl</label>\n        <div class=\"col-md-9\">\n          <input class=\"form-control\" [(ngModel)]=\"cust_edit.address.zipcode\">\n        </div>\n      </div>\n      <div class=\"form-input\">\n        <label class=\"control-label col-md-3\">Stadt</label>\n        <div class=\"col-md-9\">\n          <input class=\"form-control\" [(ngModel)]=\"cust_edit.address.city\">\n        </div>\n      </div>\n      <div class=\"form-input\">\n        <label class=\"control-label col-md-3\">{{ coreData.country.display_name }}</label>\n        <div class=\"col-md-9\">\n          <select class=\"form-control\" [(ngModel)]=\"cust_edit.address.country\" [compareWith]='util.compareById'>\n            <option [value]='undefined' selected>-- Bitte wählen --</option>\n            <option *ngFor=\"let option of coreData.country.values\" [ngValue]=\"option\">{{ option.name }}</option>\n          </select>\n        </div>\n      </div>\n    </div>\n    <div class=\"col-sm-4 form-box\">\n      <div class=\"form-input\">\n        <label class=\"control-label col-md-3\">Kundennr.</label>\n        <div class=\"col-md-9\">\n          <input type=\"text\" class=\"form-control\" [(ngModel)]=\"cust_edit.customer_no\">\n        </div>\n      </div>\n      <div class=\"form-input\">\n        <label class=\"control-label col-md-3\">E&#8209;Mail</label>\n        <div class=\"col-md-9\">\n          <input class=\"form-control\" [(ngModel)]=\"cust_edit.email\">\n        </div>\n      </div>\n      <div class=\"form-input\">\n        <label class=\"control-label col-md-3\">E&#8209;Mail2</label>\n        <div class=\"col-md-9\">\n          <input class=\"form-control\" [(ngModel)]=\"cust_edit.email2\">\n        </div>\n      </div>\n      <div class=\"form-input\">\n        <label class=\"control-label col-md-3\">Telefon</label>\n        <div class=\"col-md-9\">\n          <input class=\"form-control\" [(ngModel)]=\"cust_edit.phone\">\n        </div>\n      </div>\n      <div class=\"form-input\">\n        <label class=\"control-label col-md-3\">Mobil</label>\n        <div class=\"col-md-9\">\n          <input class=\"form-control\" [(ngModel)]=\"cust_edit.phone2\">\n        </div>\n      </div>\n      <div class=\"form-input\">\n        <label class=\"control-label col-md-3\">Fax</label>\n        <div class=\"col-md-9\">\n          <input class=\"form-control\" [(ngModel)]=\"cust_edit.fax\">\n        </div>\n      </div>\n      <div class=\"form-input\">\n        <label class=\"control-label col-md-3\">Skype</label>\n        <div class=\"col-md-9\">\n          <input class=\"form-control\" [(ngModel)]=\"cust_edit.skype\">\n        </div>\n      </div>\n    </div>\n    <div class=\"col-sm-4 form-box\">\n      <label class=\"control-label\">Kommentar</label>\n      <textarea class=\"form-control\" rows=\"8\" [(ngModel)]=\"cust_edit.comment\"></textarea>\n    </div>\n  </div>\n  <div class=\"row tile\">\n    <div class=\"col-sm-4 form-box\">\n      <div class=\"form-input\">\n        <label class=\"control-label col-md-3\">{{ coreData.customer_status.display_name }}</label>\n        <div class=\"col-md-9\">\n          <select class=\"form-control\" [(ngModel)]=\"cust_edit.status\" [compareWith]='util.compareById'>\n            <option [value]='undefined' selected>-- Bitte wählen --</option>\n            <option *ngFor=\"let option of coreData.customer_status.values\" [ngValue]=\"option\">{{ option.name }}</option>\n          </select>\n        </div>\n      </div>\n      <div class=\"form-input\">\n        <label class=\"control-label col-md-3\">Accountmgr.</label>\n        <div class=\"col-md-9\">\n          <select class=\"form-control\" [(ngModel)]=\"cust_edit.account_manager\" [compareWith]='util.compareById' ng-options=\"option.username for option in coreData.account_managers.values | orderBy:'username' track by option.id\">\n            <option [value]='undefined' selected>-- Bitte wählen --</option>\n            <option *ngFor=\"let option of coreData.account_managers.values\" [ngValue]=\"option\">{{ option.username }}</option>\n          </select>\n        </div>\n      </div>\n      <div class=\"form-input\">\n        <label class=\"control-label col-md-3\">{{ coreData.customer_potential.display_name }}</label>\n        <div class=\"col-md-9\">\n          <select class=\"form-control\" [(ngModel)]=\"cust_edit.potential\" [compareWith]='util.compareById' ng-options=\"option.name for option in coreData.customer_potential.values track by option.id\">\n            <option [value]='undefined' selected>-- Bitte wählen --</option>\n            <option *ngFor=\"let option of coreData.customer_potential.values\" [ngValue]=\"option\">{{ option.name }}</option>\n          </select>\n        </div>\n      </div>\n      <div class=\"form-input\">\n        <label class=\"control-label col-md-3\">{{ coreData.customer_origin.display_name }}</label>\n        <div class=\"col-md-9\">\n          <select class=\"form-control\" [(ngModel)]=\"cust_edit.origin\" [compareWith]='util.compareById' ng-options=\"option.name for option in coreData.customer_origin.values track by option.id\">\n            <option [value]='undefined' selected>-- Bitte wählen --</option>\n            <option *ngFor=\"let option of coreData.customer_origin.values\" [ngValue]=\"option\">{{ option.name }}</option>\n          </select>\n        </div>\n      </div>\n    </div>\n    <div class=\"col-sm-4 form-box\">\n\n    </div>\n    <div class=\"col-sm-4 form-box\">\n      <label class=\"control-label\">Rechnungsbedingungen</label>\n      <textarea class=\"form-control\" rows=\"5\" [(ngModel)]=\"cust_edit.invoicing_details\"></textarea>\n    </div>\n  </div>\n  <div class=\"row pull-right\">\n    <button class=\"btn btn-primary\" (click)=\"saveCustomer()\">Speichern</button>\n    <button class=\"btn btn-danger\" (click)=\"cancelEdit()\">Abbrechen</button>\n    <button class=\"btn btn-default\" (click)=\"deleteCustomer()\" [disabled]=\"cust_edit.id == null\">\n      Löschen\n    </button>\n  </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/customer/customer-edit/customer-edit.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/customer/customer-edit/customer-edit.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var core_data_service_1 = __webpack_require__("../../../../../src/app/core/core-data.service.ts");
var customer_edit_service_1 = __webpack_require__("../../../../../src/app/customer/customer-edit/customer-edit.service.ts");
var util_service_1 = __webpack_require__("../../../../../src/app/core/util.service.ts");
var customer_search_service_1 = __webpack_require__("../../../../../src/app/customer/customer-search/customer-search.service.ts");
var CustomerEditComponent = (function () {
    function CustomerEditComponent(util, coreDataService, customerEditService, customerSearchService) {
        this.util = util;
        this.coreDataService = coreDataService;
        this.customerEditService = customerEditService;
        this.customerSearchService = customerSearchService;
        this.coreData = new core_data_service_1.CoreData();
    }
    CustomerEditComponent.prototype.saveCustomer = function () {
        this.customerEditService.saveCustomer(this.cust_edit);
        // ToDo: Reload search list or update customer in list
    };
    CustomerEditComponent.prototype.deleteCustomer = function () {
        this.customerEditService.deleteCustomer(this.cust_edit);
        // ToDo: Reload search list or update customer in list
    };
    CustomerEditComponent.prototype.cancelEdit = function () {
        // this.customerSearchService.searchCustomers(null);
        this.util.historyBack();
    };
    CustomerEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.coreDataService.getData().subscribe(function (data) {
            _this.coreData = data;
        });
        this.cust_edit = this.customerEditService.getCustomerToEdit();
    };
    CustomerEditComponent = __decorate([
        core_1.Component({
            selector: 'app-customer-edit',
            template: __webpack_require__("../../../../../src/app/customer/customer-edit/customer-edit.component.html"),
            styles: [__webpack_require__("../../../../../src/app/customer/customer-edit/customer-edit.component.scss")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof util_service_1.UtilService !== "undefined" && util_service_1.UtilService) === "function" && _a || Object, typeof (_b = typeof core_data_service_1.CoreDataService !== "undefined" && core_data_service_1.CoreDataService) === "function" && _b || Object, typeof (_c = typeof customer_edit_service_1.CustomerEditService !== "undefined" && customer_edit_service_1.CustomerEditService) === "function" && _c || Object, typeof (_d = typeof customer_search_service_1.CustomerSearchService !== "undefined" && customer_search_service_1.CustomerSearchService) === "function" && _d || Object])
    ], CustomerEditComponent);
    return CustomerEditComponent;
    var _a, _b, _c, _d;
}());
exports.CustomerEditComponent = CustomerEditComponent;
//# sourceMappingURL=customer-edit.component.js.map

/***/ }),

/***/ "../../../../../src/app/customer/customer-edit/customer-edit.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var customer_model_1 = __webpack_require__("../../../../../src/app/customer/customer.model.ts");
var util_service_1 = __webpack_require__("../../../../../src/app/core/util.service.ts");
var http_1 = __webpack_require__("../../../common/@angular/common/http.es5.js");
var customer_search_service_1 = __webpack_require__("../../../../../src/app/customer/customer-search/customer-search.service.ts");
var CustomerEditService = (function () {
    function CustomerEditService(util, http, customerSearchService) {
        this.util = util;
        this.http = http;
        this.customerSearchService = customerSearchService;
        this.customerToEdit = new customer_model_1.Customer();
        this.customerContactToEdit = new customer_model_1.CustomerContact();
        this.customerContactToEdit_CustomerId = null;
    }
    CustomerEditService.prototype.getCustomerToEdit = function () {
        return this.customerToEdit;
    };
    /**
     * Save changes on server
     *
     * @param customerToSave Data for the customer to be updated
     */
    CustomerEditService.prototype.saveCustomer = function (customerToSave) {
        var _this = this;
        this.customerToEdit = customerToSave;
        // Kopie des Customers erstellen, um Datum in yyyy-mm-dd String zu wandeln, falls vorhanden
        var fl_save = this.util.cloneDeep(this.customerToEdit);
        // Set up post request
        var req = this.http.post('/customer/editCustomer', fl_save);
        // Execute post request and subscribe to response
        req.subscribe(function (data) {
            _this.customerToEdit = data;
            _this.customerSearchService.searchCustomers(null);
            _this.util.historyBack();
        }, function (error) {
            alert("Fehler beim Speichern:" + error.message);
        });
        return;
    };
    CustomerEditService.prototype.deleteCustomer = function (customerToDelete) {
        var _this = this;
        if (!confirm('Customer ' + customerToDelete.name2 + ', ' + customerToDelete.name1 + ' wirklich löschen?!')) {
            return;
        }
        // Set up post request
        var req = this.http.post('/customer/deleteCustomer', customerToDelete.id);
        // Execute post request and subscribe to response
        req.subscribe(function (data) {
            _this.customerSearchService.searchCustomers(null);
            _this.util.historyBack();
        }, function (error) {
            alert("Fehler beim Löschen:" + error.message);
        });
        return;
    };
    /**
     * Loads customer by id and switches to edit view if found
     *
     * @param id Id of the customer to be edited
     */
    CustomerEditService.prototype.getCustomerByIdAndEdit = function (id) {
        var _this = this;
        // Set up post request
        var req = this.http.get('/customer/' + id);
        // Execute post request and subscribe to response
        req.subscribe(function (data) {
            _this.customerToEdit = data;
            console.log(data);
            _this.util.goTo('/customer/edit');
        }, function (error) {
            alert(error.message);
        });
        return;
    };
    CustomerEditService.prototype.editCustomer = function (id) {
        this.customerToEdit = new customer_model_1.Customer();
        if (id && id > 0) {
            // Reload customer before editing
            this.getCustomerByIdAndEdit(id);
        }
        else {
            this.util.goTo('/customer/edit');
        }
    };
    // --------- CustomerContact -------------
    CustomerEditService.prototype.getCustomerContactToEdit = function () {
        return this.customerContactToEdit;
    };
    CustomerEditService.prototype.getCustomerContactByIdAndEdit = function (id) {
        var _this = this;
        // Set up post request
        var req = this.http.get('/customer_contact/' + id);
        // Execute post request and subscribe to response
        req.subscribe(function (data) {
            _this.customerContactToEdit = data;
            console.log(data);
            _this.util.goTo('/customer/edit_contact');
        }, function (error) {
            alert(error.message);
        });
        return;
    };
    CustomerEditService.prototype.editCustomerContact = function (customerId, contactId) {
        if (!(customerId > 0)) {
            alert('Fehler: Es wurde keine Kundenid übergeben - bitte Info an Thomas!');
            return;
        }
        this.customerContactToEdit = new customer_model_1.CustomerContact();
        this.customerContactToEdit_CustomerId = customerId;
        if (contactId && contactId > 0) {
            // Reload customer before editing
            this.getCustomerContactByIdAndEdit(contactId);
        }
        else {
            this.util.goTo('/customer/edit');
        }
    };
    /**
     * Save changes on server
     *
     * @param customerContactToSave Data for the customerContact to be updated
     */
    CustomerEditService.prototype.saveCustomerContact = function (customerContactToSave) {
        var _this = this;
        this.customerContactToEdit = customerContactToSave;
        // Kopie des CustomerContacts erstellen, um Datum in yyyy-mm-dd String zu wandeln, falls vorhanden
        var cust_save = this.util.cloneDeep(this.customerContactToEdit);
        cust_save.customer_id = this.customerContactToEdit_CustomerId;
        // Set up post request
        var req = this.http.post('/customer/editCustomerContact', cust_save);
        // Execute post request and subscribe to response
        req.subscribe(function (data) {
            _this.customerContactToEdit = data;
            _this.customerSearchService.searchCustomers(null);
            _this.util.historyBack();
        }, function (error) {
            alert("Fehler beim Speichern:" + error.message);
        });
        return;
    };
    CustomerEditService.prototype.deleteCustomerContact = function (customerContactToDelete) {
        var _this = this;
        if (!confirm('Kundenkontakt ' + customerContactToDelete.name2 + ', ' + customerContactToDelete.name1 + ' wirklich löschen?!')) {
            return;
        }
        // Set up post request
        var req = this.http.post('/customer/deleteContact', customerContactToDelete.id);
        // Execute post request and subscribe to response
        req.subscribe(function (data) {
            _this.customerSearchService.searchCustomers(null);
            _this.util.historyBack();
        }, function (error) {
            alert("Fehler beim Löschen:" + error.message);
        });
        return;
    };
    CustomerEditService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [typeof (_a = typeof util_service_1.UtilService !== "undefined" && util_service_1.UtilService) === "function" && _a || Object, typeof (_b = typeof http_1.HttpClient !== "undefined" && http_1.HttpClient) === "function" && _b || Object, typeof (_c = typeof customer_search_service_1.CustomerSearchService !== "undefined" && customer_search_service_1.CustomerSearchService) === "function" && _c || Object])
    ], CustomerEditService);
    return CustomerEditService;
    var _a, _b, _c;
}());
exports.CustomerEditService = CustomerEditService;
//# sourceMappingURL=customer-edit.service.js.map

/***/ }),

/***/ "../../../../../src/app/customer/customer-routing.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var router_1 = __webpack_require__("../../../router/@angular/router.es5.js");
var auth_guard_service_1 = __webpack_require__("../../../../../src/app/user/auth-guard.service.ts");
var customer_search_component_1 = __webpack_require__("../../../../../src/app/customer/customer-search/customer-search.component.ts");
var customer_edit_component_1 = __webpack_require__("../../../../../src/app/customer/customer-edit/customer-edit.component.ts");
var customer_edit_contact_component_1 = __webpack_require__("../../../../../src/app/customer/customer-edit-contact/customer-edit-contact.component.ts");
/**
 * Routes used in the app
 */
var ROUTE_CONFIG = [
    {
        path: 'customer',
        component: customer_search_component_1.CustomerSearchComponent,
        canActivate: [auth_guard_service_1.AuthGuardService]
    },
    {
        path: 'customer/edit',
        component: customer_edit_component_1.CustomerEditComponent,
        canActivate: [auth_guard_service_1.AuthGuardService]
    },
    {
        path: 'customer/edit_contact',
        component: customer_edit_contact_component_1.CustomerEditContactComponent,
        canActivate: [auth_guard_service_1.AuthGuardService]
    }
];
var CustomerRoutingModule = (function () {
    function CustomerRoutingModule() {
    }
    CustomerRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forChild(ROUTE_CONFIG)
            ],
            exports: [router_1.RouterModule]
        })
    ], CustomerRoutingModule);
    return CustomerRoutingModule;
}());
exports.CustomerRoutingModule = CustomerRoutingModule;
//# sourceMappingURL=customer-routing.module.js.map

/***/ }),

/***/ "../../../../../src/app/customer/customer-search/customer-search-params.model.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Object to hold all information the application can know about a freelancer.
 */
var CustomerSearchParams = (function () {
    function CustomerSearchParams() {
        this.page = 1;
    }
    return CustomerSearchParams;
}());
exports.CustomerSearchParams = CustomerSearchParams;
//# sourceMappingURL=customer-search-params.model.js.map

/***/ }),

/***/ "../../../../../src/app/customer/customer-search/customer-search.component.html":
/***/ (function(module, exports) {

module.exports = "<div>\n  <h1>Kunden</h1>\n  <div class=\"form-default col-sm-12\" (keydown.enter)=\"searchParams.page=1;searchCustomers(searchParams)\">\n    <div class=\"row\">\n      <form class=\"form-box col-md-5 form-horizontal\">\n        <div class=\"form-input\">\n          <label class=\"control-label col-md-3\">Name</label>\n          <div class=\"col-md-9\">\n            <input id=\"search-name\" name=\"search-name\" class=\"form-control\" [(ngModel)]=\"searchParams.name\" />\n          </div>\n        </div>\n        <div class=\"form-input\">\n          <label class=\"control-label col-md-3\">Ansprechp.</label>\n          <div class=\"col-md-9\">\n            <input id=\"search-asp_name\" name=\"search-asp_name\" class=\"form-control\" [(ngModel)]=\"searchParams.asp_name\" />\n          </div>\n        </div>\n      </form>\n      <form class=\"form-box col-md-5 form-horizontal\">\n        <div class=\"form-input\">\n          <label class=\"control-label col-md-3\">Herkunft</label>\n          <div class=\"col-md-9\">\n            <select class=\"form-control\" name=\"search-akquise\" [(ngModel)]=\"searchParams.akquise\" [compareWith]='util.compareById'>\n              <option [value]='undefined' selected>-- Bitte wählen --</option>\n              <option *ngFor=\"let option of coreData.customer_origin.values\" [ngValue]=\"option\">{{ option.name }}</option>\n            </select>\n          </div>\n        </div>\n        <div class=\"form-input\">\n          <label class=\"control-label col-md-3\">AM</label>\n          <div class=\"col-md-9\">\n            <select class=\"form-control\" name=\"search-account_manager\" [(ngModel)]=\"searchParams.account_manager\" [compareWith]='util.compareById'>\n              <option [value]='undefined' selected>-- Bitte wählen --</option>\n              <option *ngFor=\"let option of coreData.account_managers.values\" [ngValue]=\"option\">{{ option.username }}</option>\n            </select>\n          </div>\n        </div>\n        <div class=\"form-input\">\n          <label class=\"control-label col-md-3\">Potenzial</label>\n          <div class=\"col-md-9\">\n            <select class=\"form-control\" name=\"search-potential\" [(ngModel)]=\"searchParams.potential\" [compareWith]='util.compareById'>\n              <option [value]='undefined' selected>-- Bitte wählen --</option>\n              <option *ngFor=\"let option of coreData.customer_potential.values\" [ngValue]=\"option\">{{ option.name }}</option>\n            </select>\n          </div>\n        </div>\n        <div class=\"form-input\">\n          <label class=\"control-label col-md-3\">Status</label>\n          <div class=\"col-md-9\">\n            <select class=\"form-control\" name=\"search-status\" [(ngModel)]=\"searchParams.status\" [compareWith]='util.compareById'>\n              <option [value]='undefined' selected>-- Bitte wählen --</option>\n              <option *ngFor=\"let option of coreData.customer_status.values\" [ngValue]=\"option\">{{ option.name }}</option>\n            </select>\n          </div>\n        </div>\n      </form>\n      <div class=\"button-area col-md-2 form-horizontal\">\n        <button class=\"btn btn-block btn-primary\" (click)=\"searchParams.page=1;searchCustomers(searchParams)\">Suchen</button>\n        <button class=\"btn btn-block btn-default\" (click)=\"editCustomer(null)\">Neuer Kunde</button>\n      </div>\n    </div>\n  </div>\n  <h2>Suchergebnisse: {{ customersLoaded.itemsTotal }}\n    <span *ngIf=\"customersLoaded.pageMax > 1\">(Seite {{ customersLoaded.page }} von {{ customersLoaded.pageMax }})\n    </span>\n  </h2>\n  <div *ngFor=\"let customer of customersLoaded.items\">\n    <app-customer-compact [customer]=\"customer\">\n    </app-customer-compact>\n  </div>\n\n  <ngb-pagination [collectionSize]=\"customersLoaded.itemsTotal\" [(page)]=\"searchParams.page\" [pageSize]=\"20\" [maxSize]=\"10\"\n    class=\"pagination-sm\" [rotate]=\"true\" [boundaryLinks]=\"true\" [ellipses]=\"true\" (pageChange)=\"searchCustomers(searchParams)\">\n  </ngb-pagination>\n</div>"

/***/ }),

/***/ "../../../../../src/app/customer/customer-search/customer-search.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/customer/customer-search/customer-search.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var customers_loaded_model_1 = __webpack_require__("../../../../../src/app/customer/customer-search/customers-loaded.model.ts");
var customer_search_params_model_1 = __webpack_require__("../../../../../src/app/customer/customer-search/customer-search-params.model.ts");
var customer_search_service_1 = __webpack_require__("../../../../../src/app/customer/customer-search/customer-search.service.ts");
var customer_edit_service_1 = __webpack_require__("../../../../../src/app/customer/customer-edit/customer-edit.service.ts");
var core_data_service_1 = __webpack_require__("../../../../../src/app/core/core-data.service.ts");
var util_service_1 = __webpack_require__("../../../../../src/app/core/util.service.ts");
var CustomerSearchComponent = (function () {
    function CustomerSearchComponent(util, coreDataService, customerSearchService, customerEditService) {
        this.util = util;
        this.coreDataService = coreDataService;
        this.customerSearchService = customerSearchService;
        this.customerEditService = customerEditService;
        this.customersLoaded = new customers_loaded_model_1.CustomersLoaded();
        this.searchParams = new customer_search_params_model_1.CustomerSearchParams();
        this.coreData = new core_data_service_1.CoreData();
    }
    CustomerSearchComponent.prototype.searchCustomers = function (searchParams) {
        console.log(searchParams);
        this.customerSearchService.searchCustomers(searchParams);
    };
    CustomerSearchComponent.prototype.editCustomer = function (customerToEdit) {
        this.customerEditService.editCustomer(customerToEdit && customerToEdit.id);
    };
    CustomerSearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.searchParams = this.customerSearchService.getLastSearchParams();
        this.customerSearchService.getCustomersLoaded().subscribe(function (customersLoaded) {
            _this.customersLoaded = customersLoaded;
        });
        this.coreDataService.getData().subscribe(function (data) {
            _this.coreData = data;
        });
    };
    CustomerSearchComponent = __decorate([
        core_1.Component({
            selector: 'app-customer-search',
            template: __webpack_require__("../../../../../src/app/customer/customer-search/customer-search.component.html"),
            styles: [__webpack_require__("../../../../../src/app/customer/customer-search/customer-search.component.scss")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof util_service_1.UtilService !== "undefined" && util_service_1.UtilService) === "function" && _a || Object, typeof (_b = typeof core_data_service_1.CoreDataService !== "undefined" && core_data_service_1.CoreDataService) === "function" && _b || Object, typeof (_c = typeof customer_search_service_1.CustomerSearchService !== "undefined" && customer_search_service_1.CustomerSearchService) === "function" && _c || Object, typeof (_d = typeof customer_edit_service_1.CustomerEditService !== "undefined" && customer_edit_service_1.CustomerEditService) === "function" && _d || Object])
    ], CustomerSearchComponent);
    return CustomerSearchComponent;
    var _a, _b, _c, _d;
}());
exports.CustomerSearchComponent = CustomerSearchComponent;
//# sourceMappingURL=customer-search.component.js.map

/***/ }),

/***/ "../../../../../src/app/customer/customer-search/customer-search.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var rxjs_1 = __webpack_require__("../../../../rxjs/Rx.js");
var http_1 = __webpack_require__("../../../common/@angular/common/http.es5.js");
var customer_search_params_model_1 = __webpack_require__("../../../../../src/app/customer/customer-search/customer-search-params.model.ts");
var util_service_1 = __webpack_require__("../../../../../src/app/core/util.service.ts");
var customers_loaded_model_1 = __webpack_require__("../../../../../src/app/customer/customer-search/customers-loaded.model.ts");
var CustomerSearchService = (function () {
    function CustomerSearchService(http, util) {
        this.http = http;
        this.util = util;
        this.lastSearchParams = new customer_search_params_model_1.CustomerSearchParams();
        this.$customersLoaded = new rxjs_1.BehaviorSubject(new customers_loaded_model_1.CustomersLoaded);
    }
    CustomerSearchService.prototype.getCustomersLoaded = function () {
        return this.$customersLoaded.asObservable();
    };
    CustomerSearchService.prototype.getLastSearchParams = function () {
        return this.lastSearchParams;
    };
    CustomerSearchService.prototype.searchCustomers = function (searchParams) {
        var _this = this;
        if (searchParams) {
            this.lastSearchParams = searchParams;
        }
        // Set up post request
        var req = this.http.post('/customer/searchCustomers', searchParams || this.lastSearchParams);
        // Execute post request and subscribe to response
        req.subscribe(function (data) {
            console.log(data);
            // Prepare data fetched from server
            _this.$customersLoaded.next(data);
        }, function (error) {
            // ToDo: Implement error handler
        });
        return;
    };
    CustomerSearchService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [typeof (_a = typeof http_1.HttpClient !== "undefined" && http_1.HttpClient) === "function" && _a || Object, typeof (_b = typeof util_service_1.UtilService !== "undefined" && util_service_1.UtilService) === "function" && _b || Object])
    ], CustomerSearchService);
    return CustomerSearchService;
    var _a, _b;
}());
exports.CustomerSearchService = CustomerSearchService;
//# sourceMappingURL=customer-search.service.js.map

/***/ }),

/***/ "../../../../../src/app/customer/customer-search/customers-loaded.model.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var CustomersLoaded = (function () {
    function CustomersLoaded() {
        this.items = [];
        this.itemsTotal = 0;
        this.itemsPerPage = 0;
        this.page = 1;
        this.pageMax = 0;
    }
    return CustomersLoaded;
}());
exports.CustomersLoaded = CustomersLoaded;
//# sourceMappingURL=customers-loaded.model.js.map

/***/ }),

/***/ "../../../../../src/app/customer/customer.model.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var address_model_1 = __webpack_require__("../../../../../src/app/shared/model/address.model.ts");
var person_model_1 = __webpack_require__("../../../../../src/app/shared/model/person.model.ts");
var simple_entity_model_1 = __webpack_require__("../../../../../src/app/shared/model/simple-entity.model.ts");
var contact_model_1 = __webpack_require__("../../../../../src/app/shared/model/contact.model.ts");
/**
 * Object to hold all information the application can know about a freelancer.
 */
var Customer = (function (_super) {
    __extends(Customer, _super);
    function Customer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.customer_no = null;
        _this.address = new address_model_1.Address();
        _this.origin = null;
        _this.potential = null;
        _this.account_manager = null;
        _this.status = null;
        _this.invoicing_details = null;
        return _this;
    }
    return Customer;
}(contact_model_1.Contact));
exports.Customer = Customer;
var CustomerOrigin = (function (_super) {
    __extends(CustomerOrigin, _super);
    function CustomerOrigin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return CustomerOrigin;
}(simple_entity_model_1.SimpleEntity));
exports.CustomerOrigin = CustomerOrigin;
var CustomerPotential = (function (_super) {
    __extends(CustomerPotential, _super);
    function CustomerPotential() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return CustomerPotential;
}(simple_entity_model_1.SimpleEntity));
exports.CustomerPotential = CustomerPotential;
var CustomerStatus = (function (_super) {
    __extends(CustomerStatus, _super);
    function CustomerStatus() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return CustomerStatus;
}(simple_entity_model_1.SimpleEntity));
exports.CustomerStatus = CustomerStatus;
var CustomerContact = (function (_super) {
    __extends(CustomerContact, _super);
    function CustomerContact() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return CustomerContact;
}(person_model_1.Person));
exports.CustomerContact = CustomerContact;
//# sourceMappingURL=customer.model.js.map

/***/ }),

/***/ "../../../../../src/app/customer/customer.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var ng_bootstrap_1 = __webpack_require__("../../../../@ng-bootstrap/ng-bootstrap/index.js");
var shared_module_1 = __webpack_require__("../../../../../src/app/shared/shared.module.ts");
var customer_routing_module_1 = __webpack_require__("../../../../../src/app/customer/customer-routing.module.ts");
var customer_search_service_1 = __webpack_require__("../../../../../src/app/customer/customer-search/customer-search.service.ts");
var customer_edit_service_1 = __webpack_require__("../../../../../src/app/customer/customer-edit/customer-edit.service.ts");
var customer_search_component_1 = __webpack_require__("../../../../../src/app/customer/customer-search/customer-search.component.ts");
var customer_edit_component_1 = __webpack_require__("../../../../../src/app/customer/customer-edit/customer-edit.component.ts");
var customer_compact_component_1 = __webpack_require__("../../../../../src/app/customer/customer-compact/customer-compact.component.ts");
var customer_edit_contact_component_1 = __webpack_require__("../../../../../src/app/customer/customer-edit-contact/customer-edit-contact.component.ts");
var CustomerModule = (function () {
    function CustomerModule() {
    }
    CustomerModule = __decorate([
        core_1.NgModule({
            imports: [
                ng_bootstrap_1.NgbModule,
                shared_module_1.SharedModule,
                customer_routing_module_1.CustomerRoutingModule
            ],
            declarations: [
                customer_compact_component_1.CustomerCompactComponent,
                customer_edit_component_1.CustomerEditComponent,
                customer_search_component_1.CustomerSearchComponent,
                customer_edit_contact_component_1.CustomerEditContactComponent
            ],
            exports: [
                customer_compact_component_1.CustomerCompactComponent,
                customer_edit_component_1.CustomerEditComponent,
                customer_search_component_1.CustomerSearchComponent,
                customer_edit_contact_component_1.CustomerEditContactComponent
            ],
            providers: [
                customer_edit_service_1.CustomerEditService,
                customer_search_service_1.CustomerSearchService
            ]
        })
    ], CustomerModule);
    return CustomerModule;
}());
exports.CustomerModule = CustomerModule;
//# sourceMappingURL=customer.module.js.map

/***/ }),

/***/ "../../../../../src/app/freelancer/freelancer-compact/freelancer-compact.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid compact-default tile small\">\n  <div class=\"row-xs\">\n    <div class=\"main-item col-sm-12\">\n      <strong>\n        <a class=\"clickable\" (click)=\"editFreelancer(freelancer.id)\">{{ freelancer.name2 }}, {{ freelancer.name1 }}\n          <span *ngIf=\"freelancer.company_name && freelancer.company_name.length > 0\">\n            &nbsp;({{ freelancer.company_name }})\n          </span>\n        </a>\n      </strong>\n    </div>\n\n  </div>\n  <div class=\"row-sm\">\n    <div class=\"col-sm-2\">\n      <div class=\"row\">\n        <div class=\"col-xs-12\">\n          {{ freelancer.address && freelancer.address.city }} ({{ freelancer.address && freelancer.address.country && freelancer.address.country.name\n          }})\n        </div>\n      </div>\n      <div>&nbsp;</div>\n      <div class=\"row\">\n        <label class=\"col-xs-5\">Rating:</label>\n        <div class=\"col-xs-7\">{{ freelancer.fl_rating && freelancer.fl_rating.name }}</div>\n      </div>\n      <div class=\"row\">\n        <label class=\"col-xs-5\">Status:</label>\n        <div class=\"col-xs-7\">{{ freelancer.fl_status && freelancer.fl_status.name }}</div>\n      </div>\n      <div class=\"row\">\n        <label class=\"col-xs-5\">NDA:</label>\n        <div class=\"col-xs-7\">{{ freelancer.nda && freelancer.nda.name }}</div>\n      </div>\n      <div class=\"row\">\n        <label class=\"col-xs-5\">Vereidigt:</label>\n        <div class=\"col-xs-7\">{{ freelancer.sworn }}</div>\n      </div>\n    </div>\n    <div class=\"col-sm-3\">\n      <div class=\"row\">\n        <label class=\"col-xs-3\">E-Mail:</label>\n        <div class=\"col-xs-9\">\n          <a href=\"mailto:{{ freelancer.email }}\">{{ freelancer.email }}</a>\n        </div>\n      </div>\n      <div class=\"row\">\n        <label class=\"col-xs-3\">E-Mail2:</label>\n        <div class=\"col-xs-9\">\n          <a href=\"mailto:{{ freelancer.email2 }}\">{{ freelancer.email2 }}</a>\n        </div>\n      </div>\n      <div class=\"row\">\n        <label class=\"col-xs-3\">Fon:</label>\n        <div class=\"col-xs-9\">{{ freelancer.phone }}</div>\n      </div>\n      <div class=\"row\">\n        <label class=\"col-xs-3\">Mobil:</label>\n        <div class=\"col-xs-9\">{{ freelancer.phone2 }}</div>\n      </div>\n      <div class=\"row\">\n        <label class=\"col-xs-3\">Fax:</label>\n        <div class=\"col-xs-9\">{{ freelancer.fax }}</div>\n      </div>\n      <div class=\"row\">\n        <label class=\"col-xs-3\">Skype:</label>\n        <div class=\"col-xs-9\">\n          <a [href]=\"'skype:'+freelancer.skype+'?chat' | safeUrl\">{{ freelancer.skype }}</a>\n        </div>\n      </div>\n    </div>\n    <div class=\"col-sm-7\">\n      <div class=\"row\">\n        <div class=\"col-xs-12\">\n          <div class=\"row\" *ngFor=\"let price of freelancer.prices\">\n            <div class=\"col-xs-3\">{{ getCombinedDisplayName(price.lng_source) }}</div>\n            <div class=\"col-xs-1\">\n              <span class=\"glyphicon glyphicon-arrow-right iconsmall\"></span>\n            </div>\n            <div class=\"col-xs-3\">{{ getCombinedDisplayName(price.lng_target) }}</div>\n            <div class=\"col-xs-3\">{{ price.service && price.service.name }} pro {{ price.price_unit && price.price_unit.name }}</div>\n            <div class=\"col-xs-2\">{{ price.price_per_unit | currency:(price.currency && price.currency.name):3 }}</div>\n          </div>\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class=\"col-xs-12\">\n          <div>{{ freelancer.comment }}</div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/freelancer/freelancer-compact/freelancer-compact.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/freelancer/freelancer-compact/freelancer-compact.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var freelancer_model_1 = __webpack_require__("../../../../../src/app/freelancer/freelancer.model.ts");
var util_service_1 = __webpack_require__("../../../../../src/app/core/util.service.ts");
var freelancer_edit_service_1 = __webpack_require__("../../../../../src/app/freelancer/freelancer-edit/freelancer-edit.service.ts");
var FreelancerCompactComponent = (function () {
    function FreelancerCompactComponent(util, freelancerEditService) {
        this.util = util;
        this.freelancerEditService = freelancerEditService;
    }
    FreelancerCompactComponent.prototype.editFreelancer = function (freelancerId) {
        // Reload freelancer or pass empty new freelancer
        this.freelancerEditService.editFreelancer(freelancerId);
    };
    FreelancerCompactComponent.prototype.getCombinedDisplayName = function (entity) {
        return this.util.getCombinedDisplayName(entity);
    };
    FreelancerCompactComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.Input('fl'),
        __metadata("design:type", typeof (_a = typeof freelancer_model_1.Freelancer !== "undefined" && freelancer_model_1.Freelancer) === "function" && _a || Object)
    ], FreelancerCompactComponent.prototype, "freelancer", void 0);
    FreelancerCompactComponent = __decorate([
        core_1.Component({
            selector: 'app-freelancer-compact',
            template: __webpack_require__("../../../../../src/app/freelancer/freelancer-compact/freelancer-compact.component.html"),
            styles: [__webpack_require__("../../../../../src/app/freelancer/freelancer-compact/freelancer-compact.component.scss")]
        }),
        __metadata("design:paramtypes", [typeof (_b = typeof util_service_1.UtilService !== "undefined" && util_service_1.UtilService) === "function" && _b || Object, typeof (_c = typeof freelancer_edit_service_1.FreelancerEditService !== "undefined" && freelancer_edit_service_1.FreelancerEditService) === "function" && _c || Object])
    ], FreelancerCompactComponent);
    return FreelancerCompactComponent;
    var _a, _b, _c;
}());
exports.FreelancerCompactComponent = FreelancerCompactComponent;
//# sourceMappingURL=freelancer-compact.component.js.map

/***/ }),

/***/ "../../../../../src/app/freelancer/freelancer-edit/freelancer-edit.component.html":
/***/ (function(module, exports) {

module.exports = "<div>\n  <h1 *ngIf=\"fl_edit.id\">Lieferanten bearbeiten</h1>\n  <h1 *ngIf=\"!fl_edit.id\">Lieferanten anlegen</h1>\n  <div class=\"container-fluid form-default\">\n    <div class=\"row tile\">\n      <div class=\"col-sm-4 form-box\">\n        <div class=\"form-input\" layout=\"row\">\n          <label class=\"control-label col-md-3\">{{ coreData.anrede.display_name }}</label>\n          <div class=\"col-md-9\">\n            <select class=\"form-control\" name=\"edit-anrede\" [(ngModel)]=\"fl_edit.anrede\" [compareWith]='util.compareById' required>\n              <option [value]='undefined' selected>-- Bitte wählen --</option>\n              <option *ngFor=\"let option of coreData.anrede.values\" [ngValue]=\"option\">{{ option.name }}</option>\n            </select>\n          </div>\n        </div>\n        <div class=\"form-input\">\n          <label class=\"control-label col-md-3\">Vorname</label>\n          <div class=\"col-md-9\">\n            <input class=\"form-control\" [(ngModel)]=\"fl_edit.name1\">\n          </div>\n        </div>\n        <div class=\"form-input\">\n          <label class=\"control-label col-md-3\">Nachname</label>\n          <div class=\"col-md-9\">\n            <input class=\"form-control\" [(ngModel)]=\"fl_edit.name2\">\n          </div>\n        </div>\n        <div class=\"form-input\">\n          <label class=\"control-label col-md-3\">Firma</label>\n          <div class=\"col-md-9\">\n            <input class=\"form-control\" [(ngModel)]=\"fl_edit.company_name\">\n          </div>\n        </div>\n        <!-- <div class=\"fomr-input\">&nbsp;</div> -->\n        <div class=\"form-input\">\n          <label class=\"control-label col-md-3\">Straße</label>\n          <div class=\"col-md-9\">\n            <input class=\"form-control\" [(ngModel)]=\"fl_edit.address.street\">\n          </div>\n        </div>\n        <div class=\"form-input\">\n          <label class=\"control-label col-md-3\">Straße2</label>\n          <div class=\"col-md-9\">\n            <input class=\"form-control\" [(ngModel)]=\"fl_edit.address.street2\">\n          </div>\n        </div>\n        <div class=\"form-input\">\n          <label class=\"control-label col-md-3\">Postleitzahl</label>\n          <div class=\"col-md-9\">\n            <input class=\"form-control\" [(ngModel)]=\"fl_edit.address.zipcode\">\n          </div>\n        </div>\n        <div class=\"form-input\">\n          <label class=\"control-label col-md-3\">Stadt</label>\n          <div class=\"col-md-9\">\n            <input class=\"form-control\" [(ngModel)]=\"fl_edit.address.city\">\n          </div>\n        </div>\n        <div class=\"form-input\">\n          <label class=\"control-label col-md-3\">{{ coreData.country.display_name }}</label>\n          <div class=\"col-md-9\">\n            <select class=\"form-control\" [(ngModel)]=\"fl_edit.address.country\" [compareWith]='util.compareById'>\n              <option [value]='undefined' selected>-- Bitte wählen --</option>\n              <option *ngFor=\"let option of coreData.country.values\" [ngValue]=\"option\">{{ option.name }}</option>\n            </select>\n          </div>\n        </div>\n      </div>\n      <div class=\"col-sm-4 form-box\">\n        <div class=\"form-input\">\n          <label class=\"control-label col-md-3\">Lieferantennr.</label>\n          <div class=\"col-md-9\">\n            <input class=\"form-control\" [(ngModel)]=\"fl_edit.supplier_no\">\n          </div>\n        </div>\n        <div class=\"form-input\">\n          <label class=\"control-label col-md-3\">E&#8209;Mail</label>\n          <div class=\"col-md-9\">\n            <input class=\"form-control\" [(ngModel)]=\"fl_edit.email\">\n          </div>\n        </div>\n        <div class=\"form-input\">\n          <label class=\"control-label col-md-3\">E&#8209;Mail2</label>\n          <div class=\"col-md-9\">\n            <input class=\"form-control\" [(ngModel)]=\"fl_edit.email2\">\n          </div>\n        </div>\n        <div class=\"form-input\">\n          <label class=\"control-label col-md-3\">Telefon</label>\n          <div class=\"col-md-9\">\n            <input class=\"form-control\" [(ngModel)]=\"fl_edit.phone\">\n          </div>\n        </div>\n        <div class=\"form-input\">\n          <label class=\"control-label col-md-3\">Mobil</label>\n          <div class=\"col-md-9\">\n            <input class=\"form-control\" [(ngModel)]=\"fl_edit.phone2\">\n          </div>\n        </div>\n        <div class=\"form-input\">\n          <label class=\"control-label col-md-3\">Fax</label>\n          <div class=\"col-md-9\">\n            <input class=\"form-control\" [(ngModel)]=\"fl_edit.fax\">\n          </div>\n        </div>\n        <div class=\"form-input\">\n          <label class=\"control-label col-md-3\">Skype</label>\n          <div class=\"col-md-9\">\n            <input class=\"form-control\" [(ngModel)]=\"fl_edit.skype\">\n          </div>\n        </div>\n        <div class=\"form-input\">\n          <label class=\"control-label col-md-3\">Geburtstag</label>\n          <div class=\"col-md-9\">\n            <input type=\"date\" class=\"form-control\" [(ngModel)]=\"fl_edit.date_of_birth\">\n          </div>\n        </div>\n        <div class=\"form-input\">\n          <label class=\"control-label col-md-3\">Korr.Spr.</label>\n          <div class=\"col-md-9\">\n            <select class=\"form-control\" [(ngModel)]=\"fl_edit.correspond_language\" [compareWith]='util.compareById'>\n              <option [value]='undefined' selected>-- Bitte wählen --</option>\n              <option *ngFor=\"let option of coreData.languages_flat.values\" [ngValue]=\"option\">{{ option.name }}</option>\n            </select>\n          </div>\n        </div>\n      </div>\n      <div class=\"col-sm-4 form-box\">\n        <div>\n          <label>Kommentar</label>\n        </div>\n        <textarea class=\"form-control\" rows=\"8\" [(ngModel)]=\"fl_edit.comment\"></textarea>\n      </div>\n    </div>\n    <div class=\"row tile\">\n      <div class=\"col-sm-4 form-box\">\n        <div class=\"form-input\">\n          <label class=\"control-label col-md-3\">{{ coreData.freelancer_status.display_name }}</label>\n          <div class=\"col-md-9\">\n            <select class=\"form-control\" [(ngModel)]=\"fl_edit.fl_status\" [compareWith]='util.compareById' required>\n              <option [value]='undefined' selected>-- Bitte wählen --</option>\n              <option *ngFor=\"let option of coreData.freelancer_status.values\" [ngValue]=\"option\">{{ option.name }}</option>\n            </select>\n          </div>\n        </div>\n        <div class=\"form-input\">\n          <label class=\"control-label col-md-3\">{{ coreData.freelancer_rating.display_name }}</label>\n          <div class=\"col-md-9\">\n            <select class=\"form-control\" [(ngModel)]=\"fl_edit.fl_rating\" [compareWith]='util.compareById'>\n              <option [value]='undefined' selected>-- Bitte wählen --</option>\n              <option *ngFor=\"let option of coreData.freelancer_rating.values\" [ngValue]=\"option\">{{ option.name }}</option>\n            </select>\n          </div>\n        </div>\n        <div class=\"form-input\">\n          <label class=\"control-label col-md-3\">NDA</label>\n          <div class=\"col-md-9\">\n            <select class=\"form-control\" [(ngModel)]=\"fl_edit.nda\" [compareWith]='util.compareById' required>\n              <option [value]='undefined' selected>-- Bitte wählen --</option>\n              <option *ngFor=\"let option of coreData.yes_no_in_progress.values\" [ngValue]=\"option\">{{ option.name }}</option>\n            </select>\n          </div>\n        </div>\n      </div>\n      <div class=\"col-sm-4 form-box\">\n        <div class=\"form-input\">\n          <label class=\"col-md-3\" for=\"edit-sworn\">Vereidigt</label>\n          <div class=\"col-md-9 form-check checkbox-after-label\">\n            <input class=\"form-check-input\" type=\"checkbox\" [(ngModel)]=\"fl_edit.sworn\" id=\"edit-swordn\" name=\"edit-sworn\">\n          </div>\n        </div>\n        <div class=\"form-group\">\n          <label class=\"control-label col-md-3\">Muttersp.1</label>\n          <div class=\"col-md-9\">\n            <select class=\"form-control\" [(ngModel)]=\"fl_edit.mothertounge\" [compareWith]='util.compareById'>\n              <option [value]='undefined' selected>-- Bitte wählen --</option>\n              <option *ngFor=\"let option of coreData.languages_flat.values\" [ngValue]=\"option\">{{ option.name }}</option>\n            </select>\n          </div>\n        </div>\n        <div class=\"form-input\">\n          <label class=\"control-label col-md-3\">Muttersp.2</label>\n          <div class=\"col-md-9\">\n            <select class=\"form-control\" [(ngModel)]=\"fl_edit.mothertounge2\" [compareWith]='util.compareById'>\n              <option [value]='undefined' selected>-- Bitte wählen --</option>\n              <option *ngFor=\"let option of coreData.languages_flat.values\" [ngValue]=\"option\">{{ option.name }}</option>\n            </select>\n          </div>\n        </div>\n      </div>\n      <div class=\"col-sm-4 form-box\">\n        <app-prop-multi-select [objarray]=\"fl_edit.cat_tools\" [valuearray]=\"coreData.cat_tools\">\n        </app-prop-multi-select>\n      </div>\n    </div>\n    <div class=\"row tile\">\n      <div class=\"col-sm-12 form-box\">\n        <div class=\"row\">\n          <div class=\"col-xs-12\">\n            <label class=\"control-label\">Preise</label>\n          </div>\n        </div>\n        <div class=\"row\">\n          <div class=\"col-xs-12\">\n            <div class=\"form-input\">\n              <label class=\"control-label col-md-3\" for=\"edit-cat-prices\">CAT-Staffel</label>\n              <div class=\"col-md-9 form-check\">\n                <input class=\"form-check-input\" type=\"checkbox\" [(ngModel)]=\"fl_edit.cat_prices\" id=\"edit-swordn\" name=\"edit-cat-prices\">\n              </div>\n            </div>\n          </div>\n        </div>\n        <div class=\"row\">\n          <div class=\"col-xs-12\">\n            <div class=\"form-input\">\n              <div class=\"col-sm-2\">\n                <div class=\"form-input\">\n                  <label class=\"control-label\">Quellsprache</label>\n                </div>\n                <select class=\"form-control\" [(ngModel)]=\"new_price_line.lng_source\" [compareWith]='util.compareById'>\n                  <option [value]='undefined' selected>-- Bitte wählen --</option>\n                  <option *ngFor=\"let option of coreData.languages_flat.values\" [ngValue]=\"option\">{{ option.name }}</option>\n                </select>\n              </div>\n              <div class=\"col-sm-2\">\n                <div class=\"form-input\">\n                  <label class=\"control-label\">Zielsprache</label>\n                </div>\n                <select class=\"form-control\" [(ngModel)]=\"new_price_line.lng_target\" [compareWith]='util.compareById'>\n                  <option [value]='undefined' selected>-- Bitte wählen --</option>\n                  <option *ngFor=\"let option of coreData.languages_flat.values\" [ngValue]=\"option\">{{ option.name }}</option>\n                </select>\n              </div>\n              <div class=\"col-sm-2\">\n                <div class=\"form-input\">\n                  <label class=\"control-label\">Leistung</label>\n                </div>\n                <select class=\"form-control\" [(ngModel)]=\"new_price_line.service\" [compareWith]='util.compareById'>\n                  <option [value]='undefined' selected>-- Bitte wählen --</option>\n                  <option *ngFor=\"let option of coreData.services.values\" [ngValue]=\"option\">{{ option.name }}</option>\n                </select>\n              </div>\n              <div class=\"col-sm-2\">\n                <div class=\"form-input\">\n                  <label class=\"control-label\">Einheit</label>\n                </div>\n                <select class=\"form-control\" [(ngModel)]=\"new_price_line.price_unit\" [compareWith]='util.compareById'>\n                  <option [value]='undefined' selected>-- Bitte wählen --</option>\n                  <option *ngFor=\"let option of coreData.price_units.values\" [ngValue]=\"option\">{{ option.name }}</option>\n                </select>\n              </div>\n              <div class=\"col-sm-1\">\n                <div class=\"form-input\">\n                  <label class=\"control-label\">Preis</label>\n                </div>\n                <input class=\"form-control\" type=\"number\" step=\"0.01\" min=\"0\" [(ngModel)]=\"new_price_line.price_per_unit\">\n              </div>\n              <div class=\"col-sm-1\">\n                <div class=\"form-input\">\n                  <label class=\"control-label\">MAW</label>\n                </div>\n                <input class=\"form-control\" type=\"number\" step=\"0.01\" min=\"0\" [(ngModel)]=\"new_price_line.minimum_price\">\n              </div>\n              <div class=\"col-sm-1\">\n                <div class=\"form-input\">\n                  <label class=\"control-label\">Währung</label>\n                </div>\n                <select class=\"form-control\" [(ngModel)]=\"new_price_line.currency\" [compareWith]='util.compareById'>\n                  <option [value]='undefined' selected>-- Bitte wählen --</option>\n                  <option *ngFor=\"let option of coreData.currency.values\" [ngValue]=\"option\">{{ option.name }}</option>\n                </select>\n              </div>\n              <div class=\"col-sm-1 pull-right\">\n                <div class=\"form-input\">\n                  <label class=\"control-label\"></label>\n                </div>\n                <span class=\"glyphicon glyphicon-plus clickable clickable-icon iconsmall\" (click)=\"addPrice(new_price_line)\"></span>\n              </div>\n              <div class=\"clearfix\"></div>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"row\" *ngFor=\"let element of fl_edit.prices\">\n          <div class=\"col-xs-12\">\n            <div class=\"form-input\">\n              <div class=\"col-xs-2\">{{ util.getCombinedDisplayName(element.lng_source) }}</div>\n              <div class=\"col-xs-2\">{{ util.getCombinedDisplayName(element.lng_target) }}</div>\n              <div class=\"col-xs-4\">{{ element.service.name }} pro {{ element.price_unit.name }}</div>\n              <div class=\"col-xs-1\">{{ element.price_per_unit | currency:(element.currency && element.currency.name):3 }}</div>\n              <div class=\"col-xs-1\">{{ element.minimum_price | currency:(element.currency && element.currency.name):2 }}</div>\n              <div class=\"col-xs-2 pull-right\">\n                <span class=\"glyphicon glyphicon-remove clickable clickable-icon iconsmall\" (click)=\"util.removeFromArray(fl_edit.prices, element)\"></span>\n              </div>\n            </div>\n          </div>\n        </div>\n\n      </div>\n    </div>\n    <div class=\"row tile\">\n      <div class=\"col-sm-4 form-box\">\n        <app-prop-multi-select [objarray]=\"fl_edit.sectors\" [valuearray]=\"coreData.sectors_flat\">\n        </app-prop-multi-select>\n      </div>\n      <div class=\"col-sm-4 form-box\">\n        <div class=\"form-input\">\n          <label class=\"control-label col-md-3\">{{ coreData.freelancer_payment_types.display_name }}</label>\n          <div class=\"col-md-9\">\n            <select class=\"form-control\" [(ngModel)]=\"fl_edit.fl_payment_type\" [compareWith]='util.compareById'>\n              <option [value]='undefined' selected>-- Bitte wählen --</option>\n              <option *ngFor=\"let option of coreData.freelancer_payment_types.values\" [ngValue]=\"option\">{{ option.name }}</option>\n            </select>\n          </div>\n        </div>\n\n        <div class=\"form-input\">\n          <label class=\"control-label col-md-3\">{{ coreData.freelancer_invoicing_types.display_name }}</label>\n          <div class=\"col-md-9\">\n            <select class=\"form-control\" [(ngModel)]=\"fl_edit.fl_invoicing_type\" [compareWith]='util.compareById'>\n              <option [value]='undefined' selected>-- Bitte wählen --</option>\n              <option *ngFor=\"let option of coreData.freelancer_invoicing_types.values\" [ngValue]=\"option\">{{ option.name }}</option>\n            </select>\n          </div>\n        </div>\n        <div class=\"form-input\">\n          <label class=\"control-label col-md-3\">USt.-Nr.</label>\n          <div class=\"col-md-9\">\n            <input class=\"form-control\" [(ngModel)]=\"fl_edit.vat_no\">\n          </div>\n        </div>\n        <div class=\"form-input\">\n          <label class=\"control-label col-md-3\">Steuer ID</label>\n          <div class=\"col-md-9\">\n            <input class=\"form-control\" [(ngModel)]=\"fl_edit.tax_id\">\n          </div>\n        </div>\n        <div class=\"form-input\">\n          <label class=\"control-label col-md-3\" for=\"edit-vat_payer\">MwSt.</label>\n          <div class=\"col-md-9 form-check\">\n            <input class=\"form-check-input\" type=\"checkbox\" [(ngModel)]=\"fl_edit.vat_payer\" id=\"edit-vat_payer\n             \" name=\"edit-vat_payer\">\n          </div>\n        </div>\n      </div>\n      <div class=\"col-sm-4 form-box\">\n        <div>\n          <label>Bankverbindung</label>\n        </div>\n        <textarea class=\"form-control\" rows=\"5\" [(ngModel)]=\"fl_edit.bankdetails\"></textarea>\n      </div>\n    </div>\n    <div class=\"row pull-right\">\n      <div class=\"col-sm-12\">\n        <button class=\"btn btn-primary\" (click)=\"saveFreelancer()\">Speichern</button>\n        <button class=\"btn btn-danger\" (click)=\"cancelEdit()\">Abbrechen</button>\n        <button class=\"btn btn-default\" (click)=\"deleteFreelancer()\" [disabled]=\"fl_edit.id==null\">\n          Löschen\n        </button>\n      </div>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/freelancer/freelancer-edit/freelancer-edit.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/freelancer/freelancer-edit/freelancer-edit.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var core_data_service_1 = __webpack_require__("../../../../../src/app/core/core-data.service.ts");
var freelancer_edit_service_1 = __webpack_require__("../../../../../src/app/freelancer/freelancer-edit/freelancer-edit.service.ts");
var price_line_model_1 = __webpack_require__("../../../../../src/app/shared/model/price-line.model.ts");
var util_service_1 = __webpack_require__("../../../../../src/app/core/util.service.ts");
var freelancer_search_service_1 = __webpack_require__("../../../../../src/app/freelancer/freelancer-search/freelancer-search.service.ts");
var FreelancerEditComponent = (function () {
    function FreelancerEditComponent(util, coreDataService, freelancerEditService, freelancerSearchService) {
        this.util = util;
        this.coreDataService = coreDataService;
        this.freelancerEditService = freelancerEditService;
        this.freelancerSearchService = freelancerSearchService;
        this.coreData = new core_data_service_1.CoreData();
        this.new_price_line = new price_line_model_1.PriceLine();
        this.addPrice = function (new_price_line) {
            if ((new_price_line.price_unit != null) && (new_price_line.service != null) && (new_price_line.price_per_unit != null)) {
                this.util.addCopyToArray(this.fl_edit.prices, new_price_line);
            }
        };
    }
    FreelancerEditComponent.prototype.saveFreelancer = function () {
        this.freelancerEditService.saveFreelancer(this.fl_edit);
        // ToDo: Reload search list or update freelancer in list
    };
    FreelancerEditComponent.prototype.deleteFreelancer = function () {
        this.freelancerEditService.deleteFreelancer(this.fl_edit);
        // ToDo: Reload search list or update freelancer in list
    };
    FreelancerEditComponent.prototype.cancelEdit = function () {
        // this.freelancerSearchService.searchFreelancers(null);
        this.util.historyBack();
    };
    FreelancerEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.coreDataService.getData().subscribe(function (data) {
            _this.coreData = data;
        });
        this.fl_edit = this.freelancerEditService.getFreelancerToEdit();
    };
    FreelancerEditComponent = __decorate([
        core_1.Component({
            selector: 'app-freelancer-edit',
            template: __webpack_require__("../../../../../src/app/freelancer/freelancer-edit/freelancer-edit.component.html"),
            styles: [__webpack_require__("../../../../../src/app/freelancer/freelancer-edit/freelancer-edit.component.scss")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof util_service_1.UtilService !== "undefined" && util_service_1.UtilService) === "function" && _a || Object, typeof (_b = typeof core_data_service_1.CoreDataService !== "undefined" && core_data_service_1.CoreDataService) === "function" && _b || Object, typeof (_c = typeof freelancer_edit_service_1.FreelancerEditService !== "undefined" && freelancer_edit_service_1.FreelancerEditService) === "function" && _c || Object, typeof (_d = typeof freelancer_search_service_1.FreelancerSearchService !== "undefined" && freelancer_search_service_1.FreelancerSearchService) === "function" && _d || Object])
    ], FreelancerEditComponent);
    return FreelancerEditComponent;
    var _a, _b, _c, _d;
}());
exports.FreelancerEditComponent = FreelancerEditComponent;
//# sourceMappingURL=freelancer-edit.component.js.map

/***/ }),

/***/ "../../../../../src/app/freelancer/freelancer-edit/freelancer-edit.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var freelancer_model_1 = __webpack_require__("../../../../../src/app/freelancer/freelancer.model.ts");
var util_service_1 = __webpack_require__("../../../../../src/app/core/util.service.ts");
var http_1 = __webpack_require__("../../../common/@angular/common/http.es5.js");
var freelancer_search_service_1 = __webpack_require__("../../../../../src/app/freelancer/freelancer-search/freelancer-search.service.ts");
var FreelancerEditService = (function () {
    function FreelancerEditService(util, http, freelancerSearchService) {
        this.util = util;
        this.http = http;
        this.freelancerSearchService = freelancerSearchService;
        this.freelancerToEdit = new freelancer_model_1.Freelancer();
    }
    FreelancerEditService.prototype.getFreelancerToEdit = function () {
        return this.freelancerToEdit;
    };
    /**
     * Save changes on server
     *
     * @param freelancerToSave Data for the freelancer to be updated
     */
    FreelancerEditService.prototype.saveFreelancer = function (freelancerToSave) {
        var _this = this;
        this.freelancerToEdit = freelancerToSave;
        // Kopie des Freelancers erstellen, um Datum in yyyy-mm-dd String zu wandeln, falls vorhanden
        var fl_save = this.util.cloneDeep(this.freelancerToEdit);
        if (this.freelancerToEdit.date_of_birth) {
            var dateObj = new Date(this.freelancerToEdit.date_of_birth);
            if (dateObj.getTime() !== NaN) {
                fl_save.date_of_birth = dateObj.toISOString().slice(0, 10);
            }
            else {
                alert('Datum wurde nicht korrekt eingegeben');
                return;
            }
        }
        console.log(fl_save);
        // Set up post request
        var req = this.http.post('/freelancers' + (fl_save.id ? '/' + fl_save.id : ''), fl_save);
        // Execute post request and subscribe to response
        req.subscribe(function (data) {
            _this.freelancerToEdit = data;
            _this.freelancerSearchService.searchFreelancers(null);
            _this.util.historyBack();
        }, function (error) {
            alert("Fehler beim Speichern:" + error.message);
        });
        return;
    };
    FreelancerEditService.prototype.deleteFreelancer = function (freelancerToDelete) {
        var _this = this;
        if (!confirm('Freelancer ' + freelancerToDelete.name2 + ', ' + freelancerToDelete.name1 + ' wirklich löschen?!')) {
            return;
        }
        // Set up post request
        var req = this.http.delete('/freelancers/' + freelancerToDelete.id);
        // Execute post request and subscribe to response
        req.subscribe(function (data) {
            _this.freelancerSearchService.searchFreelancers(null);
            _this.util.historyBack();
        }, function (error) {
            alert("Fehler beim Löschen:" + error.message);
        });
        return;
    };
    /**
     * Loads freelancer by id and switches to edit view if found
     *
     * @param id Id of the freelancer to be edited
     */
    FreelancerEditService.prototype.getFreelancerByIdAndEdit = function (id) {
        var _this = this;
        // Set up post request
        var req = this.http.get('/freelancers/' + id);
        // Execute post request and subscribe to response
        req.subscribe(function (data) {
            _this.freelancerToEdit = data;
            console.log(data);
            _this.util.goTo('/freelancer/edit');
        }, function (error) {
            alert(error.message);
        });
        return;
    };
    FreelancerEditService.prototype.editFreelancer = function (id) {
        this.freelancerToEdit = new freelancer_model_1.Freelancer();
        if (id && id > 0) {
            // Reload freelancer before editing
            this.getFreelancerByIdAndEdit(id);
        }
        else {
            this.util.goTo('/freelancer/edit');
        }
    };
    FreelancerEditService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [typeof (_a = typeof util_service_1.UtilService !== "undefined" && util_service_1.UtilService) === "function" && _a || Object, typeof (_b = typeof http_1.HttpClient !== "undefined" && http_1.HttpClient) === "function" && _b || Object, typeof (_c = typeof freelancer_search_service_1.FreelancerSearchService !== "undefined" && freelancer_search_service_1.FreelancerSearchService) === "function" && _c || Object])
    ], FreelancerEditService);
    return FreelancerEditService;
    var _a, _b, _c;
}());
exports.FreelancerEditService = FreelancerEditService;
//# sourceMappingURL=freelancer-edit.service.js.map

/***/ }),

/***/ "../../../../../src/app/freelancer/freelancer-routing.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// app-routing.module.ts
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var router_1 = __webpack_require__("../../../router/@angular/router.es5.js");
var auth_guard_service_1 = __webpack_require__("../../../../../src/app/user/auth-guard.service.ts");
var freelancer_search_component_1 = __webpack_require__("../../../../../src/app/freelancer/freelancer-search/freelancer-search.component.ts");
var freelancer_edit_component_1 = __webpack_require__("../../../../../src/app/freelancer/freelancer-edit/freelancer-edit.component.ts");
/**
 * Routes used in the app
 */
var ROUTE_CONFIG = [
    {
        path: 'freelancer',
        component: freelancer_search_component_1.FreelancerSearchComponent,
        canActivate: [auth_guard_service_1.AuthGuardService]
    },
    {
        path: 'freelancer/edit',
        component: freelancer_edit_component_1.FreelancerEditComponent
    }
];
var FreelancerRoutingModule = (function () {
    function FreelancerRoutingModule() {
    }
    FreelancerRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forChild(ROUTE_CONFIG)
            ],
            exports: [router_1.RouterModule]
        })
    ], FreelancerRoutingModule);
    return FreelancerRoutingModule;
}());
exports.FreelancerRoutingModule = FreelancerRoutingModule;
//# sourceMappingURL=freelancer-routing.module.js.map

/***/ }),

/***/ "../../../../../src/app/freelancer/freelancer-search/freelancer-search.component.html":
/***/ (function(module, exports) {

module.exports = "<div>\n  <h1>Freelancer</h1>\n  <div class=\"form-default col-sm-12\" (keydown.enter)=\"searchParams.page=1;searchFreelancers(searchParams)\">\n    <div class=\"row\">\n      <form class=\"form-box col-sm-5 form-horizontal\">\n        <div class=\"form-input\">\n          <label class=\"control-label col-sm-3\">Lieferant</label>\n          <div class=\"col-sm-9\">\n            <input id=\"search-name\" name=\"search-name\" class=\"form-control\" [(ngModel)]=\"searchParams.name\" />\n          </div>\n        </div>\n        <div class=\"form-input\">\n          <label class=\"control-label col-sm-3\">Status</label>\n          <div class=\"col-sm-9\">\n            <select class=\"form-control\" name=\"search-sector\" [(ngModel)]=\"searchParams.fl_status\" [compareWith]='util.compareById'>\n              <option [value]='undefined' selected>-- Bitte wählen --</option>\n              <option *ngFor=\"let option of coreData.freelancer_status.values\" [ngValue]=\"option\">{{ option.name }}</option>\n            </select>\n          </div>\n        </div>\n      </form>\n      <form class=\"form-box col-sm-5 form-horizontal\">\n        <div class=\"form-input\">\n          <label class=\"control-label col-sm-3\">Quellsprache</label>\n          <div class=\"col-sm-9\">\n            <select class=\"form-control\" name=\"search-lng_source\" [(ngModel)]=\"searchParams.lng_source\" [compareWith]='util.compareById'>\n              <option [value]='undefined' selected>-- Bitte wählen --</option>\n              <option *ngFor=\"let option of coreData.languages_flat.values\" [ngValue]=\"option\">{{ option.name }}</option>\n            </select>\n          </div>\n        </div>\n        <div class=\"form-input\">\n          <label class=\"control-label col-sm-3\">Zielsprache</label>\n          <div class=\"col-sm-9\">\n            <select class=\"form-control\" name=\"search-lng_target\" [(ngModel)]=\"searchParams.lng_target\" [compareWith]='util.compareById'>\n              <option [value]='undefined' selected>-- Bitte wählen --</option>\n              <option *ngFor=\"let option of coreData.languages_flat.values\" [ngValue]=\"option\">{{ option.name }}</option>\n            </select>\n          </div>\n        </div>\n        <div class=\"form-input\">\n          <label class=\"control-label col-sm-3\">Fachgebiet</label>\n          <div class=\"col-sm-9\">\n            <select class=\"form-control\" name=\"search-sector\" [(ngModel)]=\"searchParams.sector\" [compareWith]='util.compareById'>\n              <option [value]='undefined' selected>-- Bitte wählen --</option>\n              <option *ngFor=\"let option of coreData.sectors_flat.values\" [ngValue]=\"option\">{{ option.name }}</option>\n            </select>\n          </div>\n        </div>\n      </form>\n      <div class=\"button-area col-sm-2 form-horizontal\">\n        <button class=\"btn btn-block btn-primary\" (click)=\"searchParams.page=1;searchFreelancers(searchParams)\">Suchen</button>\n        <button class=\"btn btn-block btn-default\" (click)=\"editFreelancer(null)\">Neuer Freelancer</button>\n      </div>\n    </div>\n  </div>\n  <h2>Suchergebnisse: {{ freelancersLoaded.itemsTotal }}\n    <span *ngIf=\"freelancersLoaded.pageMax > 1\">(Seite {{ freelancersLoaded.page }} von {{ freelancersLoaded.pageMax }})\n    </span>\n  </h2>\n  <div *ngFor=\"let freelancer of freelancersLoaded.items\">\n    <app-freelancer-compact [fl]=\"freelancer\">\n    </app-freelancer-compact>\n  </div>\n\n  <ngb-pagination [collectionSize]=\"freelancersLoaded.itemsTotal\" [(page)]=\"searchParams.page\" [pageSize]=\"20\" [maxSize]=\"10\"\n    class=\"pagination-sm\" [rotate]=\"true\" [boundaryLinks]=\"true\" [ellipses]=\"true\" (pageChange)=\"searchFreelancers(searchParams)\">\n  </ngb-pagination>\n\n</div>"

/***/ }),

/***/ "../../../../../src/app/freelancer/freelancer-search/freelancer-search.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/freelancer/freelancer-search/freelancer-search.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var freelancers_loaded_model_1 = __webpack_require__("../../../../../src/app/freelancer/freelancer-search/freelancers-loaded.model.ts");
var freelancers_search_params_model_1 = __webpack_require__("../../../../../src/app/freelancer/freelancer-search/freelancers-search-params.model.ts");
var freelancer_search_service_1 = __webpack_require__("../../../../../src/app/freelancer/freelancer-search/freelancer-search.service.ts");
var freelancer_edit_service_1 = __webpack_require__("../../../../../src/app/freelancer/freelancer-edit/freelancer-edit.service.ts");
var core_data_service_1 = __webpack_require__("../../../../../src/app/core/core-data.service.ts");
var util_service_1 = __webpack_require__("../../../../../src/app/core/util.service.ts");
var FreelancerSearchComponent = (function () {
    function FreelancerSearchComponent(util, coreDataService, freelancerSearchService, freelancerEditService) {
        this.util = util;
        this.coreDataService = coreDataService;
        this.freelancerSearchService = freelancerSearchService;
        this.freelancerEditService = freelancerEditService;
        this.freelancersLoaded = new freelancers_loaded_model_1.FreelancersLoaded();
        this.searchParams = new freelancers_search_params_model_1.FreelancerSearchParams();
        this.coreData = new core_data_service_1.CoreData();
    }
    FreelancerSearchComponent.prototype.searchFreelancers = function (searchParams) {
        console.log(searchParams);
        this.freelancerSearchService.searchFreelancers(searchParams);
    };
    FreelancerSearchComponent.prototype.editFreelancer = function (freelancerToEdit) {
        this.freelancerEditService.editFreelancer(freelancerToEdit && freelancerToEdit.id);
    };
    FreelancerSearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.searchParams = this.freelancerSearchService.getLastSearchParams();
        this.freelancerSearchService.getFreelancersLoaded().subscribe(function (freelancersLoaded) {
            _this.freelancersLoaded = freelancersLoaded;
        });
        this.coreDataService.getData().subscribe(function (data) {
            _this.coreData = data;
        });
    };
    FreelancerSearchComponent = __decorate([
        core_1.Component({
            selector: 'app-freelancer',
            template: __webpack_require__("../../../../../src/app/freelancer/freelancer-search/freelancer-search.component.html"),
            styles: [__webpack_require__("../../../../../src/app/freelancer/freelancer-search/freelancer-search.component.scss")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof util_service_1.UtilService !== "undefined" && util_service_1.UtilService) === "function" && _a || Object, typeof (_b = typeof core_data_service_1.CoreDataService !== "undefined" && core_data_service_1.CoreDataService) === "function" && _b || Object, typeof (_c = typeof freelancer_search_service_1.FreelancerSearchService !== "undefined" && freelancer_search_service_1.FreelancerSearchService) === "function" && _c || Object, typeof (_d = typeof freelancer_edit_service_1.FreelancerEditService !== "undefined" && freelancer_edit_service_1.FreelancerEditService) === "function" && _d || Object])
    ], FreelancerSearchComponent);
    return FreelancerSearchComponent;
    var _a, _b, _c, _d;
}());
exports.FreelancerSearchComponent = FreelancerSearchComponent;
//# sourceMappingURL=freelancer-search.component.js.map

/***/ }),

/***/ "../../../../../src/app/freelancer/freelancer-search/freelancer-search.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var rxjs_1 = __webpack_require__("../../../../rxjs/Rx.js");
var http_1 = __webpack_require__("../../../common/@angular/common/http.es5.js");
var freelancers_loaded_model_1 = __webpack_require__("../../../../../src/app/freelancer/freelancer-search/freelancers-loaded.model.ts");
var util_service_1 = __webpack_require__("../../../../../src/app/core/util.service.ts");
var freelancers_search_params_model_1 = __webpack_require__("../../../../../src/app/freelancer/freelancer-search/freelancers-search-params.model.ts");
var FreelancerSearchService = (function () {
    function FreelancerSearchService(http, util) {
        this.http = http;
        this.util = util;
        this.lastSearchParams = new freelancers_search_params_model_1.FreelancerSearchParams();
        this.$freelancersLoaded = new rxjs_1.BehaviorSubject(new freelancers_loaded_model_1.FreelancersLoaded);
    }
    FreelancerSearchService.prototype.getFreelancersLoaded = function () {
        return this.$freelancersLoaded.asObservable();
    };
    FreelancerSearchService.prototype.getLastSearchParams = function () {
        return this.lastSearchParams;
    };
    FreelancerSearchService.prototype.searchFreelancers = function (searchParams) {
        var _this = this;
        if (searchParams) {
            this.lastSearchParams = searchParams;
        }
        // Set up post request
        var req = this.http.post('/freelancers/search', searchParams || this.lastSearchParams);
        // Execute post request and subscribe to response
        req.subscribe(function (data) {
            console.log(data);
            for (var i = 0; i < data.items.length; i++) {
                _this.util.orderPrices(data.items[i].prices);
            }
            _this.$freelancersLoaded.next(data);
        }, function (error) {
            // ToDo: Implement error handler
        });
        return;
    };
    FreelancerSearchService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [typeof (_a = typeof http_1.HttpClient !== "undefined" && http_1.HttpClient) === "function" && _a || Object, typeof (_b = typeof util_service_1.UtilService !== "undefined" && util_service_1.UtilService) === "function" && _b || Object])
    ], FreelancerSearchService);
    return FreelancerSearchService;
    var _a, _b;
}());
exports.FreelancerSearchService = FreelancerSearchService;
//# sourceMappingURL=freelancer-search.service.js.map

/***/ }),

/***/ "../../../../../src/app/freelancer/freelancer-search/freelancers-loaded.model.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Object to hold all information the application can know about a freelancer.
 */
var FreelancersLoaded = (function () {
    function FreelancersLoaded() {
        this.items = [];
        this.itemsTotal = 0;
        this.itemsPerPage = 0;
        this.page = 1;
        this.pageMax = 0;
    }
    return FreelancersLoaded;
}());
exports.FreelancersLoaded = FreelancersLoaded;
//# sourceMappingURL=freelancers-loaded.model.js.map

/***/ }),

/***/ "../../../../../src/app/freelancer/freelancer-search/freelancers-search-params.model.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Object to hold all information the application can know about a freelancer.
 */
var FreelancerSearchParams = (function () {
    function FreelancerSearchParams() {
        this.page = 1;
    }
    return FreelancerSearchParams;
}());
exports.FreelancerSearchParams = FreelancerSearchParams;
//# sourceMappingURL=freelancers-search-params.model.js.map

/***/ }),

/***/ "../../../../../src/app/freelancer/freelancer.model.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var address_model_1 = __webpack_require__("../../../../../src/app/shared/model/address.model.ts");
var person_model_1 = __webpack_require__("../../../../../src/app/shared/model/person.model.ts");
var simple_entity_model_1 = __webpack_require__("../../../../../src/app/shared/model/simple-entity.model.ts");
/**
 * Object to hold all information the application can know about a freelancer.
 */
var Freelancer = (function (_super) {
    __extends(Freelancer, _super);
    function Freelancer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.supplier_no = null;
        _this.company_name = null;
        _this.address = new address_model_1.Address();
        _this.fl_status = null;
        _this.fl_rating = null;
        _this.mothertounge = null;
        _this.mothertounge2 = null;
        _this.nda = null;
        _this.sworn = null;
        _this.vat_no = null;
        _this.vat_payer = null;
        _this.tax_id = null;
        _this.fl_payment_type = null;
        _this.fl_invoicing_type = null;
        _this.bankdetails = null;
        _this.prices = [];
        _this.cat_prices = null;
        _this.sectors = [];
        _this.cat_tools = [];
        return _this;
    }
    return Freelancer;
}(person_model_1.Person));
exports.Freelancer = Freelancer;
var FreelancerInvoicingType = (function (_super) {
    __extends(FreelancerInvoicingType, _super);
    function FreelancerInvoicingType() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return FreelancerInvoicingType;
}(simple_entity_model_1.SimpleEntity));
exports.FreelancerInvoicingType = FreelancerInvoicingType;
var FreelancerPaymentType = (function (_super) {
    __extends(FreelancerPaymentType, _super);
    function FreelancerPaymentType() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return FreelancerPaymentType;
}(simple_entity_model_1.SimpleEntity));
exports.FreelancerPaymentType = FreelancerPaymentType;
var FreelancerRating = (function (_super) {
    __extends(FreelancerRating, _super);
    function FreelancerRating() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return FreelancerRating;
}(simple_entity_model_1.SimpleEntity));
exports.FreelancerRating = FreelancerRating;
var FreelancerStatus = (function (_super) {
    __extends(FreelancerStatus, _super);
    function FreelancerStatus() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return FreelancerStatus;
}(simple_entity_model_1.SimpleEntity));
exports.FreelancerStatus = FreelancerStatus;
//# sourceMappingURL=freelancer.model.js.map

/***/ }),

/***/ "../../../../../src/app/freelancer/freelancer.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var ng_bootstrap_1 = __webpack_require__("../../../../@ng-bootstrap/ng-bootstrap/index.js");
var shared_module_1 = __webpack_require__("../../../../../src/app/shared/shared.module.ts");
var freelancer_routing_module_1 = __webpack_require__("../../../../../src/app/freelancer/freelancer-routing.module.ts");
var freelancer_search_service_1 = __webpack_require__("../../../../../src/app/freelancer/freelancer-search/freelancer-search.service.ts");
var freelancer_edit_service_1 = __webpack_require__("../../../../../src/app/freelancer/freelancer-edit/freelancer-edit.service.ts");
var freelancer_search_component_1 = __webpack_require__("../../../../../src/app/freelancer/freelancer-search/freelancer-search.component.ts");
var freelancer_edit_component_1 = __webpack_require__("../../../../../src/app/freelancer/freelancer-edit/freelancer-edit.component.ts");
var freelancer_compact_component_1 = __webpack_require__("../../../../../src/app/freelancer/freelancer-compact/freelancer-compact.component.ts");
var FreelancerModule = (function () {
    function FreelancerModule() {
    }
    FreelancerModule = __decorate([
        core_1.NgModule({
            imports: [
                ng_bootstrap_1.NgbModule,
                shared_module_1.SharedModule,
                freelancer_routing_module_1.FreelancerRoutingModule
            ],
            declarations: [
                freelancer_search_component_1.FreelancerSearchComponent,
                freelancer_compact_component_1.FreelancerCompactComponent,
                freelancer_edit_component_1.FreelancerEditComponent
            ],
            exports: [
                freelancer_search_component_1.FreelancerSearchComponent,
                freelancer_compact_component_1.FreelancerCompactComponent,
                freelancer_edit_component_1.FreelancerEditComponent
            ],
            providers: [
                freelancer_search_service_1.FreelancerSearchService,
                freelancer_edit_service_1.FreelancerEditService
            ]
        })
    ], FreelancerModule);
    return FreelancerModule;
}());
exports.FreelancerModule = FreelancerModule;
//# sourceMappingURL=freelancer.module.js.map

/***/ }),

/***/ "../../../../../src/app/layout/home/home.component.html":
/***/ (function(module, exports) {

module.exports = "<div>\n  <h1>WerftNet Startseite</h1>\n  <div style=\"width: 70%; padding:30px; margin: 60px auto; border: solid 1px lightgray\">\n    <h2>Feedback</h2>\n    <p>Das Feedback und der aktuelle Stand ist auf unserem Trello-Board einsehbar</p>\n    <p>Das Trello-Board ist hier erreichbar:</p>\n    <a href=\"https://trello.com/b/owYPOSaW/werftnet-10\" target=\"_blank\">Zum Feedback in Trello</a>\n  </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/layout/home/home.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/home/home.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var HomeComponent = (function () {
    function HomeComponent() {
    }
    HomeComponent.prototype.ngOnInit = function () {
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'app-home',
            template: __webpack_require__("../../../../../src/app/layout/home/home.component.html"),
            styles: [__webpack_require__("../../../../../src/app/layout/home/home.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map

/***/ }),

/***/ "../../../../../src/app/layout/login/login.component.html":
/***/ (function(module, exports) {

module.exports = "<div>\n  <h1>Bitte einloggen</h1>\n\n  <form class=\"form-horizontal\">\n    <div class=\"form-input row\">\n      <label for=\"username\" class=\"control-label col-sm-4\">Benutzer</label>\n      <div class=\"col-sm-5\">\n        <input id=\"username\" name=\"username\" type=\"text\" [(ngModel)]=\"username\" class=\"form-control\">\n      </div>\n    </div>\n    <div class=\"form-input row\">\n      <label for=\"password\" class=\"control-label col-sm-4\">Passwort</label>\n      <div class=\"col-sm-5\">\n        <input id=\"password\" name=\"password\" type=\"password\" [(ngModel)]=\"password\" class=\"form-control\">\n      </div>\n    </div>\n    <div class=\"form-input row\">\n      <span class=\"col-sm-4\"></span>\n      <div class=\"col-sm-5\">\n        <button id=\"login_button\" class=\"btn btn-block btn-primary\" (click)=\"loginUser(username, password)\">Login</button>\n      </div>\n    </div>\n    <div class=\"form-input row\">\n      <span class=\"col-sm-4\"></span>\n      <div class=\"col-sm-5\">\n        <div class=\"text-danger\">{{ loginError.message }}</div>\n      </div>\n\n    </div>\n\n  </form>\n\n</div>"

/***/ }),

/***/ "../../../../../src/app/layout/login/login.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/login/login.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var user_service_1 = __webpack_require__("../../../../../src/app/user/user.service.ts");
var LoginComponent = (function () {
    function LoginComponent(userService) {
        this.userService = userService;
    }
    LoginComponent.prototype.loginUser = function (username, password) {
        this.userService.loginUser({ username: username, password: password }, null, null);
    };
    LoginComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.getLoginError()
            .subscribe(function (loginError) { return _this.loginError = loginError; });
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            template: __webpack_require__("../../../../../src/app/layout/login/login.component.html"),
            styles: [__webpack_require__("../../../../../src/app/layout/login/login.component.scss")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" && _a || Object])
    ], LoginComponent);
    return LoginComponent;
    var _a;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map

/***/ }),

/***/ "../../../../../src/app/layout/top-nav/top-nav.component.html":
/***/ (function(module, exports) {

module.exports = "<nav id=\"topnav\" class=\"navbar navbar-default\">\n  <div class=\"container-fluid\">\n    <div class=\"navbar-header\">\n      <button type=\"button\" class=\"navbar-toggle\" (click)=\"isCollapsed = !isCollapsed\">\n        <span class=\"glyphicon glyphicon-menu-hamburger\"></span>\n      </button>\n      <span class=\"navbar-brand\">WerftNet</span>\n    </div>\n    <div class=\"navbar-collapse\" [ngClass]=\"isCollapsed ? 'collapse' : 'in'\">\n      <ul class=\"nav navbar-nav\">\n        <li class=\"clickable\" routerLinkActive=\"active\">\n          <a routerLink=\"home\">Home</a>\n        </li>\n        <li class=\"clickable\" routerLinkActive=\"active\">\n          <a routerLink=\"freelancer\">Lieferanten</a>\n        </li>\n        <li class=\"clickable\" routerLinkActive=\"active\">\n          <a routerLink=\"customer\">Kunde</a>\n        </li>\n        <li class=\"clickable\" routerLinkActive=\"active\" *ngIf=\"userHasRole('ROLE_ADMIN')\">\n          <a routerLink=\"admin\">Adminbereich</a>\n        </li>\n      </ul>\n      <ul class=\"nav navbar-nav pull-right\">\n        <li class=\"clickable\" routerLinkActive=\"active\">\n          <a routerLink=\"user\">Benutzerprofil</a>\n        </li>\n        <li class=\"clickable\" routerLinkActive=\"active\" ng-if=\"isUserLoggedIn()\">\n          <a (click)=\"logoutUser()\">Logout</a>\n        </li>\n      </ul>\n    </div>\n  </div>\n</nav>"

/***/ }),

/***/ "../../../../../src/app/layout/top-nav/top-nav.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/layout/top-nav/top-nav.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var user_service_1 = __webpack_require__("../../../../../src/app/user/user.service.ts");
var TopNavComponent = (function () {
    function TopNavComponent(userService) {
        this.userService = userService;
        this.isCollapsed = false;
    }
    TopNavComponent.prototype.userHasRole = function (role) {
        return this.userService.userHasRole(role);
    };
    TopNavComponent.prototype.isUserLoggedIn = function () {
        return this.userService.isLoggedIn();
    };
    TopNavComponent.prototype.logoutUser = function () {
        return this.userService.logoutUser(null, null);
    };
    TopNavComponent.prototype.ngOnInit = function () {
    };
    TopNavComponent = __decorate([
        core_1.Component({
            selector: 'app-top-nav',
            template: __webpack_require__("../../../../../src/app/layout/top-nav/top-nav.component.html"),
            styles: [__webpack_require__("../../../../../src/app/layout/top-nav/top-nav.component.scss")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" && _a || Object])
    ], TopNavComponent);
    return TopNavComponent;
    var _a;
}());
exports.TopNavComponent = TopNavComponent;
//# sourceMappingURL=top-nav.component.js.map

/***/ }),

/***/ "../../../../../src/app/shared/components/prop-multi-select/prop-multi-select.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"form-group prop-multi-select\">\n  <div class=\"col-xs-12\">\n    <label class=\"control-label\">{{ valuearray.display_name}}</label>\n  </div>\n</div>\n<div class=\"form-group\">\n  <div class=\"col-sm-10\">\n\n    <ss-multiselect-dropdown [options]=\"valuelist\" [texts]=\"multiselectTexts\" [settings]=\"multiselectSettings\" [(ngModel)]=\"currentSelection\"></ss-multiselect-dropdown>\n\n  </div>\n  <div class=\"col-sm-2\">\n    <button class=\"btn btn-primary\" (click)=\"addSelectedItems()\">+</button>\n  </div>\n</div>\n<div class=\"container-fluid form-group\">\n  <div class=\"col-sm-12\">\n    <div class=\"row\" *ngFor=\"let item of objarray\">\n      <div class=\"col-sm-12\">\n        {{ util.getCombinedDisplayName(item) }}\n        <span class=\"glyphicon glyphicon-remove clickable iconsmall\" (click)=\"removeSelectedItem(item)\"></span>\n      </div>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/shared/components/prop-multi-select/prop-multi-select.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/shared/components/prop-multi-select/prop-multi-select.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var simple_entity_model_1 = __webpack_require__("../../../../../src/app/shared/model/simple-entity.model.ts");
var util_service_1 = __webpack_require__("../../../../../src/app/core/util.service.ts");
var PropMultiSelectComponent = (function () {
    function PropMultiSelectComponent(util, cdRef) {
        this.util = util;
        this.cdRef = cdRef;
        this.currentSelection = [];
        this.valuelist = [];
        this.rerenderNgSelect = false;
        // Settings configuration
        this.singleSelect = false;
        this.multiselectSettings = {
            enableSearch: true,
            checkedStyle: 'fontawesome',
            buttonClasses: 'btn btn-default btn-block',
            dynamicTitleMaxItems: 3,
            displayAllSelectedText: true
        };
        this.multiselectTexts = {
            checkAll: 'Select all',
            uncheckAll: 'Unselect all',
            checked: 'item selected',
            checkedPlural: 'items selected',
            searchPlaceholder: 'Find',
            searchEmptyResult: 'Nothing found...',
            searchNoRenderText: 'Type in search box to see results...',
            defaultTitle: 'Select',
            allSelected: 'All selected',
        };
        if (this.singleSelect) {
            this.multiselectSettings.selectionLimit = 1;
            this.multiselectSettings.autoUnselect = true;
        }
    }
    PropMultiSelectComponent.prototype.addSelectedItems = function () {
        console.log(this.currentSelection);
        for (var i = 0; i < this.currentSelection.length; i++) {
            var element = null;
            for (var va = 0; va < this.valuearray.values.length; va++) {
                if (this.valuearray.values[va].id === this.currentSelection[i]) {
                    element = this.valuearray.values[va];
                    break;
                }
            }
            if (element && !this.util.isObjectIdInArray(this.objarray, element)) {
                this.util.addCopyToArray(this.objarray, element);
            }
        }
        this.currentSelection = [];
        this.util.orderArrayByName(this.objarray);
        this.doReRenderNg2Select();
    };
    ;
    PropMultiSelectComponent.prototype.removeSelectedItem = function (item) {
        this.util.removeFromArray(this.objarray, item);
        this.doReRenderNg2Select();
    };
    PropMultiSelectComponent.prototype.doReRenderNg2Select = function () {
        this.rerenderNgSelect = true;
        this.cdRef.detectChanges();
        this.valuelist = this.prepareValueArray(this.valuearray);
        this.rerenderNgSelect = false;
    };
    PropMultiSelectComponent.prototype.prepareValueArray = function (valuearray) {
        var _this = this;
        var valuelist = Object.assign([], valuearray.values);
        this.objarray.map(function (value) {
            _this.util.removeFromArray(valuelist, value);
        });
        this.util.orderArrayByName(valuelist);
        valuelist = this.convertToSelectFormat(valuelist);
        return valuelist;
    };
    PropMultiSelectComponent.prototype.refreshValue = function (value) {
        this.currentSelection = value;
    };
    PropMultiSelectComponent.prototype.convertToSelectFormat = function (simpleEntityArray) {
        var result = [];
        for (var i = 0; i < simpleEntityArray.length; i++) {
            result.push({
                id: simpleEntityArray[i].id,
                name: simpleEntityArray[i].name
            });
        }
        return result;
    };
    PropMultiSelectComponent.prototype.ngOnInit = function () {
        this.util.orderArrayByName(this.objarray);
        this.valuelist = this.prepareValueArray(this.valuearray);
    };
    __decorate([
        core_1.Input('objarray'),
        __metadata("design:type", Array)
    ], PropMultiSelectComponent.prototype, "objarray", void 0);
    __decorate([
        core_1.Input('valuearray'),
        __metadata("design:type", typeof (_a = typeof simple_entity_model_1.SimpleEntityCollection !== "undefined" && simple_entity_model_1.SimpleEntityCollection) === "function" && _a || Object)
    ], PropMultiSelectComponent.prototype, "valuearray", void 0);
    PropMultiSelectComponent = __decorate([
        core_1.Component({
            selector: 'app-prop-multi-select',
            template: __webpack_require__("../../../../../src/app/shared/components/prop-multi-select/prop-multi-select.component.html"),
            styles: [__webpack_require__("../../../../../src/app/shared/components/prop-multi-select/prop-multi-select.component.scss")]
        }),
        __metadata("design:paramtypes", [typeof (_b = typeof util_service_1.UtilService !== "undefined" && util_service_1.UtilService) === "function" && _b || Object, typeof (_c = typeof core_1.ChangeDetectorRef !== "undefined" && core_1.ChangeDetectorRef) === "function" && _c || Object])
    ], PropMultiSelectComponent);
    return PropMultiSelectComponent;
    var _a, _b, _c;
}());
exports.PropMultiSelectComponent = PropMultiSelectComponent;
//# sourceMappingURL=prop-multi-select.component.js.map

/***/ }),

/***/ "../../../../../src/app/shared/model/address.model.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// General models
var Address = (function () {
    function Address() {
        this.street = null;
        this.street2 = null;
        this.zipcode = null;
        this.city = null;
        this.country = null;
    }
    return Address;
}());
exports.Address = Address;
//# sourceMappingURL=address.model.js.map

/***/ }),

/***/ "../../../../../src/app/shared/model/contact.model.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// General models
var Contact = (function () {
    function Contact() {
        this.name1 = null;
        this.name2 = null;
        this.phone = null;
        this.phone2 = null;
        this.email = null;
        this.email2 = null;
        this.skype = null;
        this.fax = null;
        this.comment = null;
        this.created_at = null;
    }
    return Contact;
}());
exports.Contact = Contact;
//# sourceMappingURL=contact.model.js.map

/***/ }),

/***/ "../../../../../src/app/shared/model/person.model.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var contact_model_1 = __webpack_require__("../../../../../src/app/shared/model/contact.model.ts");
// General models
var Person = (function (_super) {
    __extends(Person, _super);
    function Person() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.anrede = null;
        _this.date_of_birth = null;
        _this.correspond_language = null;
        return _this;
    }
    return Person;
}(contact_model_1.Contact));
exports.Person = Person;
//# sourceMappingURL=person.model.js.map

/***/ }),

/***/ "../../../../../src/app/shared/model/price-line.model.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// General models
var PriceLine = (function () {
    function PriceLine() {
        this.lng_source = null;
        this.lng_target = null;
        this.service = null;
        this.price_unit = null;
        this.price_per_unit = null;
        this.currency = null;
        this.minimum_price = null;
    }
    return PriceLine;
}());
exports.PriceLine = PriceLine;
//# sourceMappingURL=price-line.model.js.map

/***/ }),

/***/ "../../../../../src/app/shared/model/simple-entity.model.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Object to hold all information the application can know about a user.
 */
var SimpleEntity = (function () {
    function SimpleEntity() {
        this.name = null;
    }
    return SimpleEntity;
}());
exports.SimpleEntity = SimpleEntity;
var SimpleEntityCollection = (function () {
    function SimpleEntityCollection() {
        this.display_name = null;
        this.values = [];
    }
    return SimpleEntityCollection;
}());
exports.SimpleEntityCollection = SimpleEntityCollection;
//# sourceMappingURL=simple-entity.model.js.map

/***/ }),

/***/ "../../../../../src/app/shared/pipes/safe-url.pipe.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var platform_browser_1 = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
var SafeUrlPipe = (function () {
    function SafeUrlPipe(domSanitizer) {
        this.domSanitizer = domSanitizer;
    }
    SafeUrlPipe.prototype.transform = function (url) {
        return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
    };
    SafeUrlPipe = __decorate([
        core_1.Pipe({
            name: 'safeUrl'
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof platform_browser_1.DomSanitizer !== "undefined" && platform_browser_1.DomSanitizer) === "function" && _a || Object])
    ], SafeUrlPipe);
    return SafeUrlPipe;
    var _a;
}());
exports.SafeUrlPipe = SafeUrlPipe;
//# sourceMappingURL=safe-url.pipe.js.map

/***/ }),

/***/ "../../../../../src/app/shared/shared.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var common_1 = __webpack_require__("../../../common/@angular/common.es5.js");
var forms_1 = __webpack_require__("../../../forms/@angular/forms.es5.js");
var http_1 = __webpack_require__("../../../common/@angular/common/http.es5.js");
var safe_url_pipe_1 = __webpack_require__("../../../../../src/app/shared/pipes/safe-url.pipe.ts");
var prop_multi_select_component_1 = __webpack_require__("../../../../../src/app/shared/components/prop-multi-select/prop-multi-select.component.ts");
var ng_bootstrap_1 = __webpack_require__("../../../../@ng-bootstrap/ng-bootstrap/index.js");
var angular_2_dropdown_multiselect_1 = __webpack_require__("../../../../angular-2-dropdown-multiselect/index.js");
var ngx_inline_editor_1 = __webpack_require__("../../../../@qontu/ngx-inline-editor/ngx-inline-editor.es5.js");
var SharedModule = (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                http_1.HttpClientModule,
                ng_bootstrap_1.NgbModule,
                angular_2_dropdown_multiselect_1.MultiselectDropdownModule,
                ngx_inline_editor_1.InlineEditorModule
            ],
            declarations: [
                prop_multi_select_component_1.PropMultiSelectComponent,
                safe_url_pipe_1.SafeUrlPipe
            ],
            exports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                http_1.HttpClientModule,
                ng_bootstrap_1.NgbModule,
                prop_multi_select_component_1.PropMultiSelectComponent,
                safe_url_pipe_1.SafeUrlPipe,
                angular_2_dropdown_multiselect_1.MultiselectDropdownModule,
                ngx_inline_editor_1.InlineEditorModule
            ],
            providers: [
                http_1.HttpClient
            ]
        })
    ], SharedModule);
    return SharedModule;
}());
exports.SharedModule = SharedModule;
//# sourceMappingURL=shared.module.js.map

/***/ }),

/***/ "../../../../../src/app/user/auth-guard.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var router_1 = __webpack_require__("../../../router/@angular/router.es5.js");
var user_service_1 = __webpack_require__("../../../../../src/app/user/user.service.ts");
var AuthGuardService = (function () {
    function AuthGuardService(userService, router) {
        this.userService = userService;
        this.router = router;
    }
    AuthGuardService.prototype.canActivate = function (route) {
        var expectedRole = route.data.expectedRole;
        if (this.userService.isLoggedIn()) {
            if (expectedRole) {
                return this.userService.userHasRole(expectedRole);
            }
            return true;
        }
        else {
            this.router.navigate(['login']);
            return false;
        }
    };
    AuthGuardService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [typeof (_a = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" && _a || Object, typeof (_b = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _b || Object])
    ], AuthGuardService);
    return AuthGuardService;
    var _a, _b;
}());
exports.AuthGuardService = AuthGuardService;
//# sourceMappingURL=auth-guard.service.js.map

/***/ }),

/***/ "../../../../../src/app/user/user-change-pwd/user-change-pwd.component.html":
/***/ (function(module, exports) {

module.exports = "<div>\n  <h1>Passwort ändern</h1>\n  <h3>Angemeldet als {{ currentUser.username }} </h3>\n  <form class=\"container-fluid form-default\" name=\"user_changepwd_form\" (keydown.enter)=\"setNewPassword(pwdForm)\" #pwdForm=\"ngForm\">\n    <div class=\"row tile\">\n      <div class=\"col-sm-12 form-box\">\n        <div class=\"form-group\" [ngClass]=\"{'has-error': pwdOldInput.invalid }\">\n          <div class=\"col-md-3\"></div>\n          <label class=\"control-label col-md-2\">Altes Passwort</label>\n          <div class=\"col-md-4\">\n            <input name=\"pwdOld\" class=\"form-control\" type=\"password\" [(ngModel)]=\"pwdOld\" #pwdOldInput=\"ngModel\" required>\n          </div>\n        </div>\n      </div>\n      <div class=\"col-sm-12 form-box\">\n        <div class=\"form-group\" [ngClass]=\"{'has-error': pwdNewInput.invalid || (pwdNew !== pwdNewRepeated) }\">\n          <div class=\"col-md-3\"></div>\n          <label class=\"control-label col-md-2\">Neues Passwort</label>\n          <div class=\"col-md-4\">\n            <input name=\"pwdNew\" class=\"form-control\" type=\"password\" [(ngModel)]=\"pwdNew\" #pwdNewInput=\"ngModel\" minlength=\"6\">\n          </div>\n        </div>\n      </div>\n      <div class=\"col-sm-12 form-box\">\n        <div class=\"form-group\" [ngClass]=\"{'has-error': pwdNewRepeatedInput.invalid || (pwdNew !== pwdNewRepeated) }\">\n          <div class=\"col-md-3\"></div>\n          <label class=\"control-label col-md-2\">Wiederholen</label>\n          <div class=\"col-md-4\">\n            <input name=\"pwdNewRepeated\" class=\"form-control\" type=\"password\" [(ngModel)]=\"pwdNewRepeated\" #pwdNewRepeatedInput=\"ngModel\"\n              minlength=\"6\">\n          </div>\n        </div>\n      </div>\n      <div *ngIf=\"errorMessage\" style=\"color: red; text-align: center\">{{ errorMessage }}</div>\n    </div>\n  </form>\n  <button class=\"btn btn-primary\" type=\"button\" (click)=\"setNewPassword(pwdForm)\">Speichern\n  </button>\n  <button class=\"btn btn-danger\" type=\"button\" (click)=\"goBack()\">Abbrechen</button>\n</div>"

/***/ }),

/***/ "../../../../../src/app/user/user-change-pwd/user-change-pwd.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/user/user-change-pwd/user-change-pwd.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var user_service_1 = __webpack_require__("../../../../../src/app/user/user.service.ts");
var util_service_1 = __webpack_require__("../../../../../src/app/core/util.service.ts");
var UserChangePwdComponent = (function () {
    function UserChangePwdComponent(userService, util) {
        this.userService = userService;
        this.util = util;
        this.formSubmitted = false;
        this.errorMessage = null;
    }
    UserChangePwdComponent.prototype.ngOnInit = function () {
        this.currentUser = this.userService.getCurrentUser();
    };
    UserChangePwdComponent.prototype.setNewPassword = function (pwdForm) {
        var _this = this;
        this.formSubmitted = true;
        this.errorMessage = null;
        this.userService.setNewPassword(this.pwdOld, this.pwdNew)
            .then(function (user) {
            alert('Passwort wurde erfolgreich geändert');
            _this.util.historyBack();
        })
            .catch(function (err) {
            console.log(err);
            _this.errorMessage = err.error;
        });
    };
    UserChangePwdComponent.prototype.goBack = function () {
        this.util.historyBack();
    };
    UserChangePwdComponent = __decorate([
        core_1.Component({
            selector: 'app-user-change-pwd',
            template: __webpack_require__("../../../../../src/app/user/user-change-pwd/user-change-pwd.component.html"),
            styles: [__webpack_require__("../../../../../src/app/user/user-change-pwd/user-change-pwd.component.scss")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" && _a || Object, typeof (_b = typeof util_service_1.UtilService !== "undefined" && util_service_1.UtilService) === "function" && _b || Object])
    ], UserChangePwdComponent);
    return UserChangePwdComponent;
    var _a, _b;
}());
exports.UserChangePwdComponent = UserChangePwdComponent;
//# sourceMappingURL=user-change-pwd.component.js.map

/***/ }),

/***/ "../../../../../src/app/user/user-overview/user-overview.component.html":
/***/ (function(module, exports) {

module.exports = "<div>\n  <h1>Freelancer</h1>\n  <ul>\n    <li>\n      <a routerLink=\"/user/profile\">Profildaten</a>\n    </li>\n    <li>\n      <a routerLink=\"/user/change_pwd\">Passwort ändern</a>\n    </li>\n  </ul>\n</div>"

/***/ }),

/***/ "../../../../../src/app/user/user-overview/user-overview.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/user/user-overview/user-overview.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var UserOverviewComponent = (function () {
    function UserOverviewComponent() {
    }
    UserOverviewComponent.prototype.ngOnInit = function () {
    };
    UserOverviewComponent = __decorate([
        core_1.Component({
            selector: 'app-user-overview',
            template: __webpack_require__("../../../../../src/app/user/user-overview/user-overview.component.html"),
            styles: [__webpack_require__("../../../../../src/app/user/user-overview/user-overview.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], UserOverviewComponent);
    return UserOverviewComponent;
}());
exports.UserOverviewComponent = UserOverviewComponent;
//# sourceMappingURL=user-overview.component.js.map

/***/ }),

/***/ "../../../../../src/app/user/user-profile/user-profile.component.html":
/***/ (function(module, exports) {

module.exports = "<div>\n  <h1>Profil bearbeiten</h1>\n  <p>Die Bearbeitung des eigenen Profils ist noch nicht implementiert!</p>\n</div>"

/***/ }),

/***/ "../../../../../src/app/user/user-profile/user-profile.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/user/user-profile/user-profile.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var UserProfileComponent = (function () {
    function UserProfileComponent() {
    }
    UserProfileComponent.prototype.ngOnInit = function () {
    };
    UserProfileComponent = __decorate([
        core_1.Component({
            selector: 'app-user-profile',
            template: __webpack_require__("../../../../../src/app/user/user-profile/user-profile.component.html"),
            styles: [__webpack_require__("../../../../../src/app/user/user-profile/user-profile.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], UserProfileComponent);
    return UserProfileComponent;
}());
exports.UserProfileComponent = UserProfileComponent;
//# sourceMappingURL=user-profile.component.js.map

/***/ }),

/***/ "../../../../../src/app/user/user-routing.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// app-routing.module.ts
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var router_1 = __webpack_require__("../../../router/@angular/router.es5.js");
var auth_guard_service_1 = __webpack_require__("../../../../../src/app/user/auth-guard.service.ts");
var user_profile_component_1 = __webpack_require__("../../../../../src/app/user/user-profile/user-profile.component.ts");
var user_change_pwd_component_1 = __webpack_require__("../../../../../src/app/user/user-change-pwd/user-change-pwd.component.ts");
var user_overview_component_1 = __webpack_require__("../../../../../src/app/user/user-overview/user-overview.component.ts");
/**
 * Routes used in the app
 */
var ROUTE_CONFIG = [
    {
        path: 'user',
        component: user_overview_component_1.UserOverviewComponent,
        canActivate: [auth_guard_service_1.AuthGuardService]
    },
    {
        path: 'user/profile',
        component: user_profile_component_1.UserProfileComponent,
        canActivate: [auth_guard_service_1.AuthGuardService]
    },
    {
        path: 'user/change_pwd',
        component: user_change_pwd_component_1.UserChangePwdComponent,
        canActivate: [auth_guard_service_1.AuthGuardService]
    }
];
var UserRoutingModule = (function () {
    function UserRoutingModule() {
    }
    UserRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forChild(ROUTE_CONFIG)
            ],
            exports: [router_1.RouterModule]
        })
    ], UserRoutingModule);
    return UserRoutingModule;
}());
exports.UserRoutingModule = UserRoutingModule;
//# sourceMappingURL=user-routing.module.js.map

/***/ }),

/***/ "../../../../../src/app/user/user.model.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Object to hold all information the application can know about a user.
 */
var User = (function () {
    function User() {
        this.username = null;
        this.email = null;
        this.roles = [];
    }
    User.prototype.clearData = function () {
        this.id = null;
        this.username = null;
        this.roles = [];
    };
    User.prototype.hasRole = function (role) {
        return this.roles.indexOf(role) >= 0;
    };
    return User;
}());
exports.User = User;
//# sourceMappingURL=user.model.js.map

/***/ }),

/***/ "../../../../../src/app/user/user.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var user_service_1 = __webpack_require__("../../../../../src/app/user/user.service.ts");
var auth_guard_service_1 = __webpack_require__("../../../../../src/app/user/auth-guard.service.ts");
var user_profile_component_1 = __webpack_require__("../../../../../src/app/user/user-profile/user-profile.component.ts");
var user_change_pwd_component_1 = __webpack_require__("../../../../../src/app/user/user-change-pwd/user-change-pwd.component.ts");
var shared_module_1 = __webpack_require__("../../../../../src/app/shared/shared.module.ts");
var user_overview_component_1 = __webpack_require__("../../../../../src/app/user/user-overview/user-overview.component.ts");
var user_routing_module_1 = __webpack_require__("../../../../../src/app/user/user-routing.module.ts");
var UserModule = (function () {
    function UserModule() {
    }
    UserModule = __decorate([
        core_1.NgModule({
            imports: [
                shared_module_1.SharedModule,
                user_routing_module_1.UserRoutingModule
            ],
            exports: [],
            declarations: [user_profile_component_1.UserProfileComponent, user_change_pwd_component_1.UserChangePwdComponent, user_overview_component_1.UserOverviewComponent],
            providers: [
                user_service_1.UserService,
                auth_guard_service_1.AuthGuardService
            ]
        })
    ], UserModule);
    return UserModule;
}());
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map

/***/ }),

/***/ "../../../../../src/app/user/user.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var http_1 = __webpack_require__("../../../common/@angular/common/http.es5.js");
var of_1 = __webpack_require__("../../../../rxjs/_esm5/observable/of.js");
var user_model_1 = __webpack_require__("../../../../../src/app/user/user.model.ts");
var util_service_1 = __webpack_require__("../../../../../src/app/core/util.service.ts");
var UserService = (function () {
    function UserService(http, util) {
        this.http = http;
        this.util = util;
        this.user = new user_model_1.User();
        this.loginError = {
            message: ''
        };
        /*
        this.user$ = of(this.user);
        this.user$.subscribe(() => {
          if (!this.isLoggedIn()) {
            this.util.goTo('/login');
          }
        })
        */
    }
    UserService.prototype.getCurrentUser = function () {
        return this.user;
    };
    UserService.prototype.isLoggedIn = function () {
        return typeof this.user.id !== 'undefined' && typeof this.user.username !== 'undefined' && this.user.id !== null && this.user.username !== null;
    };
    UserService.prototype.getLoginError = function () {
        return of_1.of(this.loginError);
    };
    UserService.prototype.userHasRole = function (role) {
        return this.user.hasRole(role);
    };
    /**
     * Validate credentials with server and receive webtoken
     */
    UserService.prototype.loginUser = function (credentials, resolve, reject) {
        var _this = this;
        var formData = new FormData();
        formData.append('_username', credentials.username);
        formData.append('_password', credentials.password);
        formData.append('_remember_me', 'true');
        // Set up post request
        var req = this.http.post('/login_check', formData);
        // Execute post request and subscribe to response
        req.subscribe(function (data) {
            _this.user.clearData();
            _this.user.id = data.id;
            _this.user.username = data.username;
            _this.user.roles = data.roles;
            _this.loginError.message = '';
            // Navigate to main page
            _this.util.goTo('/home');
            console.log(data);
            resolve && resolve(data);
        }, function (error) {
            _this.user.clearData();
            if (error.status === 401) {
                _this.loginError.message = 'Kombination aus Benutzername und Passwort ist unbekannt';
            }
            reject && reject(error);
        });
        return;
    };
    /**
     * Logging out clears the user and redirects to main page.
     *
     */
    UserService.prototype.logoutUser = function (resolve, reject) {
        var _this = this;
        // Set up request
        var req = this.http.get('/logout');
        // Execute post request and subscribe to response
        req.subscribe(function (data) {
            _this.user.clearData();
            // Navigate to main page
            _this.util.goTo('/logout');
            resolve && resolve(data);
        }, function (error) {
            alert('Es ist ein Fehler beim Logout aufgetreten');
            reject && reject(error);
        });
    };
    /**
     * Tests the server firewall for the user logged in with this
     * session and sets the user if it is logged in and returned.
     *
     * @param resolve
     * @param reject
     */
    UserService.prototype.testServerForLoggedInUser = function (resolve, reject) {
        var _this = this;
        // Set up post request
        var req = this.http.get('/get_logged_in_user');
        // Execute post request and subscribe to response
        req.subscribe(function (data) {
            _this.user.id = data.id;
            _this.user.username = data.username;
            _this.user.roles = data.roles;
            resolve && resolve(data);
        }, function (error) {
            alert('Es ist ein Fehler beim automatischen Login aufgetreten');
            reject && reject(error);
        });
    };
    UserService.prototype.setNewPassword = function (oldPassword, newPassword) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // Set up post request
            var req = _this.http.post('/user/change_pwd', {
                pwd_old: oldPassword,
                pwd_new: newPassword
            });
            // Execute post request and subscribe to response
            req.subscribe(function (data) {
                _this.user.id = data.id;
                _this.user.username = data.username;
                _this.user.roles = data.roles;
                resolve && resolve(_this.user);
            }, function (error) {
                reject && reject(error);
            });
        });
    };
    UserService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [typeof (_a = typeof http_1.HttpClient !== "undefined" && http_1.HttpClient) === "function" && _a || Object, typeof (_b = typeof util_service_1.UtilService !== "undefined" && util_service_1.UtilService) === "function" && _b || Object])
    ], UserService);
    return UserService;
    var _a, _b;
}());
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var platform_browser_dynamic_1 = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
var app_module_1 = __webpack_require__("../../../../../src/app/app.module.ts");
var environment_1 = __webpack_require__("../../../../../src/environments/environment.ts");
if (environment_1.environment.production) {
    core_1.enableProdMode();
}
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule)
    .catch(function (err) { return console.log(err); });
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map