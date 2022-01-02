import {IncomingMessage, ServerResponse} from 'http';

export interface EndPoint {
    endPoint(req: IncomingMessage, res: ServerResponse): void;
}