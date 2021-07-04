import 'reflect-metadata'
import {SimstanceManager} from 'simple-boot-core/simstance/SimstanceManager';
import {Runnable} from 'simple-boot-core/run/Runnable';
import {Router} from './Router';
import {RouterModule} from './RouterModule';
import {HttpServerOption} from "../option/HttpServerOption";
import {IncomingMessage, ServerResponse} from "http";
// import * as url from 'url'
import {URL} from 'url';

export class RouterManager implements Runnable {
    constructor(private option: HttpServerOption, private simstanceManager: SimstanceManager) {
    }

    public run() {
    }

    public executeRouter(req: IncomingMessage, res: ServerResponse) {
        const url = new URL(req.url!, 'http://' + req.headers.host);
        const routers: Router[] = [];
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
}
