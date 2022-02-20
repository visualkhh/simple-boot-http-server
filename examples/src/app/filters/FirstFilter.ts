import {Filter} from 'simple-boot-http-server/filters/Filter';
import {SimpleBootHttpServer} from 'simple-boot-http-server';
import {RequestResponse} from 'simple-boot-http-server/models/RequestResponse';

export class FirstFilter implements Filter {
    before(rr: RequestResponse, app: SimpleBootHttpServer): Promise<boolean> {
        console.log('filter before')
        rr.resSetHeader('zz222', '12221')
        return Promise.resolve(true);
    }

    after(rr: RequestResponse, app: SimpleBootHttpServer, sw: boolean): Promise<boolean> {
        rr.resSetHeader('zz', '11')
        return Promise.resolve(true);
    }
}