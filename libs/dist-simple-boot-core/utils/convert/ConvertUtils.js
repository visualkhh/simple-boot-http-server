"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConvertUtils = void 0;
var ValidUtils_1 = require("../valid/ValidUtils");
var ConvertUtils = (function () {
    function ConvertUtils() {
    }
    ConvertUtils.objToGetURL = function (obj) {
        return Object.keys(obj).reduce(function (prev, key, i) { return ("".concat(prev).concat(i !== 0 ? '&' : '').concat(key, "=").concat(obj[key])); }, '');
    };
    ConvertUtils.mapToJson = function (map) {
        return JSON.stringify(Array.from(map.entries()).reduce(function (o, _a) {
            var key = _a[0], value = _a[1];
            o[key] = value;
            return o;
        }, {}));
    };
    ConvertUtils.jsonToMap = function (jsonStr) {
        return new Map(JSON.parse(jsonStr));
    };
    ConvertUtils.objToStrMap = function (obj) {
        var strMap = new Map();
        for (var _i = 0, _a = Object.keys(obj); _i < _a.length; _i++) {
            var k = _a[_i];
            strMap.set(k, obj[k]);
        }
        return strMap;
    };
    ConvertUtils.jsonToStrMap = function (jsonStr) {
        return this.objToStrMap(JSON.parse(jsonStr));
    };
    ConvertUtils.strToObject = function (message) {
        return JSON.parse(message);
    };
    ConvertUtils.objToJson = function (obj) {
        return JSON.stringify(obj);
    };
    ConvertUtils.objToMap = function (obj) {
        var mp = new Map();
        Object.keys(obj).forEach(function (k) { mp.set(k, obj[k]); });
        return mp;
    };
    ConvertUtils.mapToObj = function (map) {
        var obj = {};
        map.forEach(function (v, k) { obj[k] = v; });
        return obj;
    };
    ConvertUtils.toObject = function (obj) {
        if (ValidUtils_1.ValidUtils.isMap(obj)) {
            var map = obj;
            obj = this.mapToObj(map);
        }
        if (ValidUtils_1.ValidUtils.isArray(obj)) {
            var arr = obj;
            for (var i = 0; i < arr.length; i++) {
                arr[i] = this.toObject(arr[i]);
            }
        }
        if (ValidUtils_1.ValidUtils.isObject(obj)) {
            for (var property in obj) {
                obj[property] = this.toObject(obj[property]);
            }
        }
        return obj;
    };
    ConvertUtils.iteratorToArray = function (it) {
        return Array.from(it);
    };
    ConvertUtils.toJson = function (obj) {
        var at = this.toObject(obj);
        return JSON.stringify(at);
    };
    ConvertUtils.concatenateToAttribute = function (object_o) {
        return ConvertUtils.concatenateToString(object_o, '=', ' ', "'");
    };
    ;
    ConvertUtils.concatenateToParameter = function (object_o) {
        return ConvertUtils.concatenateToString(object_o, '=', '&', '');
    };
    ;
    ConvertUtils.specialCharsToEscape = function (data) {
        return data.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    };
    ConvertUtils.concatenateToString = function (object_o, unionString_s, spilString_s, pairString_s) {
        if (unionString_s === void 0) { unionString_s = '='; }
        if (spilString_s === void 0) { spilString_s = ' '; }
        if (pairString_s === void 0) { pairString_s = ''; }
        var results = [];
        for (var property in object_o) {
            var value = object_o[property];
            if (value) {
                results.push(property.toString() + unionString_s + pairString_s + value + pairString_s);
            }
        }
        return results.join(spilString_s);
    };
    return ConvertUtils;
}());
exports.ConvertUtils = ConvertUtils;
//# sourceMappingURL=ConvertUtils.js.map