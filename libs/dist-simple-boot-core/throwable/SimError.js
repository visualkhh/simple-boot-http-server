"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimError = void 0;
var SimError = (function () {
    function SimError(message, name, stack) {
        this.message = message;
        this.name = name;
        this.stack = stack;
    }
    return SimError;
}());
exports.SimError = SimError;
//# sourceMappingURL=SimError.js.map