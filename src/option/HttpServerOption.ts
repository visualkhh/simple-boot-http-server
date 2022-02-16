import {SimOption} from 'simple-boot-core/SimOption';
import {ConstructorType} from 'simple-boot-core/types/Types';
import {ServerOptions} from 'http';
import {Filter} from '../filters/Filter';
import { EndPoint } from '../endpoints/EndPoint';
import { Advice } from '../advices/Advice';
// import { Initializer } from '../initializers/Initializer';
// import { SimpleBootHttpServer } from '../SimpleBootHttpServer';

export type Listen = { port?: number, hostname?: string, backlog?: number, listeningListener?: () => void };

export class HttpServerOption extends SimOption {
    public serverOption?: ServerOptions;
    public listen: Listen;
    public filters?: (Filter|ConstructorType<Filter>)[];
    public requestEndPoints?: (EndPoint|ConstructorType<EndPoint>)[];
    public closeEndPoints?: (EndPoint|ConstructorType<EndPoint>)[];
    public errorEndPoints?: (EndPoint|ConstructorType<EndPoint>)[];
    public globalAdvice?: Advice|ConstructorType<Advice>;
    // public initializers: Initializer[] = [];
    // public initializersCallBack?: (app: SimpleBootHttpServer, initializerReturns: any[]) => void;
    constructor({serverOption, listen = {port: 8081}, filters, requestEndPoints, closeEndPoints, errorEndPoints, globalAdvice}: {
                serverOption?: ServerOptions,
                listen?: Listen,
                filters?: (Filter|ConstructorType<Filter>)[],
                requestEndPoints?: (EndPoint|ConstructorType<EndPoint>)[],
                closeEndPoints?: (EndPoint|ConstructorType<EndPoint>)[],
                errorEndPoints?: (EndPoint|ConstructorType<EndPoint>)[],
                globalAdvice?: Advice|ConstructorType<Advice>,
                } = {}, advice: ConstructorType<any>[] = []) {
        super(advice);
        this.serverOption = serverOption;
        this.listen = listen;
        this.filters = filters;
        this.requestEndPoints = requestEndPoints;
        this.closeEndPoints = closeEndPoints;
        this.errorEndPoints = errorEndPoints;
        this.globalAdvice = globalAdvice;
    }
}

