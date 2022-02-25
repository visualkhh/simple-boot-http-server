import {Hello} from './Hello';
import {Sim} from 'simple-boot-core/decorators/SimDecorator';
import {Route, Router} from 'simple-boot-core/decorators/route/Router';
import {GET, POST} from 'simple-boot-http-server/decorators/MethodMapping';
import {RequestResponse} from 'simple-boot-http-server/models/RequestResponse';
import {ReqHeader} from 'simple-boot-http-server/models/datas/ReqHeader';
import {RouterModule} from 'simple-boot-core/route/RouterModule';
import {Mimes} from 'simple-boot-http-server/codes/Mimes';

@Sim()
@Router({
    path: ''
})
export class AppRouter {
    constructor() {
    }

    @Route({path: '/hello'}) @GET()
    hh(rr: RequestResponse, header: ReqHeader, routerModule: RouterModule) {
        return {a: 2}
    }

    @Route({path: '/{user:[0-9]}/world'})
    @GET()
    ww(rr: RequestResponse, header: ReqHeader, routerModule: RouterModule) {
        console.log('uui->', routerModule.pathData)
        return {a: 233}
    }

    @Route({path: '/{userName:[a-zA-Z]}/world'})
    @GET()
    w22w(rr: RequestResponse, header: ReqHeader, routerModule: RouterModule) {
        console.log('uui->', routerModule.pathData)
        return {a: 2332222}
    }

    // @Route({path: '/{userName:[a-zA-Z]}/world'})
    // @POST({req: {contentType: [Mimes.ApplicationJson]}})
    // wssw(rr: RequestResponse, header: ReqHeader, routerModule: RouterModule) {
    //     console.log('uu22222i->', routerModule.pathData)
    //     return {a: 23333}
    // }
}
