import {ConstructorType} from 'simple-boot-core/types/Types'
import {SimGlobal} from 'simple-boot-core/global/SimGlobal';
import {RouterModule} from './RouterModule';
import {SimstanceManager} from 'simple-boot-core/simstance/SimstanceManager';
import {IntentEvent} from 'simple-boot-core/intent/IntentEvent';
import {Intent} from 'simple-boot-core/intent/Intent';
import {URL} from 'url'
import {ReceiveModule} from "../module/ReceiveModule";

export class Router implements IntentEvent {
    [name: string]: ConstructorType<ReceiveModule> | any;
    private _simstanceManager: SimstanceManager;
    constructor(public path: string = '', public childs: ConstructorType<Router>[] = []) {
        this._simstanceManager = SimGlobal().application?.simstanceManager!;
    }

    publish(intent: Intent): void {
        SimGlobal()?.application?.intentManager.onNext(intent)
    }

    subscribe(intent: Intent): void {
    }

    getExecuteModule(url: URL, parentRouters: Router[]): RouterModule | undefined {
        const path = url.pathname;
        const routerStrings = parentRouters.slice(1).map(it => it.path || '')
        const isRoot = this.isRootUrl(routerStrings, path)
        // console.log('getExecuteModule -> ', isRoot, parentRouters, routerStrings, path, this.path);
        if (isRoot) {
            parentRouters.push(this);
            const module = this.routing(routerStrings, path)
            if (module?.module) {
                return module;
            } else {
                for (const child of this.childs) {
                    const route = this._simstanceManager.getOrNewSim(child)
                    const executeModule = route?.getExecuteModule(url, parentRouters)
                    if (route && executeModule) {
                        return executeModule
                    }
                }
            }
        }
    }

    public isRootUrl(parentRoots: string[], url: string): boolean {
        return url.startsWith(parentRoots.join('') + (this.path || ''))
    }

    // my field find
    public routing(parentRoots: string[], path: string): RouterModule | undefined {
        const urlRoot = parentRoots.join('') + this.path
        const regex = new RegExp('^' + urlRoot, 'i')
        path = path.replace(regex, '')
        const fieldModule = (this[path] as ConstructorType<ReceiveModule>)
        if (fieldModule) {
            return new RouterModule(this, this._simstanceManager.getOrNewSim(fieldModule))
        }
    }

    public async canActivate(url: URL, module: RouterModule): Promise<RouterModule | ConstructorType<ReceiveModule>> {
        return module;
    }

    public notFound(url: URL): ConstructorType<ReceiveModule> | undefined {
        return undefined;
    }
}
