import {Router} from '../router/Router';
import {SimOption} from 'simple-boot-core/SimOption';
import {ConstructorType} from 'simple-boot-core/types/Types';
import {ServerOptions} from "http";

export type Listen = {port?: number, hostname?: string, backlog?: number, listeningListener?: () => void};
export class HttpServerOption extends SimOption {
    public serverOption?: ServerOptions;
    public listen: Listen = {port: 8081};

    constructor(public rootRouter: ConstructorType<Router>, advice: ConstructorType<any>[] = []) {
        super(advice);
    }

    setRootRouter(rootRouter: ConstructorType<Router>): HttpServerOption {
        this.rootRouter = rootRouter;
        return this;
    }
}
