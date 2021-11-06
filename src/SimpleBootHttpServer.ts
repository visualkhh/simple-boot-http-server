import {SimpleApplication} from 'simple-boot-core/SimpleApplication';
import {HttpServerOption} from "./option/HttpServerOption";
import {ConstructorType} from 'simple-boot-core/types/Types';
import {Intent} from 'simple-boot-core/intent/Intent';
import {URL} from 'url';
import {IncomingMessage, Server, ServerResponse} from 'http'

export class SimpleBootHttpServer extends SimpleApplication {
    constructor(public rootRouter: ConstructorType<Object>, public option: HttpServerOption = new HttpServerOption()) {
        super(rootRouter, option);
    }

    public run() {
        super.run();
        let server = this.option.serverOption ? new Server(this.option.serverOption) : new Server();
        server.on('request', (req: IncomingMessage, res: ServerResponse) => {
            const url = new URL(req.url!, 'http://' + req.headers.host);
            const intent = new Intent(req.url ?? '', url);
            this.routing(intent).then(it => {
                console.log('routring-->', it)
                const moduleInstance = it.getModuleInstance<any>();
                if (moduleInstance) {
                    moduleInstance?.onReceive?.(req, res);
                } else {
                    it.router?.onNotFoundReceiver?.(req, res);
                }
                res.end();
            }).catch(it => {
                console.log('catch-->', it)
            })
        });
        server.listen(this.option.listen.port, this.option.listen.hostname, this.option.listen.backlog, this.option.listen.listeningListener)
    }
}
