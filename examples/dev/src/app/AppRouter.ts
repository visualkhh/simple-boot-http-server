import { Router, Sim } from "simple-boot-core/decorators/SimDecorator";
import {Hello} from "./features/hello";
import {Index} from "./features/Index";
import {UsersRouter} from "./features/users/UsersRouter";
import {Intent} from "simple-boot-core/intent/Intent";
import {ConstructorType} from "simple-boot-core/types/Types";
import {NotFound} from "src/app/features/errors/NotFound";
import { RouterAction } from 'simple-boot-core/route/RouterAction';
import { OnNotFoundReceiver } from 'simple-boot-http-server/lifecycle/OnNotFoundReceiver';
import { IncomingMessage, ServerResponse } from 'http';

@Sim()
@Router({
    path: '',
    route: {
        '': Index,
        '/': Index,
        '/hello': Hello,
        '/hello/:zzz': Hello
    }
})
export class AppRouter implements RouterAction, OnNotFoundReceiver{
    constructor(private notFound: NotFound) {

    }

    canActivate(url: Intent, module: any): void {
        console.log('ii', url, module)
    }

    onNotFoundReceiver(req: IncomingMessage, res: ServerResponse): any {
        this.notFound.onReceive(req, res);
    }

}
