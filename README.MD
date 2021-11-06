SIMPLE-BOOT-HTTP-SERVER
===

```typescript
// @ts-ignore
import {SimpleBootHttpServer} from 'simple-boot-http-server/SimpleBootHttpServer';
import {HttpServerOption} from 'simple-boot-http-server/option/HttpServerOption';
import {AppRouter} from "./app/AppRouter";

const httpServerOption = new HttpServerOption();
new SimpleBootHttpServer(AppRouter, httpServerOption).run();
console.log('simple-boot-http-server start host:' + (httpServerOption.listen.hostname ?? 'localhost'), ' port:' + httpServerOption.listen.port);
```
```typescript
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

```
```typescript
import {IncomingMessage, ServerResponse} from "http";
import {Sim} from "simple-boot-core/decorators/SimDecorator";
import {After, Before} from "simple-boot-core/decorators/aop/AOPDecorator";
import { OnReceiver } from 'simple-boot-http-server/lifecycle/OnReceiver';

@Sim()
export class Index implements OnReceiver {
    onReceive(req: IncomingMessage, res: ServerResponse) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write("11111111111111Hello World\n\n");
        var text = 'Create Server test\n';
        text += 'Server running at http://localhost:8081/ \n';
        res.end(text);
    }

    @Before({property: 'receive'})
    test() {
        console.log('---')
    }
    @After({property: 'receive'})
    test2() {
        console.log('--22222-')
    }
}
```
```typescript
import {IncomingMessage, ServerResponse} from "http";
import {Sim} from "simple-boot-core/decorators/SimDecorator";
import {RouterManager} from "simple-boot-core/route/RouterManager";
import { OnReceiver } from 'simple-boot-http-server/lifecycle/OnReceiver';

@Sim({})
export class Hello implements OnReceiver{

    constructor(private routerManager: RouterManager) {
    }

    onReceive(req: IncomingMessage, res: ServerResponse) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ a: 1 }));
    }
}

```
