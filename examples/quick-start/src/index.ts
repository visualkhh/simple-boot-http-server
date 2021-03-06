import {HttpServerOption} from 'simple-boot-http-server/option/HttpServerOption';
import {SimpleBootHttpServer} from 'simple-boot-http-server';
import {Sim} from 'simple-boot-core/decorators/SimDecorator';
import {Route, Router} from 'simple-boot-core/decorators/route/Router';
import {GET} from 'simple-boot-http-server/decorators/MethodMapping';
import {Mimes} from 'simple-boot-http-server/codes/Mimes';
import {RequestResponse} from 'simple-boot-http-server/models/RequestResponse';
import {ReqHeader} from 'simple-boot-http-server/models/datas/ReqHeader';
import {RouterModule} from 'simple-boot-core/route/RouterModule';

@Sim() @Router({path: ''})
export class AppRouter {
    @Route({path: '/'}) @GET({res: {contentType: Mimes.ApplicationJson}})
    index(rr: RequestResponse, header: ReqHeader, routerModule: RouterModule) {
        return {name: 'visualkhh'}
    }
}

const httpServerOption = new HttpServerOption({
    listen: {
        listeningListener: (server, httpServer) => {
            console.log('server on', httpServer.address());
        }
    }
});

const app = new SimpleBootHttpServer(AppRouter, httpServerOption);
app.run();
