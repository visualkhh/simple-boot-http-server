import {SimpleApplication} from 'simple-boot-core/SimpleApplication';
import {HttpServerOption} from "./option/HttpServerOption";
import {IncomingMessage, Server, ServerResponse} from 'http'
import {HttpRouter} from "./router/HttpRouter";
import {ConstructorType} from "simple-boot-core/types/Types";
import {URL} from "url";
import {Intent} from "simple-boot-core/intent/Intent";
import {HttpModule} from "./module/HttpModule";

export class SimpleBootHttpServer extends SimpleApplication {
    constructor(public rootRouter: ConstructorType<HttpRouter>, public option: HttpServerOption) {
        super(rootRouter, option);
    }

    public run() {
        super.run();
        let server = this.option.serverOption ? new Server(this.option.serverOption) : new Server();
        server.on('request', (req: IncomingMessage, res: ServerResponse) => {
            // const url = new URL(req.url!, 'http://' + req.headers.host);
            const intent = new Intent(req.url ?? '');
            this.routing<HttpRouter, HttpModule>(intent).then(it => {
                it.getModuleInstance()?.receive(req, res);
            }).catch(it => {
                console.log('catch-->', it)
            })
        });
        server.listen(this.option.listen.port, this.option.listen.hostname, this.option.listen.backlog, this.option.listen.listeningListener)
    }

}


/*
 public executeRouter(req: IncomingMessage, res: ServerResponse) {
        const url = new URL(req.url!, 'http://' + req.headers.host);
        const routers: HttpRouter[] = [];
        // const navigation = this.simstanceManager.getOrNewSim(Navigation)!;
        const rootRouter = this.simstanceManager.getOrNewSim(this.option.rootRouter);
        let executeModule = rootRouter?.getExecuteModule(url, routers);
        if (!executeModule) {
            // notfound find
            let notFound;
            for (const route of routers.slice().reverse()) {
                const nf = route.notFound(url);
                if (nf) {
                    notFound = nf;
                    break;
                }
            }
            notFound = notFound ?? rootRouter?.notFound(url);
            executeModule = new RouterModule(rootRouter, this.simstanceManager?.getOrNewSim(notFound));
        }

        if (executeModule.module) {
            executeModule.router?.canActivate(url, executeModule).then(targetModule => {
                // console.log('targetModule==>', targetModule)
                if (targetModule) {
                    // Module render
                    const module = targetModule instanceof RouterModule ? targetModule.module : this.simstanceManager?.getOrNewSim(targetModule)!;
                    module?.receive(req, res);
                    module?.onInitedChild();
                    routers.reverse().forEach(it => (this.simstanceManager?.getOrNewSim(it.module) as any)?._onInitedChild());
                }
            })
        } else {
            // this.renderer.render('404 not found')
        }
    }
 */
