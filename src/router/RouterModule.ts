import {HttpRouter} from './HttpRouter';
import {HttpModule} from "../module/HttpModule";

export class RouterModule {
    constructor(public router?: HttpRouter, public module?: HttpModule) {
    }
}
