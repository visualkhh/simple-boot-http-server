"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleApplication = void 0;
var SimstanceManager_1 = require("./simstance/SimstanceManager");
var SimOption_1 = require("./SimOption");
var IntentManager_1 = require("./intent/IntentManager");
var RouterManager_1 = require("./route/RouterManager");
require("reflect-metadata");
var SimpleApplication = (function () {
    function SimpleApplication(rootRouter, option) {
        if (option === void 0) { option = new SimOption_1.SimOption(); }
        this.rootRouter = rootRouter;
        this.option = option;
        this.simstanceManager = new SimstanceManager_1.SimstanceManager(option);
        this.simstanceManager.storage.set(SimpleApplication, this);
        this.intentManager = new IntentManager_1.IntentManager(this.simstanceManager);
        this.routerManager = new RouterManager_1.RouterManager(this.simstanceManager, this.rootRouter);
        this.simstanceManager.storage.set(SimstanceManager_1.SimstanceManager, this.simstanceManager);
        this.simstanceManager.storage.set(IntentManager_1.IntentManager, this.intentManager);
        this.simstanceManager.storage.set(RouterManager_1.RouterManager, this.routerManager);
    }
    SimpleApplication.prototype.run = function (otherInstanceSim) {
        this.simstanceManager.run(otherInstanceSim);
    };
    SimpleApplication.prototype.publishIntent = function (i) {
        return this.intentManager.publish(i);
    };
    SimpleApplication.prototype.routing = function (i) {
        return this.routerManager.routing(i);
    };
    return SimpleApplication;
}());
exports.SimpleApplication = SimpleApplication;
//# sourceMappingURL=SimpleApplication.js.map