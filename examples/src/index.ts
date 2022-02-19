import {HttpServerOption} from 'simple-boot-http-server/option/HttpServerOption';
import {SimpleBootHttpServer} from 'simple-boot-http-server';
import {AppRouter} from './app/AppRouter';
import {FirstFilter} from './app/filters/FirstFilter';
import {NotFoundError} from 'simple-boot-http-server/errors/NotFoundError';
import {Advice} from './app/advices/Advice';

const httpServerOption = new HttpServerOption({
    filters: [new FirstFilter()],
    globalAdvice: Advice,
    noSuchRouteEndPointMappingThrow: rr => new NotFoundError()
});
new SimpleBootHttpServer(AppRouter, httpServerOption).run();
console.log('simple-boot-http-server start host:' + (httpServerOption.listen.hostname ?? 'localhost'), ' port:' + httpServerOption.listen.port);
