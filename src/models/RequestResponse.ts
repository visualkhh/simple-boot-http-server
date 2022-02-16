import { IncomingMessage, OutgoingHttpHeader, OutgoingHttpHeaders, ServerResponse } from 'http';
import { HttpHeaders } from '../codes/HttpHeaders';
import { Mimes } from '../codes/Mimes';
import { Intent } from 'simple-boot-core/intent/Intent';
import { URL } from 'url';
// https://masteringjs.io/tutorials/node/http-request
// https://nodejs.org/ko/docs/guides/anatomy-of-an-http-transaction/
export class RequestResponse {
    constructor(public req: IncomingMessage, public res: ServerResponse) {
    }

    get reqRemoteAddress(): string | undefined {
        const ipHeader = this.req.headers['x-forwarded-for'];
        let ip = this.req.socket.remoteAddress;
        if (Array.isArray(ipHeader)) {
            ip = ipHeader.join(',').split(',').shift();
        } else if (typeof ipHeader === 'string') {
            ip = ipHeader.split(',').shift();
        }
        return ip;
    }

    get reqUrl(): string {
        return this.req.url ?? '';
    }

    get reqUrlObj(): URL {
        return new URL('http://' + (this.reqHeaderFirst(HttpHeaders.Host) ?? 'localhost') + (this.req.url ?? ''));
    }

    get reqUrlSearchParams(): [string, string][] {
        return Array.from(this.reqUrlObj.searchParams as any);
    }

    get reqUrlSearchParamsObj(): { [p: string]: { [p: string]: any } } {
        const entries = this.reqUrlObj.searchParams;
        return Object.fromEntries(entries as any)
    }

    get reqPathSearchParamUrl(): string {
        const reqUrlObj1 = this.reqUrlObj;
        return reqUrlObj1.pathname + (reqUrlObj1.searchParams.toString() ? '&' + reqUrlObj1.searchParams.toString() : '')
    }

    get reqIntent() {
        return new Intent(this.reqPathSearchParamUrl);
    }

    reqHasAcceptHeader(accept: Mimes | string): boolean {
        return (this.reqHeaderFirst(HttpHeaders.Accept) ?? '').indexOf(accept) > -1;
    }

    reqBodyJsonData<T>() {
        return new Promise<T>((resolve, reject) => {
            let data = '';
            this.req.on('data', (chunk) => data += chunk);
            this.req.on('error', err => reject(err));
            this.req.on('end', () => resolve(JSON.parse(data)));
        });
    }

    resBodyJsonData() {
        new Promise((resolve, reject) => {
            let data = '';
            this.res.on('data', chunk => data += chunk);
            this.res.on('error', err => reject(err));
            this.res.on('end', () => resolve(JSON.parse(data)));
        });
    }

    reqMethod() {
        return this.req.method?.toUpperCase();
    }

    reqHeader(key: HttpHeaders | string, defaultValue?: string) {
        return this.req.headers[key.toLowerCase()] ?? defaultValue;
    }

    reqHeaderFirst(key: HttpHeaders | string, defaultValue?: string) {
        const header = this.req.headers[key.toLowerCase()];
        if (header && Array.isArray(header)) {
            return header[0] ?? defaultValue;
        } else {
            return header ?? defaultValue;
        }
    }

    public reqAuthorizationHeader() {
        return this.reqHeaderFirst(HttpHeaders.Authorization);
    }

    reqRefreshTokenHeader() {
        return this.reqHeaderFirst(HttpHeaders.Authorization);
    }

    get resStatusCode() {
        return this.res.statusCode;
    }

    resHeaderFirst(key: HttpHeaders | string, defaultValue?: string) {
        const header = this.res.getHeader(key.toLowerCase());
        if (header && Array.isArray(header)) {
            return header[0] ?? defaultValue;
        } else {
            return header ?? defaultValue;
        }
    }

    reqSession(): { [key: string]: any } {
        if ((this.req as any).simpleboot_session === undefined) {
            (this.req as any).simpleboot_session = {};
        }
        return (this.req as any).simpleboot_session;
    }

    reqSessionSet(key: string, value: any): void {
        (this.reqSession as any)[key] = value;
    }

    reqSessionGet<T = any>(key: string): T | undefined {
        const session = this.reqSession as any;
        if (session) {
            return session[key] as T;
        }
    }

    resSetStatusCode(statusCode: number) {
        this.res.statusCode = statusCode;
    }

    // resEnd() {
    //     this.res.end();
    // }

    resWrite(data: string | Buffer, encoding: BufferEncoding = 'utf8') {
       return this.res.write(data, encoding);
    }

    resWriteJson(data: any, encoding: BufferEncoding = 'utf8') {
       return this.resWrite(JSON.stringify(data), encoding);
    }

    resSetHeader(key: HttpHeaders | string, value: string | string[]): void {
        this.res.setHeader(key.toLowerCase(), value);
    }

    resWriteHead(statusCode: number, headers?: OutgoingHttpHeaders | OutgoingHttpHeader[]) {
        this.res.writeHead(statusCode, headers);
    }

    resIsDone() {
        return this.res.finished || this.res.writableEnded
    }

    // res.on("readable", () => {
    //     console.log('readable???')
    // });
    // res.on('complete', function (details) {
    //     var size = details.req.bytes;
    //     console.log('complete-->', size)
    // });
    // res.on('finish', function() {
    //     console.log('finish??');
    // });
    // res.on('end', () => {
    //     console.log('end--?')
    // });

}
