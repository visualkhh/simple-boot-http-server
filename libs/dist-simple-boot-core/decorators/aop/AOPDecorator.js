"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAround = exports.Around = exports.AroundForceReturn = exports.getProtoBefores = exports.getBefores = exports.getBefore = exports.Before = exports.getProtoAfters = exports.getAfters = exports.getAfter = exports.After = void 0;
require("reflect-metadata");
var ReflectUtils_1 = require("../../utils/reflect/ReflectUtils");
var MetaDataAtomic_1 = require("../MetaDataAtomic");
var ObjectUtils_1 = require("../../utils/object/ObjectUtils");
var AfterMetadataKey = Symbol('After');
var BeforeMetadataKey = Symbol('Before');
var AroundMetadataKey = Symbol('Around');
var After = function (data) {
    return ReflectUtils_1.ReflectUtils.metadata(AfterMetadataKey, data);
};
exports.After = After;
var getAfter = function (target, propertyKey) {
    return ReflectUtils_1.ReflectUtils.getMetadata(AfterMetadataKey, target, propertyKey);
};
exports.getAfter = getAfter;
var getAfters = function (target) {
    return ObjectUtils_1.ObjectUtils.getAllProtoTypeName(target)
        .map(function (it) { return new MetaDataAtomic_1.MetaDataPropertyAtomic(target, (0, exports.getAfter)(target, it), it); })
        .filter(function (it) { return it.metaData !== undefined; }) || [];
};
exports.getAfters = getAfters;
var getProtoAfters = function (target, propertyKey, type) {
    return (0, exports.getAfters)(target).filter(function (it) { var _a; return propertyKey === it.metaData.property && type === ((_a = it.metaData.type) === null || _a === void 0 ? void 0 : _a.prototype); }) || [];
};
exports.getProtoAfters = getProtoAfters;
var Before = function (data) {
    return ReflectUtils_1.ReflectUtils.metadata(BeforeMetadataKey, data);
};
exports.Before = Before;
var getBefore = function (target, propertyKey) {
    return ReflectUtils_1.ReflectUtils.getMetadata(BeforeMetadataKey, target, propertyKey);
};
exports.getBefore = getBefore;
var getBefores = function (target) {
    return ObjectUtils_1.ObjectUtils.getAllProtoTypeName(target)
        .map(function (it) { return new MetaDataAtomic_1.MetaDataPropertyAtomic(target, (0, exports.getBefore)(target, it), it); })
        .filter(function (it) { return it.metaData !== undefined; }) || [];
};
exports.getBefores = getBefores;
var getProtoBefores = function (target, propertyKey, type) {
    return (0, exports.getBefores)(target).filter(function (it) { var _a; return propertyKey === it.metaData.property && type === ((_a = it.metaData.type) === null || _a === void 0 ? void 0 : _a.prototype); }) || [];
};
exports.getProtoBefores = getProtoBefores;
var AroundForceReturn = (function () {
    function AroundForceReturn(value) {
        this.value = value;
    }
    return AroundForceReturn;
}());
exports.AroundForceReturn = AroundForceReturn;
var Around = function (config) {
    return function (target, propertyKey, descriptor) {
        ReflectUtils_1.ReflectUtils.defineMetadata(AroundMetadataKey, config, target, propertyKey);
        var method = descriptor.value;
        descriptor.value = function () {
            var _a, _b;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var before = undefined;
            var r = undefined;
            if (config.before) {
                try {
                    before = (_a = config.before) === null || _a === void 0 ? void 0 : _a.call(config, this, propertyKey, args);
                }
                catch (e) {
                    if (e instanceof AroundForceReturn) {
                        return e.value;
                    }
                }
                r = method.apply(this, before);
            }
            else {
                r = method.apply(this, args);
            }
            if (config.after) {
                try {
                    r = (_b = config.after) === null || _b === void 0 ? void 0 : _b.call(config, this, propertyKey, args, r);
                }
                catch (e) {
                    if (e instanceof AroundForceReturn) {
                        return e.value;
                    }
                }
            }
            return r;
        };
    };
};
exports.Around = Around;
var getAround = function (target, propertyKey) {
    return ReflectUtils_1.ReflectUtils.getMetadata(AroundMetadataKey, target, propertyKey);
};
exports.getAround = getAround;
//# sourceMappingURL=AOPDecorator.js.map