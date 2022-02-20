"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FunctionUtils = void 0;
var FunctionUtils = (function () {
    function FunctionUtils() {
    }
    FunctionUtils.getParameterNames = function (func, property) {
        var _a, _b;
        if (typeof func === 'object' && property) {
            func = func[property];
        }
        return (_b = (_a = new RegExp('(?:' + func.name + '\\s*|^)\\s*\\((.*?)\\)')
            .exec(func.toString().replace(/\n/g, ''))) === null || _a === void 0 ? void 0 : _a[1].replace(/\/\*.*?\*\//g, '').replace(/ /g, '').split(',')) !== null && _b !== void 0 ? _b : [];
    };
    FunctionUtils.eval = function (script, obj) {
        try {
            if (script && obj) {
                return Function("\"use strict\";\n                    ".concat(script, "\n                    ")).bind(obj)();
            }
            else if (script) {
                return (new Function('return ' + script))();
            }
            else {
                return null;
            }
        }
        catch (e) {
            return null;
        }
    };
    return FunctionUtils;
}());
exports.FunctionUtils = FunctionUtils;
//# sourceMappingURL=FunctionUtils.js.map