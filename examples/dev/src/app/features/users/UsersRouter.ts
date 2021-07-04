import {Router} from "simple-boot-http-server/router/Router";
import {Sim} from "simple-boot-core/decorators/SimDecorator";
import {Index} from "./Index";
import {Hello} from "./hello";

@Sim({})
export class UsersRouter extends Router {
    '' = Index
    '/' = Index
    '/hello' = Hello

    constructor() {
        super('/users');
    }
}
