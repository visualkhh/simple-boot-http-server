"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimOption = void 0;
var SimOption = (function () {
    function SimOption(advice, proxy) {
        if (advice === void 0) { advice = []; }
        this.advice = advice;
        this.proxy = proxy;
    }
    SimOption.prototype.addAdvicce = function (advice) {
        this.advice.push(advice);
    };
    SimOption.prototype.setAdvice = function () {
        var advice = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            advice[_i] = arguments[_i];
        }
        this.advice = advice;
        return this;
    };
    return SimOption;
}());
exports.SimOption = SimOption;
//# sourceMappingURL=SimOption.js.map