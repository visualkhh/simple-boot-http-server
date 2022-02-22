import {RequestResponse} from '../models/RequestResponse';
import {SimpleBootHttpServer} from '../SimpleBootHttpServer';

export interface EndPoint {
    endPoint(rr: RequestResponse, app: SimpleBootHttpServer): Promise<any>;
}