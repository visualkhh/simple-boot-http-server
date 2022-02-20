"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInjection = exports.Injection = void 0;
var ReflectUtils_1 = require("../../utils/reflect/ReflectUtils");
var InjectionMetadataKey = Symbol('Injection');
var Injection = function (config) {
    return function (target, propertyKey, descriptor) {
        ReflectUtils_1.ReflectUtils.defineMetadata(InjectionMetadataKey, config, target, propertyKey);
    };
};
exports.Injection = Injection;
var getInjection = function (target, propertyKey) {
    return ReflectUtils_1.ReflectUtils.getMetadata(InjectionMetadataKey, target, propertyKey);
};
exports.getInjection = getInjection;
//# sourceMappingURL=Injection.js.map