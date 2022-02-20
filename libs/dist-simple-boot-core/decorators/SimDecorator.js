"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostConstruct = exports.PostConstruct = exports.getRouter = exports.Router = exports.RouterMetadataKey = exports.getSim = exports.Sim = exports.SimMetadataKey = exports.sims = void 0;
require("reflect-metadata");
var ReflectUtils_1 = require("../utils/reflect/ReflectUtils");
exports.sims = new Set();
exports.SimMetadataKey = Symbol('Sim');
var Sim = function (config) {
    if (config === void 0) { config = {}; }
    return function (target) {
        ReflectUtils_1.ReflectUtils.defineMetadata(exports.SimMetadataKey, config, target);
        exports.sims.add(target);
    };
};
exports.Sim = Sim;
var getSim = function (target) {
    if (null != target && undefined != target && typeof target === 'object') {
        target = target.constructor;
    }
    try {
        return ReflectUtils_1.ReflectUtils.getMetadata(exports.SimMetadataKey, target);
    }
    catch (e) { }
};
exports.getSim = getSim;
exports.RouterMetadataKey = Symbol('Router');
var Router = function (config) {
    return function (target) {
        ReflectUtils_1.ReflectUtils.defineMetadata(exports.RouterMetadataKey, config, target);
    };
};
exports.Router = Router;
var getRouter = function (target) {
    if (null != target && undefined != target && typeof target === 'object') {
        target = target.constructor;
    }
    try {
        return ReflectUtils_1.ReflectUtils.getMetadata(exports.RouterMetadataKey, target);
    }
    catch (e) { }
};
exports.getRouter = getRouter;
var PostConstructMetadataKey = Symbol('PostConstruct');
var PostConstruct = function (target, propertyKey, descriptor) {
    ReflectUtils_1.ReflectUtils.defineMetadata(PostConstructMetadataKey, PostConstructMetadataKey, target, propertyKey);
};
exports.PostConstruct = PostConstruct;
var getPostConstruct = function (target, propertyKey) {
    return ReflectUtils_1.ReflectUtils.getMetadata(PostConstructMetadataKey, target, propertyKey);
};
exports.getPostConstruct = getPostConstruct;
//# sourceMappingURL=SimDecorator.js.map