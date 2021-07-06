import {HttpRouter} from "simple-boot-http-server/router/HttpRouter";
import {Sim} from "simple-boot-core/decorators/SimDecorator";
import {Hello} from "./features/hello";
import {Index} from "./features/Index";
import {UsersRouter} from "./features/users/UsersRouter";
import {Intent} from "simple-boot-core/intent/Intent";
import {ConstructorType} from "simple-boot-core/types/Types";
import {Module} from "simple-boot-core/module/Module";
import {NotFound} from "./features/users/NotFound";

@Sim()
export class AppRouter extends HttpRouter {
    '' = Index
    '/' = Index
    '/hello' = Hello

    constructor() {
        super('', [UsersRouter]);
    }


    notFound(url: Intent): ConstructorType<Module> | undefined {
        console.log('notfound-----------', url)
        return NotFound;
    }
}
