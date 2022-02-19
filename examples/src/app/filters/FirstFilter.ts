import {Filter} from 'simple-boot-http-server/filters/Filter';
import {SimpleBootHttpServer} from 'simple-boot-http-server';
import {RequestResponse} from "simple-boot-http-server/models/RequestResponse";

export class FirstFilter implements Filter {
    after(rr: RequestResponse, app: SimpleBootHttpServer, sw: boolean): Promise<boolean> {
        console.log('filter after')
        return Promise.resolve(true);
    }

    before(rr: RequestResponse, app: SimpleBootHttpServer): Promise<boolean> {
        console.log('filter before')
        return Promise.resolve(true);
    }
}