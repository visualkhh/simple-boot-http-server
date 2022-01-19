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
    public listen: Listen = {port: 8081};
    public filters?: (Filter|ConstructorType<Filter>)[] = [];
    public requestEndPoints?: EndPoint[];
    public closeEndPoints?: EndPoint[];
    public errorEndPoints?: EndPoint[];
    public globalAdvice?: Advice;
    // public initializers: Initializer[] = [];
    // public initializersCallBack?: (app: SimpleBootHttpServer, initializerReturns: any[]) => void;
    constructor(advice: ConstructorType<any>[] = []) {
        super(advice);
    }
}

