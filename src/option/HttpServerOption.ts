import {SimOption} from 'simple-boot-core/SimOption';
import {ConstructorType} from 'simple-boot-core/types/Types';
import {ServerOptions} from "http";

export type Listen = { port?: number, hostname?: string, backlog?: number, listeningListener?: () => void };

export class HttpServerOption extends SimOption {
    public serverOption?: ServerOptions;
    public listen: Listen = {port: 8081};

    constructor(advice: ConstructorType<any>[] = []) {
        super(advice);
    }
}
