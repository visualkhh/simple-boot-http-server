import {Sim} from 'simple-boot-core/decorators/SimDecorator';
import {Route, Router} from 'simple-boot-core/decorators/route/Router';
import {GET} from 'simple-boot-http-server/decorators/MethodMapping';

@Sim()
@Router({
    path: '/users',
    route: {
        '': UserRouter
    }
})
export class UserRouter {
    @Route({path: '/detail'})
    @GET()
    user() {
        return {a: 2}
    }

    @GET()
    usesr() {
        return [{a: 2}]
    }
}