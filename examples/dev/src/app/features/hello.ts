import {HttpModule} from "simple-boot-http-server/module/HttpModule";
import {IncomingMessage, ServerResponse} from "http";
import {Sim} from "simple-boot-core/decorators/SimDecorator";
import {RouterManager} from "simple-boot-core/route/RouterManager";

@Sim({})
export class Hello extends HttpModule {

    constructor(private routerManager: RouterManager) {
        super();
    }

    receive(req: IncomingMessage, res: ServerResponse) {
        console.log('request', req.url, req.method, this.routerManager.activeRouterModule?.pathData)
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write("222222222222 World\n\n");
        var text = 'Create Server test\n';
        text += 'Server running at http://localhost:8081/ \n';
        res.end(text);
    }
}
