import {ReceiveModule} from "simple-boot-http-server/module/ReceiveModule";
import {IncomingMessage, ServerResponse} from "http";
import {Sim} from "simple-boot-core/decorators/SimDecorator";

@Sim({})
export class Hello extends ReceiveModule {

    receive(req: IncomingMessage, res: ServerResponse) {
        console.log('request', req.url, req.method)
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write("user hello\n\n");
        var text = 'Create Server test\n';
        text += 'Server running at http://localhost:8081/ \n';
        res.end(text);
    }
}
