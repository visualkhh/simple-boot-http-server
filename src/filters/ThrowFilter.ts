import { Filter } from '../filters/Filter';
import {IncomingMessage, ServerResponse} from 'http';
import { RequestResponse } from '../models/RequestResponse';

export class ThrowFilter implements Filter {

    constructor(private error: any) {
    }

    async before(req: IncomingMessage, res: ServerResponse) {
        return true;
    }

    async after(req: IncomingMessage, res: ServerResponse) {
        const requestResponse = new RequestResponse(req, res);
        const sw = requestResponse.resIsDone();
        if (!sw) {
            throw this.error;
        };
        return false;
    }
}
