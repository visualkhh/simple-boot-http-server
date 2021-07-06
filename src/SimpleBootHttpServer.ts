import {SimpleApplication} from 'simple-boot-core/SimpleApplication';
import {HttpServerOption} from "./option/HttpServerOption";
import {IncomingMessage, Server, ServerResponse} from 'http'
import {ConstructorType} from "simple-boot-core/types/Types";
import {Intent} from "simple-boot-core/intent/Intent";
import {HttpModule} from "./module/HttpModule";
import {Router} from "simple-boot-core/route/Router";

export class SimpleBootHttpServer extends SimpleApplication {
    constructor(public rootRouter: ConstructorType<Router>, public option: HttpServerOption = new HttpServerOption()) {
        super(rootRouter, option);
    }

    public run() {
        super.run();
        let server = this.option.serverOption ? new Server(this.option.serverOption) : new Server();
        server.on('request', (req: IncomingMessage, res: ServerResponse) => {
            // const url = new URL(req.url!, 'http://' + req.headers.host);
            const intent = new Intent(req.url ?? '');
            this.routing(intent).then(it => {
                it.getModuleInstance<HttpModule>()?.receive(req, res);
            }).catch(it => {
                console.log('catch-->', it)
            })
        });
        server.listen(this.option.listen.port, this.option.listen.hostname, this.option.listen.backlog, this.option.listen.listeningListener)
    }
}
