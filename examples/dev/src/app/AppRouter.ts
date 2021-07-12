import {Sim} from "simple-boot-core/decorators/SimDecorator";
import {Hello} from "./features/hello";
import {Index} from "./features/Index";
import {UsersRouter} from "./features/users/UsersRouter";
import {Intent} from "simple-boot-core/intent/Intent";
import {ConstructorType} from "simple-boot-core/types/Types";
import {Module} from "simple-boot-core/module/Module";
import {NotFound} from "./features/users/NotFound";
import {Router} from "simple-boot-core/route/Router";

@Sim()
export class AppRouter extends Router {
    '' = Index
    '/' = Index
    '/hello' = Hello
    '/hello/:zzz' = Hello

    constructor() {
        super('', [UsersRouter]);
    }
    notFound(url: Intent): ConstructorType<Module> | undefined {
        return undefined;
    }
}
