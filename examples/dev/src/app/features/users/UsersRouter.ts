import {Sim} from "simple-boot-core/decorators/SimDecorator";
import {Index} from "./Index";
import {Hello} from "./hello";
import {Router} from "simple-boot-core/route/Router";

@Sim({})
export class UsersRouter extends Router {
    '' = Index
    '/' = Index
    '/hello' = Hello

    constructor() {
        super('/users');
    }
}
