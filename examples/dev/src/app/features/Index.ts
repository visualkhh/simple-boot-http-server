import {HttpModule} from "simple-boot-http-server/module/HttpModule";
import {IncomingMessage, ServerResponse} from "http";
import {Sim} from "simple-boot-core/decorators/SimDecorator";
import {Before} from "simple-boot-core/decorators/aop/AOPDecorator";

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
