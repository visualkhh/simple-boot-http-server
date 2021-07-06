import {ConstructorType} from 'simple-boot-core/types/Types'
import {SimGlobal} from 'simple-boot-core/global/SimGlobal';
import {RouterModule} from './RouterModule';
import {SimstanceManager} from 'simple-boot-core/simstance/SimstanceManager';
import {IntentEvent} from 'simple-boot-core/intent/IntentEvent';
import {Intent} from 'simple-boot-core/intent/Intent';
import {URL} from 'url'
import {HttpModule} from "../module/HttpModule";
import {Router} from "simple-boot-core/route/Router";

export class HttpRouter extends Router {
    constructor(public path: string = '', public childs: ConstructorType<HttpRouter>[] = []) {
        super(path, childs);
    }

}
