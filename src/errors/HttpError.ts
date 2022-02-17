import { ErrorBase } from './ErrorBase';

export class HttpError extends ErrorBase {
    status: number;
    constructor({status, message = 'HttpError'}: {status: number, message?: string}) {
        super(message);
        this.status = status;
    }
}
