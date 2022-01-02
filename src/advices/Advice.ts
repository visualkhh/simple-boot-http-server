import {IncomingMessage, ServerResponse} from 'http';

export interface Advice {
    catch(e: any, req: IncomingMessage, res: ServerResponse): Promise<any>;
}