"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Intent = exports.PublishType = void 0;
var PublishType;
(function (PublishType) {
    PublishType["DATA_PARAMETERS"] = "DATA_PARAMETERS";
    PublishType["INLINE_DATA_PARAMETERS"] = "INLINE_DATA_PARAMETERS";
})(PublishType = exports.PublishType || (exports.PublishType = {}));
var Intent = (function () {
    function Intent(uri, data, event) {
        this.uri = uri;
        this.data = data;
        this.event = event;
    }
    Object.defineProperty(Intent.prototype, "scheme", {
        get: function () {
            return this.uri.split('://')[0];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Intent.prototype, "paths", {
        get: function () {
            var _a;
            return ((_a = this.pathname.split('/')) !== null && _a !== void 0 ? _a : []);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Intent.prototype, "fullPath", {
        get: function () {
            var _a;
            var paths = this.uri.split('://');
            return (_a = paths[paths.length >= 2 ? 1 : 0]) !== null && _a !== void 0 ? _a : '';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Intent.prototype, "pathname", {
        get: function () {
            var paths = this.fullPath.split('?');
            return paths[0];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Intent.prototype, "query", {
        get: function () {
            var _a;
            var paths = this.fullPath.split('?');
            return (_a = paths[1]) !== null && _a !== void 0 ? _a : '';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Intent.prototype, "queryParams", {
        get: function () {
            var _a;
            var param = {};
            (_a = this.query.split('&')) === null || _a === void 0 ? void 0 : _a.forEach(function (it) {
                var a = it.split('=');
                param[a[0]] = a[1];
            });
            return param;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Intent.prototype, "queryParamsAfterDecodeURI", {
        get: function () {
            var params = this.queryParams;
            for (var key in params) {
                if (params.hasOwnProperty(key)) {
                    params[key] = decodeURIComponent(params[key]);
                }
            }
            return params;
        },
        enumerable: false,
        configurable: true
    });
    Intent.prototype.getPathnameData = function (urlExpression) {
        var urls = this.pathname.split('/');
        var urlExpressions = urlExpression.split('/');
        if (urls.length !== urlExpressions.length) {
            return;
        }
        var data = {};
        for (var i = 0; i < urlExpressions.length; i++) {
            var it_1 = urlExpressions[i];
            var urlit = urls[i];
            if (!it_1.startsWith(':')) {
                if (it_1 !== urlit) {
                    return;
                }
                continue;
            }
            data[it_1.slice(1)] = urlit;
        }
        return data;
    };
    return Intent;
}());
exports.Intent = Intent;
//# sourceMappingURL=Intent.js.map