import {IncomingMessage, ServerResponse} from "http";

export interface OnReceiver {
    onReceive(req: IncomingMessage, res: ServerResponse): any;
}
