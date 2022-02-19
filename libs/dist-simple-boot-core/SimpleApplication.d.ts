import { Runnable } from './run/Runnable';
import { SimstanceManager } from './simstance/SimstanceManager';
import { SimOption } from './SimOption';
import { IntentManager } from './intent/IntentManager';
import { RouterManager } from './route/RouterManager';
import { Intent } from './intent/Intent';
import { ConstructorType } from './types/Types';
import { RouterModule } from './route/RouterModule';
import { SimAtomic } from './simstance/SimAtomic';
import 'reflect-metadata';
export declare class SimpleApplication implements Runnable {
    rootRouter: ConstructorType<Object>;
    option: SimOption;
    simstanceManager: SimstanceManager;
    intentManager: IntentManager;
    routerManager: RouterManager;
    constructor(rootRouter: ConstructorType<Object>, option?: SimOption);
    run(otherInstanceSim?: Map<ConstructorType<any>, any>): void;
    publishIntent(i: Intent): any[];
    routing<R = SimAtomic, M = any>(i: Intent): Promise<RouterModule>;
}
