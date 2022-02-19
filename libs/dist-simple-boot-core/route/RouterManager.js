"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouterManager = void 0;
var Intent_1 = require("../intent/Intent");
var RouterModule_1 = require("./RouterModule");
var SimDecorator_1 = require("../decorators/SimDecorator");
var SimAtomic_1 = require("../simstance/SimAtomic");
var OnRoute_1 = require("../decorators/route/OnRoute");
var RouterManager = (function () {
    function RouterManager(simstanceManager, rootRouter) {
        this.simstanceManager = simstanceManager;
        this.rootRouter = rootRouter;
    }
    RouterManager.prototype.routingMap = function (prefix, router) {
        var _this = this;
        var _a;
        if (prefix === void 0) { prefix = ''; }
        if (router === void 0) { router = this.rootRouter; }
        var map = {};
        var routerAtomic = new SimAtomic_1.SimAtomic(router, this.simstanceManager);
        var routerData = routerAtomic.getConfig(SimDecorator_1.RouterMetadataKey);
        if (routerData) {
            var currentPrefix_1 = prefix + routerData.path;
            Object.entries(routerData.route).forEach(function (_a) {
                var key = _a[0], value = _a[1];
                map[currentPrefix_1 + key] = value;
            });
            (_a = routerData.routers) === null || _a === void 0 ? void 0 : _a.forEach(function (it) {
                Object.assign(map, _this.routingMap(currentPrefix_1, it));
            });
        }
        return map;
    };
    RouterManager.prototype.routing = function (intent) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
        return __awaiter(this, void 0, void 0, function () {
            var routers, routerAtomic, rootRouterData, rootRouter, executeModule, i, current, next, value, routerChain, otherStorage, _loop_1, this_1, _i, _t, _u, key, value, i, current, next, value;
            return __generator(this, function (_v) {
                switch (_v.label) {
                    case 0:
                        routers = [];
                        routerAtomic = new SimAtomic_1.SimAtomic(this.rootRouter, this.simstanceManager);
                        rootRouterData = routerAtomic.getConfig(SimDecorator_1.RouterMetadataKey);
                        rootRouter = routerAtomic.value;
                        executeModule = this.getExecuteModule(routerAtomic, intent, routers);
                        if (!(executeModule === null || executeModule === void 0 ? void 0 : executeModule.router)) return [3, 13];
                        executeModule.routerChains = routers;
                        if (!(((_a = executeModule.routerChains) === null || _a === void 0 ? void 0 : _a.length) && ((_b = executeModule.routerChains) === null || _b === void 0 ? void 0 : _b.length) > 0)) return [3, 4];
                        i = 0;
                        _v.label = 1;
                    case 1:
                        if (!(i < executeModule.routerChains.length)) return [3, 4];
                        current = executeModule.routerChains[i];
                        next = executeModule.routerChains[i + 1];
                        value = current.value;
                        if (!next) return [3, 3];
                        return [4, ((_c = value === null || value === void 0 ? void 0 : value.canActivate) === null || _c === void 0 ? void 0 : _c.call(value, intent, (_d = next === null || next === void 0 ? void 0 : next.value) !== null && _d !== void 0 ? _d : null))];
                    case 2:
                        _v.sent();
                        _v.label = 3;
                    case 3:
                        i++;
                        return [3, 1];
                    case 4:
                        this.activeRouterModule = executeModule;
                        if (!!(executeModule === null || executeModule === void 0 ? void 0 : executeModule.module)) return [3, 6];
                        routerChain = executeModule.routerChains[executeModule.routerChains.length - 1];
                        return [4, ((_f = (_e = routerChain === null || routerChain === void 0 ? void 0 : routerChain.value) === null || _e === void 0 ? void 0 : _e.canActivate) === null || _f === void 0 ? void 0 : _f.call(_e, intent, executeModule.getModuleInstance()))];
                    case 5:
                        _v.sent();
                        return [3, 8];
                    case 6: return [4, ((_j = (_h = (_g = executeModule.router) === null || _g === void 0 ? void 0 : _g.value) === null || _h === void 0 ? void 0 : _h.canActivate) === null || _j === void 0 ? void 0 : _j.call(_h, intent, executeModule.getModuleInstance()))];
                    case 7:
                        _v.sent();
                        _v.label = 8;
                    case 8:
                        this.activeRouterModule = executeModule;
                        otherStorage = new Map();
                        otherStorage.set(Intent_1.Intent, intent);
                        otherStorage.set(RouterModule_1.RouterModule, executeModule);
                        _loop_1 = function (key, value) {
                            var sim_1, _w, value_1, v, onRouteConfig, r, error_1;
                            return __generator(this, function (_x) {
                                switch (_x.label) {
                                    case 0:
                                        _x.trys.push([0, 5, , 6]);
                                        sim_1 = this_1.simstanceManager.findFirstSim({ type: key });
                                        _w = 0, value_1 = value;
                                        _x.label = 1;
                                    case 1:
                                        if (!(_w < value_1.length)) return [3, 4];
                                        v = value_1[_w];
                                        onRouteConfig = (0, OnRoute_1.getOnRoute)(key, v);
                                        r = undefined;
                                        if (!(onRouteConfig === null || onRouteConfig === void 0 ? void 0 : onRouteConfig.isActivateMe)) {
                                            r = (_l = sim_1 === null || sim_1 === void 0 ? void 0 : (_k = sim_1.value)[v]) === null || _l === void 0 ? void 0 : _l.call.apply(_l, __spreadArray([_k], this_1.simstanceManager.getParameterSim({ target: sim_1 === null || sim_1 === void 0 ? void 0 : sim_1.value, targetKey: v }, otherStorage), false));
                                        }
                                        else if ((_o = (_m = this_1.activeRouterModule) === null || _m === void 0 ? void 0 : _m.routerChains) === null || _o === void 0 ? void 0 : _o.some(function (it) { var _a, _b; return (_b = (_a = it.value) === null || _a === void 0 ? void 0 : _a.hasActivate) === null || _b === void 0 ? void 0 : _b.call(_a, sim_1 === null || sim_1 === void 0 ? void 0 : sim_1.value); })) {
                                            r = (_q = sim_1 === null || sim_1 === void 0 ? void 0 : (_p = sim_1.value)[v]) === null || _q === void 0 ? void 0 : _q.call.apply(_q, __spreadArray([_p], this_1.simstanceManager.getParameterSim({ target: sim_1 === null || sim_1 === void 0 ? void 0 : sim_1.value, targetKey: v }, otherStorage), false));
                                        }
                                        if (!(r instanceof Promise)) return [3, 3];
                                        return [4, r];
                                    case 2:
                                        _x.sent();
                                        _x.label = 3;
                                    case 3:
                                        _w++;
                                        return [3, 1];
                                    case 4: return [3, 6];
                                    case 5:
                                        error_1 = _x.sent();
                                        return [3, 6];
                                    case 6: return [2];
                                }
                            });
                        };
                        this_1 = this;
                        _i = 0, _t = Array.from(OnRoute_1.onRoutes);
                        _v.label = 9;
                    case 9:
                        if (!(_i < _t.length)) return [3, 12];
                        _u = _t[_i], key = _u[0], value = _u[1];
                        return [5, _loop_1(key, value)];
                    case 10:
                        _v.sent();
                        _v.label = 11;
                    case 11:
                        _i++;
                        return [3, 9];
                    case 12: return [2, this.activeRouterModule];
                    case 13:
                        if (!(routers.length && routers.length > 0)) return [3, 17];
                        i = 0;
                        _v.label = 14;
                    case 14:
                        if (!(i < routers.length)) return [3, 17];
                        current = routers[i];
                        next = routers[i + 1];
                        value = current.value;
                        return [4, ((_r = value === null || value === void 0 ? void 0 : value.canActivate) === null || _r === void 0 ? void 0 : _r.call(value, intent, (_s = next === null || next === void 0 ? void 0 : next.value) !== null && _s !== void 0 ? _s : null))];
                    case 15:
                        _v.sent();
                        _v.label = 16;
                    case 16:
                        i++;
                        return [3, 14];
                    case 17: return [2, this.activeRouterModule = new RouterModule_1.RouterModule(this.simstanceManager, rootRouter, undefined, routers)];
                }
            });
        });
    };
    RouterManager.prototype.getExecuteModule = function (router, intent, parentRouters) {
        var path = intent.pathname;
        var routerConfig = router.getConfig(SimDecorator_1.RouterMetadataKey);
        if (routerConfig) {
            var routerStrings = parentRouters.slice(1).map(function (it) { var _a; return ((_a = it.getConfig(SimDecorator_1.RouterMetadataKey)) === null || _a === void 0 ? void 0 : _a.path) || ''; });
            var isRoot = this.isRootUrl(routerConfig.path, routerStrings, path);
            if (isRoot) {
                parentRouters.push(router);
                var module_1 = this.findRouting(router, routerConfig, routerStrings, intent);
                if (module_1 === null || module_1 === void 0 ? void 0 : module_1.module) {
                    module_1.intent = intent;
                    return module_1;
                }
                else if (routerConfig.routers && routerConfig.routers.length > 0) {
                    for (var _i = 0, _a = routerConfig.routers; _i < _a.length; _i++) {
                        var child = _a[_i];
                        var routerAtomic = new SimAtomic_1.SimAtomic(child, this.simstanceManager);
                        var rootRouterData = routerAtomic.getConfig(SimDecorator_1.RouterMetadataKey);
                        var router_1 = routerAtomic.value;
                        var executeModule = this.getExecuteModule(routerAtomic, intent, parentRouters);
                        if (router_1 && executeModule) {
                            return executeModule;
                        }
                    }
                }
            }
        }
    };
    RouterManager.prototype.isRootUrl = function (path, parentRoots, url) {
        return url.startsWith(parentRoots.join('') + (path || ''));
    };
    RouterManager.prototype.findRouting = function (router, routerData, parentRoots, intent) {
        var urlRoot = parentRoots.join('') + routerData.path;
        var regex = new RegExp('^' + urlRoot, 'i');
        for (var _i = 0, _a = Object.keys(routerData.route).filter(function (it) { return !it.startsWith('_'); }); _i < _a.length; _i++) {
            var it_1 = _a[_i];
            var pathnameData = intent.getPathnameData(urlRoot + it_1);
            if (pathnameData) {
                var _b = this.findRouteProperty(routerData.route, it_1), child = _b.child, data = _b.data;
                var rm = new RouterModule_1.RouterModule(this.simstanceManager, router, child);
                rm.data = data;
                rm.pathData = pathnameData;
                return rm;
            }
        }
    };
    RouterManager.prototype.findRouteProperty = function (route, propertyName) {
        var child;
        var data;
        var routeElement = route[propertyName];
        if (typeof routeElement === 'function') {
            child = routeElement;
        }
        else if (typeof routeElement === 'string') {
            return this.findRouteProperty(route, routeElement);
        }
        else {
            child = routeElement === null || routeElement === void 0 ? void 0 : routeElement[0];
            data = routeElement === null || routeElement === void 0 ? void 0 : routeElement[1];
        }
        return {
            child: child,
            data: data
        };
    };
    return RouterManager;
}());
exports.RouterManager = RouterManager;
//# sourceMappingURL=RouterManager.js.map