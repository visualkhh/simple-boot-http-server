import { ConstructorType } from '../types/Types';
import { SimAtomic } from '../simstance/SimAtomic';
import { Intent } from '../intent/Intent';
import { SimstanceManager } from '../simstance/SimstanceManager';
export declare class RouterModule<R = SimAtomic, M = any> {
    private simstanceManager;
    router?: R | undefined;
    module?: ConstructorType<M> | undefined;
    routerChains: R[];
    pathData?: {
        [name: string]: string;
    };
    data?: any;
    intent?: Intent;
    constructor(simstanceManager: SimstanceManager, router?: R | undefined, module?: ConstructorType<M> | undefined, routerChains?: R[]);
    getModuleInstance<T = M>(): T | undefined;
    get lastRouteChain(): R;
    get lastRouteChainValue(): any;
    hasActivateInLastRoute(obj: any): boolean;
    get queryParams(): {
        [key: string]: string;
    } | undefined;
    get queryParamsAfterDecodeURI(): {
        [key: string]: string;
    } | undefined;
}
