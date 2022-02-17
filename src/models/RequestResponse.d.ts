/// <reference types="node" />
import { IncomingMessage, OutgoingHttpHeader, OutgoingHttpHeaders, ServerResponse } from 'http';
import { HttpHeaders } from '../codes/HttpHeaders';
import { Mimes } from '../codes/Mimes';
import { Intent } from 'simple-boot-core/intent/Intent';
import { URL } from 'url';
export declare class RequestResponse {
    req: IncomingMessage;
    res: ServerResponse;
    constructor(req: IncomingMessage, res: ServerResponse);
    get reqRemoteAddress(): string | undefined;
    get reqUrl(): string;
    get reqUrlObj(): URL;
    get reqUrlSearchParams(): [string, string][];
    get reqUrlSearchParamsObj(): {
        [p: string]: {
            [p: string]: any;
        };
    };
    get reqPathSearchParamUrl(): string;
    get reqIntent(): Intent<any, any>;
    reqHasAcceptHeader(accept: Mimes | string): boolean;
    reqBodyJsonData<T>(): Promise<T>;
    resBodyJsonData(): void;
    reqMethod(): string | undefined;
    reqHeader(key: HttpHeaders | string, defaultValue?: string): string | string[] | undefined;
    reqHeaderFirst(key: HttpHeaders | string, defaultValue?: string): string | undefined;
    reqAuthorizationHeader(): string | undefined;
    reqRefreshTokenHeader(): string | undefined;
    get resStatusCode(): number;
    resHeaderFirst(key: HttpHeaders | string, defaultValue?: string): string | number | undefined;
    reqSession(): {
        [key: string]: any;
    };
    reqSessionSet(key: string, value: any): void;
    reqSessionGet<T = any>(key: string): T | undefined;
    resSetStatusCode(statusCode: number): void;
    resWrite(data: string | Buffer, encoding?: BufferEncoding): boolean;
    resWriteJson(data: any, encoding?: BufferEncoding): boolean;
    resSetHeader(key: HttpHeaders | string, value: string | string[]): void;
    resWriteHead(statusCode: number, headers?: OutgoingHttpHeaders | OutgoingHttpHeader[]): void;
    resIsDone(): boolean;
}
