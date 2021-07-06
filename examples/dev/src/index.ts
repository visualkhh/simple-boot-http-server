// @ts-ignore
import {SimpleBootHttpServer} from 'simple-boot-http-server/SimpleBootHttpServer';
import {HttpServerOption} from 'simple-boot-http-server/option/HttpServerOption';
import {AppRouter} from "./app/AppRouter";

const opiton = new HttpServerOption();
new SimpleBootHttpServer(AppRouter, opiton).run();
