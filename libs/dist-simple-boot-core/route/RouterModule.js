"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouterModule = void 0;
var RouterModule = (function () {
    function RouterModule(simstanceManager, router, module, routerChains) {
        if (routerChains === void 0) { routerChains = []; }
        this.simstanceManager = simstanceManager;
        this.router = router;
        this.module = module;
        this.routerChains = routerChains;
    }
    RouterModule.prototype.getModuleInstance = function () {
        return this.simstanceManager.getOrNewSim(this.module);
    };
    Object.defineProperty(RouterModule.prototype, "lastRouteChain", {
        get: function () {
            return this.routerChains[this.routerChains.length - 1];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RouterModule.prototype, "lastRouteChainValue", {
        get: function () {
            return this.lastRouteChain.value;
        },
        enumerable: false,
        configurable: true
    });
    RouterModule.prototype.hasActivateInLastRoute = function (obj) {
        var _a;
        return ((_a = this.lastRouteChainValue) === null || _a === void 0 ? void 0 : _a.hasActivate(obj)) === true;
    };
    Object.defineProperty(RouterModule.prototype, "queryParams", {
        get: function () {
            if (this.intent) {
                return this.intent.queryParams;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RouterModule.prototype, "queryParamsAfterDecodeURI", {
        get: function () {
            if (this.intent) {
                return this.intent.queryParamsAfterDecodeURI;
            }
        },
        enumerable: false,
        configurable: true
    });
    return RouterModule;
}());
exports.RouterModule = RouterModule;
//# sourceMappingURL=RouterModule.js.map