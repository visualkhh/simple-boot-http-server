import {Router} from "simple-boot-http-server/router/Router";
import {Sim} from "simple-boot-core/decorators/SimDecorator";
import {Hello} from "./features/hello";
import {Index} from "./features/Index";
import {UsersRouter} from "./features/users/UsersRouter";

@Sim({})
export class AppRouter extends Router {
    '' = Index
    '/' = Index
    '/hello' = Hello

    constructor() {
        super('',[UsersRouter]);
    }
}
