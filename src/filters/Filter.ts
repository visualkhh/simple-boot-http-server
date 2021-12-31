import {IncomingMessage, ServerResponse} from 'http';
import { SimpleBootHttpServer } from '../SimpleBootHttpServer';

export interface Filter {
    before(req: IncomingMessage, res: ServerResponse, app: SimpleBootHttpServer): Promise<boolean>;
    after(req: IncomingMessage, res: ServerResponse, app: SimpleBootHttpServer): Promise<boolean>;
}
