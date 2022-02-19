"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInject = exports.Inject = exports.SituationTypeContainers = exports.SituationTypeContainer = exports.InjectSituationType = void 0;
require("reflect-metadata");
var ReflectUtils_1 = require("../../utils/reflect/ReflectUtils");
var InjectSituationType;
(function (InjectSituationType) {
    InjectSituationType["INDEX"] = "SIMPLE_BOOT_CORE://Inject/INDEX";
})(InjectSituationType = exports.InjectSituationType || (exports.InjectSituationType = {}));
var SituationTypeContainer = (function () {
    function SituationTypeContainer(_a) {
        var situationType = _a.situationType, data = _a.data, index = _a.index;
        this.situationType = situationType;
        this.data = data;
        this.index = index;
    }
    return SituationTypeContainer;
}());
exports.SituationTypeContainer = SituationTypeContainer;
var SituationTypeContainers = (function () {
    function SituationTypeContainers() {
        this.containers = [];
    }
    SituationTypeContainers.prototype.push = function () {
        var _a;
        var item = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            item[_i] = arguments[_i];
        }
        (_a = this.containers).push.apply(_a, item);
    };
    Object.defineProperty(SituationTypeContainers.prototype, "length", {
        get: function () {
            return this.containers.length;
        },
        enumerable: false,
        configurable: true
    });
    SituationTypeContainers.prototype.find = function (predicate, thisArg) {
        return this.containers.find(predicate);
    };
    return SituationTypeContainers;
}());
exports.SituationTypeContainers = SituationTypeContainers;
var InjectMetadataKey = Symbol('Inject');
var Inject = function (config) {
    if (config === void 0) { config = {}; }
    return function (target, propertyKey, parameterIndex) {
        if (propertyKey && typeof target === 'object') {
            target = target.constructor;
            var existingInjectdParameters = (Reflect.getOwnMetadata(InjectMetadataKey, target, propertyKey) || []);
            existingInjectdParameters.push({ index: parameterIndex, config: config, propertyKey: propertyKey });
            ReflectUtils_1.ReflectUtils.defineMetadata(InjectMetadataKey, existingInjectdParameters, target, propertyKey);
        }
        else if (!propertyKey || typeof target === 'function') {
            var existingInjectdParameters = (ReflectUtils_1.ReflectUtils.getMetadata(InjectMetadataKey, target) || []);
            existingInjectdParameters.push({ index: parameterIndex, config: config });
            ReflectUtils_1.ReflectUtils.defineMetadata(InjectMetadataKey, existingInjectdParameters, target);
        }
    };
};
exports.Inject = Inject;
var getInject = function (target, propertyKey) {
    if (null != target && undefined != target && typeof target === 'object') {
        target = target.constructor;
    }
    if (propertyKey) {
        var parameters = Reflect.getOwnMetadata(InjectMetadataKey, target, propertyKey);
        return parameters;
    }
    else {
        return ReflectUtils_1.ReflectUtils.getMetadata(InjectMetadataKey, target);
    }
};
exports.getInject = getInject;
//# sourceMappingURL=Inject.js.map