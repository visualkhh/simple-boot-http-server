import {Router} from './Router';
import {ReceiveModule} from "../module/ReceiveModule";

export class RouterModule {
    constructor(public router?: Router, public module?: ReceiveModule) {
    }
}
