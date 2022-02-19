"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReflectUtils = void 0;
require("reflect-metadata");
var ReflectUtils = (function () {
    function ReflectUtils() {
    }
    ReflectUtils.getParameterTypes = function (target, propertyKey) {
        if (propertyKey) {
            return Reflect.getMetadata('design:paramtypes', target, propertyKey) || [];
        }
        else {
            return Reflect.getMetadata('design:paramtypes', target) || [];
        }
    };
    ReflectUtils.getReturnType = function (target, propertyKey) {
        return Reflect.getMetadata('design:returntype', target, propertyKey);
    };
    ReflectUtils.getType = function (target, propertyKey) {
        if (propertyKey) {
            return Reflect.getMetadata('design:type', target, propertyKey);
        }
        else {
            return Reflect.getMetadata('design:type', target);
        }
    };
    ReflectUtils.getMetadata = function (metadataKey, target, propertyKey) {
        if (propertyKey) {
            return Reflect.getMetadata(metadataKey, target, propertyKey);
        }
        else {
            return Reflect.getMetadata(metadataKey, target);
        }
    };
    ReflectUtils.getMetadataKeys = function (target) {
        return Reflect.getMetadataKeys(target);
    };
    ReflectUtils.getOwnMetadata = function (metadataKey, target, propertyKey) {
        if (propertyKey) {
            return Reflect.getOwnMetadata(metadataKey, target, propertyKey);
        }
        else {
            return Reflect.getOwnMetadata(metadataKey, target);
        }
    };
    ReflectUtils.getMetadatas = function (target) {
        return this.getMetadataKeys(target).map(function (it) { return ReflectUtils.getMetadata(it, target); });
    };
    ReflectUtils.metadata = function (metadataKey, data) {
        return Reflect.metadata(metadataKey, data);
    };
    ReflectUtils.defineMetadata = function (metadataKey, value, target, propertyKey) {
        if (propertyKey && Reflect.defineMetadata) {
            Reflect.defineMetadata(metadataKey, value, target, propertyKey);
        }
        else if (Reflect.defineMetadata) {
            Reflect.defineMetadata(metadataKey, value, target);
        }
    };
    return ReflectUtils;
}());
exports.ReflectUtils = ReflectUtils;
//# sourceMappingURL=ReflectUtils.js.map