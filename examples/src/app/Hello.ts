import {IncomingMessage, ServerResponse} from "http";
import {Sim} from "simple-boot-core/decorators/SimDecorator";
import {RouterManager} from "simple-boot-core/route/RouterManager";
import {GET} from 'simple-boot-http-server/decorators/MethodMapping';
import {RequestResponse} from 'simple-boot-http-server/models/RequestResponse';


@Sim()
export class Hello {

    constructor() {
    }

    @GET()
    get(rr: RequestResponse) {
        console.log('------load Hello.get()------', rr);
        rr.res.setHeader('Content-Type', 'application/json');
        rr.res.end(JSON.stringify({ a: 1 }));
    }
}
