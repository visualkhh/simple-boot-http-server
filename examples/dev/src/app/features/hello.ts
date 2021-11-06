import {IncomingMessage, ServerResponse} from "http";
import {Sim} from "simple-boot-core/decorators/SimDecorator";
import {RouterManager} from "simple-boot-core/route/RouterManager";
import { OnReceiver } from 'simple-boot-http-server/lifecycle/OnReceiver';

@Sim({})
export class Hello implements OnReceiver{

    constructor(private routerManager: RouterManager) {
    }

    onReceive(req: IncomingMessage, res: ServerResponse) {
        // console.log('request', req.url, req.method, this.routerManager.activeRouterModule?.pathData)
        // res.writeHead(200, {'Content-Type': 'text/plain'});
        // res.write("222222222222 World\n\n");
        // var text = 'Create Server test\n';
        // text += 'Server running at http://localhost:8081/ \n';
        // res.end(text);

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ a: 1 }));
    }
}
