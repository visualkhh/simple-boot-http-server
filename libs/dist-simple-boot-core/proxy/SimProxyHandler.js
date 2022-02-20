"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimProxyHandler = void 0;
var AOPDecorator_1 = require("../decorators/aop/AOPDecorator");
var ObjectUtils_1 = require("../utils/object/ObjectUtils");
var ExceptionDecorator_1 = require("../decorators/exception/ExceptionDecorator");
var Inject_1 = require("../decorators/inject/Inject");
var SimProxyHandler = (function () {
    function SimProxyHandler(simstanceManager, simOption) {
        this.simstanceManager = simstanceManager;
        this.simOption = simOption;
    }
    SimProxyHandler.prototype.get = function (target, name) {
        if (name === '_SimpleBoot_simstanceManager') {
            return this.simstanceManager;
        }
        else if (name === '_SimpleBoot_simOption') {
            return this.simOption;
        }
        else {
            return target[name];
        }
    };
    SimProxyHandler.prototype.set = function (obj, prop, value, receiver) {
        var _a;
        value = (_a = this.simstanceManager) === null || _a === void 0 ? void 0 : _a.proxy(value);
        obj[prop] = value;
        return true;
    };
    SimProxyHandler.prototype.apply = function (target, thisArg, argumentsList) {
        var _a, _b;
        var r;
        try {
            this.aopBefore(thisArg, target);
            r = target.apply(thisArg, argumentsList);
            this.aopAfter(thisArg, target);
        }
        catch (e) {
            var otherStorage_1 = new Map();
            otherStorage_1.set(e.constructor, e);
            var situationTypeContainer = new Inject_1.SituationTypeContainer({ situationType: ExceptionDecorator_1.ExceptionHandlerSituationType.ERROR_OBJECT, data: e });
            otherStorage_1.set(Inject_1.SituationTypeContainer, situationTypeContainer);
            (_a = argumentsList) === null || _a === void 0 ? void 0 : _a.forEach(function (it) {
                otherStorage_1.set(e.constructor, e);
            });
            var inHandler = (0, ExceptionDecorator_1.targetExceptionHandler)(thisArg, e, [target]);
            if (inHandler) {
                this.simstanceManager.executeBindParameterSim({
                    target: thisArg,
                    targetKey: inHandler.propertyKey
                }, otherStorage_1);
            }
            else {
                for (var i = 0; i < this.simOption.advice.length; i++) {
                    var sim = (_b = this.simstanceManager) === null || _b === void 0 ? void 0 : _b.getOrNewSim(this.simOption.advice[i]);
                    var inHandler_1 = (0, ExceptionDecorator_1.targetExceptionHandler)(sim, e);
                    if (inHandler_1) {
                        this.simstanceManager.executeBindParameterSim({
                            target: sim,
                            targetKey: inHandler_1.propertyKey
                        }, otherStorage_1);
                        break;
                    }
                }
            }
            console.error(e);
        }
        return r;
    };
    SimProxyHandler.prototype.aopBefore = function (obj, protoType) {
        var _a;
        var propertyName = ObjectUtils_1.ObjectUtils.getPrototypeName(obj, protoType);
        if (propertyName) {
            (0, AOPDecorator_1.getProtoBefores)(obj, propertyName).forEach(function (it) {
                it.call(obj, protoType, propertyName);
            });
            for (var i = 0; i < this.simOption.advice.length; i++) {
                var sim = (_a = this.simstanceManager) === null || _a === void 0 ? void 0 : _a.getOrNewSim(this.simOption.advice[i]);
                var protoBefores = (0, AOPDecorator_1.getProtoBefores)(sim, propertyName, Object.getPrototypeOf(obj));
                protoBefores.forEach(function (it) {
                    it.call(obj, protoType, propertyName);
                });
            }
        }
    };
    SimProxyHandler.prototype.aopAfter = function (obj, protoType) {
        var _a;
        var propertyName = ObjectUtils_1.ObjectUtils.getPrototypeName(obj, protoType);
        if (propertyName) {
            (0, AOPDecorator_1.getProtoAfters)(obj, propertyName).forEach(function (it) {
                it.call(obj, protoType, propertyName);
            });
            for (var i = 0; i < this.simOption.advice.length; i++) {
                var sim = (_a = this.simstanceManager) === null || _a === void 0 ? void 0 : _a.getOrNewSim(this.simOption.advice[i]);
                var protoBefores = (0, AOPDecorator_1.getProtoAfters)(sim, propertyName, Object.getPrototypeOf(obj));
                protoBefores.forEach(function (it) {
                    it.call(obj, protoType, propertyName);
                });
            }
        }
    };
    SimProxyHandler.prototype.has = function (target, key) {
        if (key === 'isProxy') {
            return true;
        }
        return key in target;
    };
    return SimProxyHandler;
}());
exports.SimProxyHandler = SimProxyHandler;
//# sourceMappingURL=SimProxyHandler.js.map