SIMPLE-BOOT-HTTP-SERVER
===

```typescript
const opiton = new HttpServerOption(AppRouter);
new SimpleBootHttpServer(opiton).run();
```
```typescript
@Sim({})
export class AppRouter extends Router {
    '' = Index
    '/' = Index
    '/hello' = Hello

    constructor() {
        super('',[UsersRouter]);
    }
}
```
```typescript
@Sim({})
export class Index extends ReceiveModule {
    receive(req: IncomingMessage, res: ServerResponse) {
        console.log('request', req.url, req.method)
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write("11111111111111Hello World\n\n");
        var text = 'Create Server test\n';
        text += 'Server running at http://localhost:8081/ \n';
        res.end(text);
    }
}

```
