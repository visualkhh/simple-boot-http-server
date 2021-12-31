import { Filter } from '../filters/Filter';
import {IncomingMessage, ServerResponse} from 'http';
import {HttpStatus} from 'codes/HttpStatus';

export class HttpStatusFilter implements Filter {

    constructor(private httpStatus: HttpStatus | number) {
    }

    async before(req: IncomingMessage, res: ServerResponse) {
        res.writeHead(this.httpStatus);
        res.end();
        return false;
    }

    async after(req: IncomingMessage, res: ServerResponse) {
        return true;
    }
}
