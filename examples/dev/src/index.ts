// @ts-ignore
import {SimpleBootHttpServer} from 'simple-boot-http-server/SimpleBootHttpServer';
import {HttpServerOption} from 'simple-boot-http-server/option/HttpServerOption';
import {AppRouter} from "./app/AppRouter";
import {Filter} from "simple-boot-http-server/filters/Filter";
import {IncomingMessage, ServerResponse} from "http";

const httpServerOption = new HttpServerOption();
httpServerOption.filters.push({
    on: (req: IncomingMessage, res: ServerResponse) => {
        console.log('1-----on')
    },
    before: (req: IncomingMessage, res: ServerResponse, moduleInstance: any) => {
        console.log('1-----before', moduleInstance)
    },
    after: (req: IncomingMessage, res: ServerResponse, moduleInstance: any) => {
        console.log('1-----after', moduleInstance)
    }
} as Filter,
{
    on: (req: IncomingMessage, res: ServerResponse) => {
        console.log('2-----on')
    },
    before: (req: IncomingMessage, res: ServerResponse, moduleInstance: any) => {
        console.log('2-----before', moduleInstance)
    },
    after: (req: IncomingMessage, res: ServerResponse, moduleInstance: any) => {
        console.log('2-----after', moduleInstance)
    }
} as Filter)
new SimpleBootHttpServer(AppRouter, httpServerOption).run();
console.log('simple-boot-http-server start host:' + (httpServerOption.listen.hostname ?? 'localhost'), ' port:' + httpServerOption.listen.port);
