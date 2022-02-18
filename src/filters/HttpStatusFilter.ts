import { Filter } from '../filters/Filter';
import {IncomingMessage, ServerResponse} from 'http';
import {HttpStatus} from 'codes/HttpStatus';
import {RequestResponse} from '../models/RequestResponse';
import {SimpleBootHttpServer} from '../SimpleBootHttpServer';

export class HttpStatusFilter implements Filter {

    constructor(private httpStatus: HttpStatus | number) {
    }

    async before(rr: RequestResponse, app: SimpleBootHttpServer) {
        // res.writeHead(this.httpStatus);
        rr.res.statusCode = this.httpStatus;
        rr.res.end();
        return false;
    }

     async after(rr: RequestResponse, app: SimpleBootHttpServer) {
        return true;
    }
}
