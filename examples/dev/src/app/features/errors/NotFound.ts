import {IncomingMessage, ServerResponse} from "http";
import {Sim} from "simple-boot-core/decorators/SimDecorator";
import { OnReceiver } from 'simple-boot-http-server/lifecycle/OnReceiver';

@Sim()
export class NotFound implements OnReceiver{
    onReceive(req: IncomingMessage, res: ServerResponse) {
        console.log('request', req.url, req.method)
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write("NotFound index\n\n");
        var text = 'NotFound test\n';
        text += 'SNotFound/ \n';
        res.end(text);
    }
}
