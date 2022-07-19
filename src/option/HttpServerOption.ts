import {SimOption} from 'simple-boot-core/SimOption';
import {ConstructorType} from 'simple-boot-core/types/Types';
import {Server, ServerOptions} from 'http';
import {Filter} from '../filters/Filter';
import { EndPoint } from '../endpoints/EndPoint';
import {RequestResponse} from '../models/RequestResponse';
import {SimpleBootHttpServer} from '../SimpleBootHttpServer';

export type Listen = { port?: number, hostname?: string, backlog?: number, listeningListener?: (server: SimpleBootHttpServer, httpServer: Server) => void };
export interface ListenData extends Listen {
    port: number;
    hostname: string;
}
export class HttpServerOption extends SimOption {
    public static readonly DEFAULT_PORT = 8081;
    public static readonly DEFAULT_HOSTNAME = '127.0.0.1';
    public serverOption?: ServerOptions;
    public listen: ListenData;
    public filters?: (Filter|ConstructorType<Filter>)[];
    public requestEndPoints?: (EndPoint|ConstructorType<EndPoint>)[];
    public closeEndPoints?: (EndPoint|ConstructorType<EndPoint>)[];
    public errorEndPoints?: (EndPoint|ConstructorType<EndPoint>)[];
    public globalAdvice?: any|ConstructorType<any>;
    public noSuchRouteEndPointMappingThrow?: (rr: RequestResponse) => any;
    constructor({serverOption, listen, filters, requestEndPoints, closeEndPoints, errorEndPoints, globalAdvice, noSuchRouteEndPointMappingThrow}: {
                serverOption?: ServerOptions,
                listen?: Listen,
                filters?: (Filter|ConstructorType<Filter>)[],
                requestEndPoints?: (EndPoint|ConstructorType<EndPoint>)[],
                closeEndPoints?: (EndPoint|ConstructorType<EndPoint>)[],
                errorEndPoints?: (EndPoint|ConstructorType<EndPoint>)[],
                globalAdvice?: any|ConstructorType<any>,
                noSuchRouteEndPointMappingThrow?: (rr: RequestResponse) => any
                } = {}, advice: ConstructorType<any>[] = []) {
        super(advice);
        this.serverOption = serverOption;
        this.listen = Object.assign({port: HttpServerOption.DEFAULT_PORT, hostname: HttpServerOption.DEFAULT_HOSTNAME}, listen);
        this.filters = filters;
        this.requestEndPoints = requestEndPoints;
        this.closeEndPoints = closeEndPoints;
        this.errorEndPoints = errorEndPoints;
        this.globalAdvice = globalAdvice;
        this.noSuchRouteEndPointMappingThrow = noSuchRouteEndPointMappingThrow;
    }
}
