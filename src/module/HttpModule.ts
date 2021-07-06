import {Module} from "simple-boot-core/module/Module";
import {IncomingMessage, ServerResponse} from "http";

export abstract class HttpModule extends Module {

    receive(req: IncomingMessage, res: ServerResponse) {
    }
}
