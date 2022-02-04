import {HttpServerOption} from 'simple-boot-http-server/option/HttpServerOption';
import {SimpleBootHttpServer} from 'simple-boot-http-server';
import {AppRouter} from './app/AppRouter';
import {FirstFilter} from './app/filters/FirstFilter';

const httpServerOption = new HttpServerOption();
httpServerOption.filters = [new FirstFilter()];
new SimpleBootHttpServer(AppRouter, httpServerOption).run();
console.log('simple-boot-http-server start host:' + (httpServerOption.listen.hostname ?? 'localhost'), ' port:' + httpServerOption.listen.port);
