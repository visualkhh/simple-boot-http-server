"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInjectable = exports.Injectable = void 0;
require("reflect-metadata");
var ReflectUtils_1 = require("../../utils/reflect/ReflectUtils");
var InjectorbleMetadataKey = Symbol('Injectable');
var Injectable = function (config) {
    return function (target) {
        ReflectUtils_1.ReflectUtils.defineMetadata(InjectorbleMetadataKey, config, target);
    };
};
exports.Injectable = Injectable;
var getInjectable = function (target) {
    if (null != target && undefined != target && typeof target === 'object') {
        target = target.constructor;
    }
    try {
        return ReflectUtils_1.ReflectUtils.getMetadata(InjectorbleMetadataKey, target);
    }
    catch (e) {
    }
};
exports.getInjectable = getInjectable;
//# sourceMappingURL=Injectable.js.map