import {SimpleApplication} from 'simple-boot-core/SimpleApplication';
import {HttpServerOption} from "./option/HttpServerOption";
import {RouterManager} from "./router/RouterManager";
import * as http from 'http'
import {Server} from "http";

export class SimpleBootHttpServer extends SimpleApplication {
    public routerManager: RouterManager
    constructor(public option: HttpServerOption) {
        super(option);
        this.routerManager = new RouterManager(this.option, this.simstanceManager);
    }

    public run() {
        super.run();
        this.routerManager.run();
        let server: Server;
        if (this.option.serverOption) {
           server = http.createServer(this.option.serverOption, (req, res) => {
               this.routerManager.executeRouter(req, res);
           });
        } else {
           server = http.createServer((req, res) => {
               this.routerManager.executeRouter(req, res);
           });
        }
        server.listen(this.option.listen.port, this.option.listen.hostname, this.option.listen.backlog, this.option.listen.listeningListener)
    }
}
