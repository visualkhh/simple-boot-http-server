"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.targetExceptionHandler = exports.targetExceptionHandlers = exports.getExceptionHandlers = exports.getExceptionHandler = exports.ExceptionHandler = exports.ExceptionHandlerSituationType = void 0;
require("reflect-metadata");
var ReflectUtils_1 = require("../../utils/reflect/ReflectUtils");
var ObjectUtils_1 = require("../../utils/object/ObjectUtils");
var ExceptionHandlerSituationType;
(function (ExceptionHandlerSituationType) {
    ExceptionHandlerSituationType["ERROR_OBJECT"] = "SIMPLE_BOOT_CORE://ExceptionHandler/ERROR_OBJECT";
})(ExceptionHandlerSituationType = exports.ExceptionHandlerSituationType || (exports.ExceptionHandlerSituationType = {}));
var ExceptionHandlerMetadataKey = Symbol('ExceptionHandler');
var ExceptionHandler = function (config) {
    if (config === void 0) { config = {}; }
    return function (target, propertyKey, descriptor) {
        var _a;
        var saveMappingConfigs = ((_a = ReflectUtils_1.ReflectUtils.getMetadata(ExceptionHandlerMetadataKey, target.constructor)) !== null && _a !== void 0 ? _a : []);
        var method = target[propertyKey];
        saveMappingConfigs.push({ propertyKey: propertyKey, method: method, config: config });
        ReflectUtils_1.ReflectUtils.defineMetadata(ExceptionHandlerMetadataKey, saveMappingConfigs, target.constructor);
        ReflectUtils_1.ReflectUtils.defineMetadata(ExceptionHandlerMetadataKey, config, target, propertyKey);
    };
};
exports.ExceptionHandler = ExceptionHandler;
var getExceptionHandler = function (target, propertyKey) {
    return ReflectUtils_1.ReflectUtils.getMetadata(ExceptionHandlerMetadataKey, target, propertyKey);
};
exports.getExceptionHandler = getExceptionHandler;
var getExceptionHandlers = function (target) {
    if (target !== null && undefined !== target && typeof target === 'object') {
        target = target.constructor;
    }
    return ReflectUtils_1.ReflectUtils.getMetadata(ExceptionHandlerMetadataKey, target);
};
exports.getExceptionHandlers = getExceptionHandlers;
var targetExceptionHandlers = function (target, error) {
    var _a;
    var exceptionHandlers = (0, exports.getExceptionHandlers)(target);
    var emptyTargets = exceptionHandlers === null || exceptionHandlers === void 0 ? void 0 : exceptionHandlers.filter(function (it) { return it.config.type === undefined; });
    var targets = exceptionHandlers === null || exceptionHandlers === void 0 ? void 0 : exceptionHandlers.filter(function (it) { return ObjectUtils_1.ObjectUtils.isPrototypeOfTarget(it.config.type, error); });
    var targetSorts = targets === null || targets === void 0 ? void 0 : targets.sort(function (a, b) {
        var aPrototypeOfDepth = ObjectUtils_1.ObjectUtils.getPrototypeOfDepth(error, a.config.type);
        var bPrototypeOfDepth = ObjectUtils_1.ObjectUtils.getPrototypeOfDepth(error, b.config.type);
        return aPrototypeOfDepth.length - bPrototypeOfDepth.length;
    });
    return (_a = (targetSorts !== null && targetSorts !== void 0 ? targetSorts : [])).concat.apply(_a, emptyTargets !== null && emptyTargets !== void 0 ? emptyTargets : []);
};
exports.targetExceptionHandlers = targetExceptionHandlers;
var targetExceptionHandler = function (target, error, excludeMethods) {
    if (excludeMethods === void 0) { excludeMethods = []; }
    var exceptionHandlers = (0, exports.targetExceptionHandlers)(target, error);
    exceptionHandlers = exceptionHandlers === null || exceptionHandlers === void 0 ? void 0 : exceptionHandlers.filter(function (it) { return !excludeMethods.includes(it.method); });
    if (exceptionHandlers && exceptionHandlers.length > 0) {
        return exceptionHandlers[0];
    }
    else {
        return undefined;
    }
};
exports.targetExceptionHandler = targetExceptionHandler;
//# sourceMappingURL=ExceptionDecorator.js.map