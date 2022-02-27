import {HttpServerOption} from 'simple-boot-http-server/option/HttpServerOption';
import {SimpleBootHttpServer} from 'simple-boot-http-server';
// import {AppRouter} from './app/AppRouter';
import {FirstFilter} from './app/filters/FirstFilter';
import {NotFoundError} from 'simple-boot-http-server/errors/NotFoundError';
import {Advice} from './app/advices/Advice';
import {UserRouter} from './app/UserRouter';
import {Sim} from 'simple-boot-core/decorators/SimDecorator';
import {Route, Router} from 'simple-boot-core/decorators/route/Router';
import {GET} from 'simple-boot-http-server/decorators/MethodMapping';
import {Mimes} from 'simple-boot-http-server/codes/Mimes';
import {RequestResponse} from 'simple-boot-http-server/models/RequestResponse';
import {ReqHeader} from 'simple-boot-http-server/models/datas/ReqHeader';
import {RouterModule} from 'simple-boot-core/route/RouterModule';
import {EndPoint} from 'simple-boot-http-server/endpoints/EndPoint';
@Sim() @Router({path: ''})
export class AppRouter {
    @Route({path: '/'}) @GET({res: {contentType: Mimes.ApplicationJson}})
    index(rr: RequestResponse, header: ReqHeader, routerModule: RouterModule) {
        return {name: 'visualkhh'}
    }
}
new SimpleBootHttpServer(AppRouter).run().then(it => {
    console.log('server starting..', it.option.listen)
})

@Sim()
class CloseEndPoint implements EndPoint {
    async endPoint(rr: RequestResponse, app: SimpleBootHttpServer) {
        console.log('close request response')
    }
}
@Sim()
class ErrorEndPoint implements EndPoint {
    async endPoint(rr: RequestResponse, app: SimpleBootHttpServer) {
        console.log('error')
    }
}
const httpServerOption = new HttpServerOption({
    filters: [new FirstFilter()],
    globalAdvice: Advice,
    errorEndPoints: [CloseEndPoint],
    closeEndPoints: [ErrorEndPoint],
    noSuchRouteEndPointMappingThrow: rr => new NotFoundError()
});
new SimpleBootHttpServer(AppRouter, httpServerOption).run();
// console.log('simple-boot-http-server start host:' + (httpServerOption.listen.hostname ?? 'localhost'), ' port:' + httpServerOption.listen.port);
