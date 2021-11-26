import {IncomingMessage, ServerResponse} from 'http';

export interface Filter {
    on(req: IncomingMessage, res: ServerResponse): void;
    before(req: IncomingMessage, res: ServerResponse, moduleInstance: any): void;
    after(req: IncomingMessage, res: ServerResponse, moduleInstance: any): void;
}