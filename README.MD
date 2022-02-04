SIMPLE-BOOT-HTTP-SERVER
===

```typescript
// @ts-ignore
const httpServerOption = new HttpServerOption();
httpServerOption.filters = [new FirstFilter()];
new SimpleBootHttpServer(AppRouter, httpServerOption).run();
console.log('simple-boot-http-server start host:' + (httpServerOption.listen.hostname ?? 'localhost'), ' port:' + httpServerOption.listen.port);
```
```typescript
@Sim()
@Router({
    path: '',
    route: {
        '': '/',
        '/': Hello
    }
})
export class AppRouter {
    constructor() {
    }
}

```
```typescript
@Sim()
export class Hello {

    constructor() {
    }

    @GET()
    get(rr: RequestResponse) {
        console.log('load Hello.get()', rr);
        rr.res.setHeader('Content-Type', 'application/json');
        rr.res.end(JSON.stringify({ a: 1 }));
    }
}
```
```typescript
export class FirstFilter implements Filter {
    after(req: IncomingMessage, res: ServerResponse, app: SimpleBootHttpServer, sw: boolean): Promise<boolean> {
        console.log('filter after')
        return Promise.resolve(true);
    }

    before(req: IncomingMessage, res: ServerResponse, app: SimpleBootHttpServer): Promise<boolean> {
        console.log('filter before')
        return Promise.resolve(true);
    }
}
```
