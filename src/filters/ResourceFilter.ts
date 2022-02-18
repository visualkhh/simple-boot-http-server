import { Filter } from '../filters/Filter';
import { IncomingMessage, ServerResponse } from 'http';
import fs from 'fs';
import path from 'path';
import mime from 'mime-types';
import {HttpHeaders} from '../codes/HttpHeaders';
import {HttpStatus} from '../codes/HttpStatus';
import {SimpleBootHttpServer} from '../SimpleBootHttpServer';
import {RequestResponse} from '../models/RequestResponse';

export class ResourceFilter implements Filter {
    constructor(private resourceDistPath: string, private resourceRegex: string[] = []) {
    }

    async before(rr: RequestResponse, app: SimpleBootHttpServer) {
        const url = (rr.req.url ?? '').replace(/\.\./g, '');
        let sw = true;
        const regExps = this.resourceRegex.filter(it => RegExp(it).test(url))
        for (const it of regExps) {
            const resourcePath = path.join(this.resourceDistPath, url); // url.replace(it, '')
            if (fs.existsSync(resourcePath)) {
                const header = {} as any;
                // header[HttpHeaders.ContentType] = mime.lookup(resourcePath);
                // res.writeHead(HttpStatus.Ok, header);
                rr.res.statusCode = HttpStatus.Ok;
                rr.res.setHeader(HttpHeaders.ContentType, mime.lookup(resourcePath).toString());
                rr.res.end(fs.readFileSync(resourcePath));
                sw = false;
                break;
            }
        }
        return sw;
    }

     async after(rr: RequestResponse, app: SimpleBootHttpServer) {
        return true;
    }

}
