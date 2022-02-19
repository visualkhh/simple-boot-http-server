"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOnRoute = exports.OnRoute = exports.OnRouteMetadataKey = exports.onRoutes = void 0;
var ReflectUtils_1 = require("../../utils/reflect/ReflectUtils");
exports.onRoutes = new Map();
exports.OnRouteMetadataKey = Symbol('OnRoute');
var OnRoute = function (config) {
    return function (target, propertyKey, descriptor) {
        var _a;
        if (null != target && undefined != target && typeof target === 'object') {
            target = target.constructor;
        }
        if (!exports.onRoutes.get(target)) {
            exports.onRoutes.set(target, []);
        }
        (_a = exports.onRoutes.get(target)) === null || _a === void 0 ? void 0 : _a.push(propertyKey);
        ReflectUtils_1.ReflectUtils.defineMetadata(exports.OnRouteMetadataKey, config, target, propertyKey);
        var metadata = ReflectUtils_1.ReflectUtils.getMetadata(exports.OnRouteMetadataKey, target, propertyKey);
    };
};
exports.OnRoute = OnRoute;
var getOnRoute = function (target, propertyKey) {
    if (null != target && undefined != target && typeof target === 'object') {
        target = target.constructor;
    }
    return ReflectUtils_1.ReflectUtils.getMetadata(exports.OnRouteMetadataKey, target, propertyKey);
};
exports.getOnRoute = getOnRoute;
//# sourceMappingURL=OnRoute.js.map