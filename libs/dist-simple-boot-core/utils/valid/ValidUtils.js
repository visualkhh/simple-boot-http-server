"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidUtils = void 0;
var ValidUtils = (function () {
    function ValidUtils() {
    }
    ValidUtils.isNullOrUndefined = function (data) {
        if (data == null || undefined === data) {
            return true;
        }
        else {
            return false;
        }
    };
    ValidUtils.isNull = function (data) {
        if (data == null) {
            return true;
        }
        else {
            return false;
        }
    };
    ValidUtils.isArray = function (object_o) {
        if (ValidUtils.isNullOrUndefined(object_o)) {
            return false;
        }
        else {
            return Object.prototype.toString.call(object_o).trim() === '[object Array]';
        }
    };
    ValidUtils.isNumber = function (object_o) {
        if (ValidUtils.isNullOrUndefined(object_o)) {
            return false;
        }
        else {
            return Object.prototype.toString.call(object_o).trim() === '[object Number]';
        }
    };
    ValidUtils.isString = function (object_o) {
        if (ValidUtils.isNullOrUndefined(object_o)) {
            return false;
        }
        else {
            return Object.prototype.toString.call(object_o).trim() === '[object String]';
        }
    };
    ValidUtils.isFunction = function (object_o) {
        if (ValidUtils.isNullOrUndefined(object_o)) {
            return false;
        }
        else {
            return Object.prototype.toString.call(object_o).trim() === '[object Function]';
        }
    };
    ValidUtils.isObject = function (object_o) {
        if (ValidUtils.isNullOrUndefined(object_o)) {
            return false;
        }
        else {
            return Object.prototype.toString.call(object_o).trim() === '[object Object]';
        }
    };
    ValidUtils.isMap = function (object_o) {
        if (ValidUtils.isNullOrUndefined(object_o)) {
            return false;
        }
        else {
            return Object.prototype.toString.call(object_o).trim() === '[object Map]';
        }
    };
    return ValidUtils;
}());
exports.ValidUtils = ValidUtils;
//# sourceMappingURL=ValidUtils.js.map