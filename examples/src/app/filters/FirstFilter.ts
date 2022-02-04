import {Filter} from 'simple-boot-http-server/filters/Filter';
import {IncomingMessage, ServerResponse} from 'http';
import {SimpleBootHttpServer} from 'simple-boot-http-server';

export class FirstFilter implements Filter {
    after(req: IncomingMessage, res: ServerResponse, app: SimpleBootHttpServer, sw: boolean): Promise<boolean> {
        console.log('filter after')
        return Promise.resolve(true);
    }

    before(req: IncomingMessage, res: ServerResponse, app: SimpleBootHttpServer): Promise<boolean> {
        console.log('filter before')
        return Promise.resolve(true);
    }
}