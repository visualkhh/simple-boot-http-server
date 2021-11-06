import {IncomingMessage, ServerResponse} from "http";
import {Sim} from "simple-boot-core/decorators/SimDecorator";
import { OnReceiver } from 'simple-boot-http-server/lifecycle/OnReceiver';

@Sim({})
export class Hello implements OnReceiver {

    onReceive(req: IncomingMessage, res: ServerResponse) {
        console.log('request', req.url, req.method)
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write("user hello\n\n");
        var text = 'Create Server test\n';
        text += 'Server running at http://localhost:8081/ \n';
        res.end(text);
    }
}
