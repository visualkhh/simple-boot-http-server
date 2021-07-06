SIMPLE-BOOT-HTTP-SERVER
===

```typescript
new SimpleBootHttpServer(AppRouter, new HttpServerOption()).run();
```
```typescript
@Sim()
export class AppRouter extends Router {
    '' = Index
    '/' = Index
    '/hello' = Hello

    constructor() {
        super('', [UsersRouter]);
    }
    notFound(url: Intent): ConstructorType<Module> | undefined {
        return NotFound;
    }
}

```
```typescript
@Sim()
export class Index extends HttpModule {
    receive(req: IncomingMessage, res: ServerResponse) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write("11111111111111Hello World\n\n");
        var text = 'Create Server test\n';
        text += 'Server running at http://localhost:8081/ \n';
        res.end(text);
    }
}
```
