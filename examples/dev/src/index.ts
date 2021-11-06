// @ts-ignore
import {SimpleBootHttpServer} from 'simple-boot-http-server/SimpleBootHttpServer';
import {HttpServerOption} from 'simple-boot-http-server/option/HttpServerOption';
import {AppRouter} from "./app/AppRouter";

const httpServerOption = new HttpServerOption();
new SimpleBootHttpServer(AppRouter, httpServerOption).run();
console.log('simple-boot-http-server start host:' + (httpServerOption.listen.hostname ?? 'localhost'), ' port:' + httpServerOption.listen.port);
