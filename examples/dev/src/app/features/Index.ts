import {ReceiveModule} from "simple-boot-http-server/module/ReceiveModule";
import {IncomingMessage, ServerResponse} from "http";
import {Sim} from "simple-boot-core/decorators/SimDecorator";
import {Before} from "simple-boot-core/decorators/aop/AOPDecorator";

@Sim()
export class Index extends ReceiveModule {
    receive(req: IncomingMessage, res: ServerResponse) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write("11111111111111Hello World\n\n");
        var text = 'Create Server test\n';
        text += 'Server running at http://localhost:8081/ \n';
        res.end(text);
    }
}
