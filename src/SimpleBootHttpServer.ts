import {SimpleApplication} from 'simple-boot-core/SimpleApplication';
import {HttpServerOption} from './option/HttpServerOption';
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
        const server = this.option.serverOption ? new Server(this.option.serverOption) : new Server();
        server.on('request', (req: IncomingMessage, res: ServerResponse) => {
            this.option.filters.forEach(it => it.on?.(req, res));
            const url = new URL(req.url!, 'http://' + req.headers.host);
            const intent = new Intent(req.url ?? '', url);
            this.routing(intent).then(it => {
                // console.log('routing-->', it)
                const moduleInstance = it.getModuleInstance<any>();
                this.option.filters.forEach(it => it.before?.(req, res, moduleInstance));
                if (moduleInstance) {
                    moduleInstance?.onReceive?.(req, res);
                } else {
                    it.router?.onNotFoundReceiver?.(req, res);
                }
                this.option.filters.slice().reverse().forEach(it => it.after?.(req, res, moduleInstance));
                res.end();
            }).catch(it => {
                console.log('catch-->', it)
            })
        });
        server.listen(this.option.listen.port, this.option.listen.hostname, this.option.listen.backlog, this.option.listen.listeningListener)
    }
}
