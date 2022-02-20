"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RandomUtils = void 0;
var ValidUtils_1 = require("../valid/ValidUtils");
var RandomUtils = (function () {
    function RandomUtils() {
    }
    RandomUtils.random = function (min, max) {
        if (ValidUtils_1.ValidUtils.isNullOrUndefined(min)) {
            return Math.random();
        }
        else if (!ValidUtils_1.ValidUtils.isNullOrUndefined(min) && ValidUtils_1.ValidUtils.isNullOrUndefined(max)) {
            return Math.random() * (min || 0);
        }
        else {
            return Math.random() * ((max || 0) - (min || 0)) + (min || 0);
        }
    };
    RandomUtils.uuid = function (format) {
        if (format === void 0) { format = 'xxxx-xxxx-xxxx-xxxx'; }
        return format.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0;
            var v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };
    RandomUtils.getRandomColor = function () {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };
    RandomUtils.getRandomString = function (len) {
        var letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        var color = '';
        for (var i = 0; i < len; i++) {
            color += letters[Math.floor(Math.random() * letters.length)];
        }
        return color;
    };
    RandomUtils.d = '';
    return RandomUtils;
}());
exports.RandomUtils = RandomUtils;
//# sourceMappingURL=RandomUtils.js.map