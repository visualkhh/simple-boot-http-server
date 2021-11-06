import {IncomingMessage, ServerResponse} from "http";

export interface OnNotFoundReceiver {
    onNotFoundReceiver(req: IncomingMessage, res: ServerResponse): any;
}
