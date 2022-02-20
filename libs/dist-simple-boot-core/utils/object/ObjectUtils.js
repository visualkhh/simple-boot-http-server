"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectUtils = void 0;
var ObjectUtils = (function () {
    function ObjectUtils() {
    }
    ObjectUtils.getAllProtoTypeName = function (target) {
        var data = [];
        if (target) {
            var proto = Object.getPrototypeOf(target);
            if (proto && (data = Object.keys(proto) || []).length > 0) {
                data = data.concat(this.getAllProtoTypeName(proto));
            }
        }
        return data.filter(function (it) { return it !== 'constructor'; });
    };
    ObjectUtils.getProtoTypeName = function (target) {
        var data = [];
        if (target) {
            var proto = Object.getPrototypeOf(target);
            data = Object.keys(proto) || [];
        }
        return data.filter(function (it) { return it !== 'constructor'; });
    };
    ObjectUtils.getProtoTypes = function (target) {
        var data = [];
        if (target) {
            var proto_1 = Object.getPrototypeOf(target);
            (Object.keys(proto_1) || []).filter(function (it) { return it !== 'constructor'; }).forEach(function (it) {
                data.push(proto_1[it]);
            });
        }
        return data;
    };
    ObjectUtils.seal = function (target) {
        return Object.seal(target);
    };
    ObjectUtils.isPrototypeOfTarget = function (start, target) {
        if (start && target) {
            return Object.prototype.isPrototypeOf.call(start.prototype, target);
        }
        else {
            return false;
        }
    };
    ObjectUtils.getPrototypeOfDepth = function (target, dest) {
        var object = target;
        var r = [];
        if (dest) {
            do {
                object = Object.getPrototypeOf(object);
                if ((object === null || object === void 0 ? void 0 : object.constructor) === dest) {
                    break;
                }
                r.push(object);
            } while (object);
        }
        return r;
    };
    ObjectUtils.getAllProtoType = function (start) {
        var protos = [];
        while (start) {
            protos.push(start);
            start = Object.getPrototypeOf(start);
        }
        return protos;
    };
    ObjectUtils.getPrototypeOf = function (start) {
        return Object.getPrototypeOf(start);
    };
    ObjectUtils.getPrototypeKeyMap = function (target) {
        var data = new Map();
        var proto = Object.getPrototypeOf(target);
        (Object.keys(proto) || []).filter(function (it) { return it !== 'constructor'; }).forEach(function (it) {
            data.set(proto[it], it);
        });
        return data;
    };
    ObjectUtils.getPrototypeName = function (target, fnc) {
        return this.getPrototypeKeyMap(target).get(fnc);
    };
    return ObjectUtils;
}());
exports.ObjectUtils = ObjectUtils;
//# sourceMappingURL=ObjectUtils.js.map