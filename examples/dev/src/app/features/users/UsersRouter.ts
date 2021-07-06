import {HttpRouter} from "simple-boot-http-server/router/HttpRouter";
import {Sim} from "simple-boot-core/decorators/SimDecorator";
import {Index} from "./Index";
import {Hello} from "./hello";

@Sim({})
export class UsersRouter extends HttpRouter {
    '' = Index
    '/' = Index
    '/hello' = Hello

    constructor() {
        super('/users');
    }
}
