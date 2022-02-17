"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestResponse = void 0;
var HttpHeaders_1 = require("../codes/HttpHeaders");
var Intent_1 = require("simple-boot-core/intent/Intent");
var url_1 = require("url");
var RequestResponse = (function () {
    function RequestResponse(req, res) {
        this.req = req;
        this.res = res;
    }
    Object.defineProperty(RequestResponse.prototype, "reqRemoteAddress", {
        get: function () {
            var ipHeader = this.req.headers['x-forwarded-for'];
            var ip = this.req.socket.remoteAddress;
            if (Array.isArray(ipHeader)) {
                ip = ipHeader.join(',').split(',').shift();
            }
            else if (typeof ipHeader === 'string') {
                ip = ipHeader.split(',').shift();
            }
            return ip;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RequestResponse.prototype, "reqUrl", {
        get: function () {
            var _a;
            return (_a = this.req.url) !== null && _a !== void 0 ? _a : '';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RequestResponse.prototype, "reqUrlObj", {
        get: function () {
            var _a, _b;
            return new url_1.URL('http://' + ((_a = this.reqHeaderFirst(HttpHeaders_1.HttpHeaders.Host)) !== null && _a !== void 0 ? _a : 'localhost') + ((_b = this.req.url) !== null && _b !== void 0 ? _b : ''));
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RequestResponse.prototype, "reqUrlSearchParams", {
        get: function () {
            return Array.from(this.reqUrlObj.searchParams);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RequestResponse.prototype, "reqUrlSearchParamsObj", {
        get: function () {
            var entries = this.reqUrlObj.searchParams;
            return Object.fromEntries(entries);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RequestResponse.prototype, "reqPathSearchParamUrl", {
        get: function () {
            var reqUrlObj1 = this.reqUrlObj;
            return reqUrlObj1.pathname + (reqUrlObj1.searchParams.toString() ? '&' + reqUrlObj1.searchParams.toString() : '');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RequestResponse.prototype, "reqIntent", {
        get: function () {
            return new Intent_1.Intent(this.reqPathSearchParamUrl);
        },
        enumerable: false,
        configurable: true
    });
    RequestResponse.prototype.reqHasAcceptHeader = function (accept) {
        var _a;
        return ((_a = this.reqHeaderFirst(HttpHeaders_1.HttpHeaders.Accept)) !== null && _a !== void 0 ? _a : '').indexOf(accept) > -1;
    };
    RequestResponse.prototype.reqBodyJsonData = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var data = '';
            _this.req.on('data', function (chunk) { return data += chunk; });
            _this.req.on('error', function (err) { return reject(err); });
            _this.req.on('end', function () { return resolve(JSON.parse(data)); });
        });
    };
    RequestResponse.prototype.resBodyJsonData = function () {
        var _this = this;
        new Promise(function (resolve, reject) {
            var data = '';
            _this.res.on('data', function (chunk) { return data += chunk; });
            _this.res.on('error', function (err) { return reject(err); });
            _this.res.on('end', function () { return resolve(JSON.parse(data)); });
        });
    };
    RequestResponse.prototype.reqMethod = function () {
        var _a;
        return (_a = this.req.method) === null || _a === void 0 ? void 0 : _a.toUpperCase();
    };
    RequestResponse.prototype.reqHeader = function (key, defaultValue) {
        var _a;
        return (_a = this.req.headers[key.toLowerCase()]) !== null && _a !== void 0 ? _a : defaultValue;
    };
    RequestResponse.prototype.reqHeaderFirst = function (key, defaultValue) {
        var _a;
        var header = this.req.headers[key.toLowerCase()];
        if (header && Array.isArray(header)) {
            return (_a = header[0]) !== null && _a !== void 0 ? _a : defaultValue;
        }
        else {
            return header !== null && header !== void 0 ? header : defaultValue;
        }
    };
    RequestResponse.prototype.reqAuthorizationHeader = function () {
        return this.reqHeaderFirst(HttpHeaders_1.HttpHeaders.Authorization);
    };
    RequestResponse.prototype.reqRefreshTokenHeader = function () {
        return this.reqHeaderFirst(HttpHeaders_1.HttpHeaders.Authorization);
    };
    Object.defineProperty(RequestResponse.prototype, "resStatusCode", {
        get: function () {
            return this.res.statusCode;
        },
        enumerable: false,
        configurable: true
    });
    RequestResponse.prototype.resHeaderFirst = function (key, defaultValue) {
        var _a;
        var header = this.res.getHeader(key.toLowerCase());
        if (header && Array.isArray(header)) {
            return (_a = header[0]) !== null && _a !== void 0 ? _a : defaultValue;
        }
        else {
            return header !== null && header !== void 0 ? header : defaultValue;
        }
    };
    RequestResponse.prototype.reqSession = function () {
        if (this.req.simpleboot_session === undefined) {
            this.req.simpleboot_session = {};
        }
        return this.req.simpleboot_session;
    };
    RequestResponse.prototype.reqSessionSet = function (key, value) {
        this.reqSession[key] = value;
    };
    RequestResponse.prototype.reqSessionGet = function (key) {
        var session = this.reqSession;
        if (session) {
            return session[key];
        }
    };
    RequestResponse.prototype.resSetStatusCode = function (statusCode) {
        this.res.statusCode = statusCode;
    };
    RequestResponse.prototype.resWrite = function (data, encoding) {
        if (encoding === void 0) { encoding = 'utf8'; }
        return this.res.write(data, encoding);
    };
    RequestResponse.prototype.resWriteJson = function (data, encoding) {
        if (encoding === void 0) { encoding = 'utf8'; }
        return this.resWrite(JSON.stringify(data), encoding);
    };
    RequestResponse.prototype.resSetHeader = function (key, value) {
        this.res.setHeader(key.toLowerCase(), value);
    };
    RequestResponse.prototype.resWriteHead = function (statusCode, headers) {
        this.res.writeHead(statusCode, headers);
    };
    RequestResponse.prototype.resIsDone = function () {
        return this.res.finished || this.res.writableEnded;
    };
    return RequestResponse;
}());
exports.RequestResponse = RequestResponse;
//# sourceMappingURL=RequestResponse.js.map