import { Intent } from '../intent/Intent';
import { ConstructorType } from '../types/Types';
import { RouterModule } from './RouterModule';
import { SimstanceManager } from '../simstance/SimstanceManager';
export declare class RouterManager {
    private simstanceManager;
    private rootRouter;
    activeRouterModule?: RouterModule;
    constructor(simstanceManager: SimstanceManager, rootRouter: ConstructorType<any>);
    routingMap(prefix?: string, router?: ConstructorType<any>): {
        [key: string]: string | any;
    };
    routing(intent: Intent): Promise<RouterModule<any, any>>;
    private getExecuteModule;
    private isRootUrl;
    private findRouting;
    private findRouteProperty;
}
