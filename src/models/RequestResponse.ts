import {IncomingMessage, OutgoingHttpHeader, OutgoingHttpHeaders, ServerResponse} from 'http';
import {HttpHeaders} from '../codes/HttpHeaders';
import {Mimes} from '../codes/Mimes';
import {Intent} from 'simple-boot-core/intent/Intent';
import {URL} from 'url';
import {Buffer} from 'buffer';
import {MultipartData} from './datas/MultipartData';
import {ReqFormUrlBody} from './datas/body/ReqFormUrlBody';
import {ReqJsonBody} from './datas/body/ReqJsonBody';
import {ReqHeader} from './datas/ReqHeader';
import {ReqMultipartFormBody} from './datas/body/ReqMultipartFormBody';
// https://masteringjs.io/tutorials/node/http-request
// https://nodejs.org/ko/docs/guides/anatomy-of-an-http-transaction/
export class RequestResponse {
    protected resWriteChunk: any;
    constructor(private req: IncomingMessage, private res: ServerResponse) {
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

    get reqUrlSearchParamsType(): URLSearchParams {
        return this.reqUrlObj.searchParams;
    }

    get reqUrlSearchParamsObj(): { [p: string]: { [p: string]: any } } {
        const entries = this.reqUrlObj.searchParams;
        return Object.fromEntries(entries as any)
    }

    get reqPathSearchParamUrl(): string {
        const reqUrlObj1 = this.reqUrlObj;
        return reqUrlObj1.pathname + (reqUrlObj1.searchParams.toString() ? '?' + reqUrlObj1.searchParams.toString() : '')
    }

    get reqIntent() {
        return new Intent(this.reqPathSearchParamUrl);
    }

    reqHasContentTypeHeader(mime: Mimes | string): boolean {
        return (this.reqHeaderFirst(HttpHeaders.ContentType) ?? '').toLowerCase().indexOf(mime.toLocaleLowerCase()) > -1;
    }

    reqHasAcceptHeader(mime: Mimes | string): boolean {
        return (this.reqHeaderFirst(HttpHeaders.Accept) ?? '').toLowerCase().indexOf(mime.toLocaleLowerCase()) > -1;
    }

    reqBodyData(): Promise<Buffer> {
        return new Promise<Buffer>((resolve, reject) => {
            const data: Uint8Array[] = [];
            this.req.on('data', (chunk) => data.push(chunk));
            this.req.on('error', err => reject(err));
            this.req.on('end', () => resolve(Buffer.concat(data)));
        });
    }

    reqBodyMultipartFormData(): Promise<MultipartData<any>[]> {
        return new Promise<MultipartData<any>[]>((resolve, reject) => {
            let data = '';
            this.req.on('data', (chunk) => data += chunk);
            this.req.on('error', err => reject(err));
            this.req.on('end', () => {
                if (this.reqHasContentTypeHeader(Mimes.MultipartFormData)) {
                    const contentType = this.reqHeaderFirst(HttpHeaders.ContentType)?.toString();
                    const boundary = contentType?.split(';')[1]?.split('=')[1];
                    if (boundary) {
                        const datas = data.split('--' + boundary.trim() + '--\r\n')[0].split('--' + boundary.trim() + '\r\n').slice(1);
                        const mDatas = datas.map(it => {
                            const header = {} as any
                            const [headerRaw, body] = it.split('\r\n\r\n');
                            headerRaw.split('\r\n').filter(sit => sit).forEach(sit => {
                                const [k, v] = sit.split(':');
                                if (k && v) {
                                    header[k.trim()] = header[k.trim()] ? header[k.trim()] : [];
                                    header[k.trim()].push(v.trim());
                                }
                            })
                            return new MultipartData(boundary, header, body);
                        });
                        resolve(mDatas);
                    } else {
                        reject(new Error('Not MultipartFormData boundary'));
                    }
                } else {
                    reject(new Error('Not MultipartFormData'));
                }
            });
        });
    }

    reqBodyStringData(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            let data = '';
            this.req.on('data', (chunk) => data += chunk);
            this.req.on('error', err => reject(err));
            this.req.on('end', () => resolve(data));
        });
    }

    reqBodyJsonData<T>(): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            let data = '';
            this.req.on('data', (chunk) => data += chunk);
            this.req.on('error', err => reject(err));
            this.req.on('end', () => resolve(JSON.parse(data)));
        });
    }

    reqBodyFormUrlData<T>(): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            let data = '';
            this.req.on('data', (chunk) => data += chunk);
            this.req.on('error', err => reject(err));
            this.req.on('end', () => {
                const formData = {} as any;
                Array.from(new URLSearchParams(data).entries()).forEach(([k, v]) => {
                    const target = formData[k];
                    if (Array.isArray(target)) {
                        target.push(v);
                    } else if (typeof target === 'string') {
                        formData[k] = [target, v]
                    } else {
                        formData[k] = v;
                    }
                });
                resolve(formData);
            });
        });
    }

    reqBodyReqFormUrlBody(): Promise<ReqFormUrlBody> {
        return new Promise<ReqFormUrlBody>((resolve, reject) => {
            let data = '';
            this.req.on('data', (chunk) => data += chunk);
            this.req.on('error', err => reject(err));
            this.req.on('end', () => {
                const formData = new ReqFormUrlBody();
                Array.from(new URLSearchParams(data).entries()).forEach(([k, v]) => {
                    const target = formData[k];
                    if (Array.isArray(target)) {
                        target.push(v);
                    } else if (typeof target === 'string') {
                        formData[k] = [target, v]
                    } else {
                        formData[k] = v;
                    }
                });
                resolve(formData);
            });
        });
    }

    reqBodyReqJsonBody<T>(): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            let data = '';
            this.req.on('data', (chunk) => data += chunk);
            this.req.on('error', err => reject(err));
            this.req.on('end', () => {
                const parse = Object.assign(new ReqJsonBody(), JSON.parse(data));
                resolve(parse)
            });
        });
    }

    reqBodyReqMultipartFormBody(): Promise<ReqMultipartFormBody> {
        return this.reqBodyMultipartFormData().then(it => new ReqMultipartFormBody(it))
    }

    resBodyJsonData<T>(): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            let data = '';
            this.res.on('data', (chunk) => data += chunk);
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

    get reqHeaderObj(): ReqHeader {
        const h = new ReqHeader();
        Object.entries(this.req.headers).forEach(([k, v]) => {
            h[k] = v;
        });
        return h;
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

    resStatusCode(code?: undefined): number;
    // eslint-disable-next-line no-dupe-class-members
    resStatusCode(code: number): RequestResponseChain<number>;
    // eslint-disable-next-line no-dupe-class-members
    resStatusCode(code: number|undefined): number | RequestResponseChain<number> {
        if (code) {
            this.res.statusCode = code;
            return new RequestResponseChain<number>(this.req, this.res, this.res.statusCode);
        } else {
            return this.res.statusCode;
        }
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
        return new RequestResponseChain(this.req, this.res, this.res.statusCode);
    }

    // resEnd() {
    //     this.res.end();
    // }

    // eslint-disable-next-line no-undef
    resWrite(chunk: string | Buffer | any, encoding: BufferEncoding = 'utf8') {
        this.resWriteChunk = chunk;
        return new RequestResponseChain(this.req, this.res, this.resWriteChunk);
    }

    // eslint-disable-next-line no-undef
    resWriteJson(chunk: any, encoding: BufferEncoding = 'utf8') {
        return this.resWrite(this.resWrite(JSON.stringify(chunk), encoding));
    }

    resSetHeader(key: HttpHeaders | string, value: string | string[]) {
        return this.createRequestResponseChain(this.res.setHeader(key.toLowerCase(), value));
    }

    resSetHeaders(headers: { [key: string]: string | string[] }) {
        Object.entries(headers).forEach(([key, value]) => this.resSetHeader(key, value));
        return this.createRequestResponseChain();
    }

    resEnd(chunk?: any) {
        this.resWriteChunk = chunk ?? this.resWriteChunk;
        this.res.end(this.resWriteChunk);
        return this.createRequestResponseChain();
    }

    // writeContinue(callback?: () => void) {
    //     this.res.writeContinue(callback);
    //     return new RequestResponseChain(this.req, this.res);
    // }

    createRequestResponseChain<T = any>(data?: T) {
        const requestResponseChain = new RequestResponseChain(this.req, this.res, data);
        requestResponseChain.resWriteChunk = this.resWriteChunk;
        return requestResponseChain;
    }

    // reqWrite(chunk?: any) {
    //     this.resWriteChunk = chunk;
    //     // this.res.write(chunk);
    //     return this.createRequestResponseChain();
    // }

    resWriteHead(statusCode: number, headers?: OutgoingHttpHeaders | OutgoingHttpHeader[] | { [key: string]: string | string[] }) {
        return new RequestResponseChain(this.req, this.res, this.res.writeHead(statusCode, headers));
    }

    resIsDone() {
        return this.res.finished || this.res.writableEnded;
        // return new RequestResponseChain(this.req, this.res, this.res.finished || this.res.writableEnded);
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

export class RequestResponseChain<T> extends RequestResponse {
    constructor(req: IncomingMessage, res: ServerResponse, public result?: T) {
        super(req, res);
    }
}