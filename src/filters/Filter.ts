import {IncomingMessage, ServerResponse} from 'http';
import { SimpleBootHttpServer } from '../SimpleBootHttpServer';
import {RequestResponse} from '../models/RequestResponse';

export interface Filter {
    before(rr: RequestResponse, app: SimpleBootHttpServer): Promise<boolean>;
    after(rr: RequestResponse, app: SimpleBootHttpServer, sw: boolean): Promise<boolean>;
}
