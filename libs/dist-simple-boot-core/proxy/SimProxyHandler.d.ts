import { SimstanceManager } from '../simstance/SimstanceManager';
import { SimOption } from '../SimOption';
export declare class SimProxyHandler implements ProxyHandler<any> {
    private simstanceManager;
    private simOption;
    constructor(simstanceManager: SimstanceManager, simOption: SimOption);
    get(target: any, name: string): any;
    set(obj: any, prop: string, value: any, receiver: any): boolean;
    apply(target: Function, thisArg: any, argumentsList?: any): any;
    private aopBefore;
    private aopAfter;
    has(target: any, key: PropertyKey): boolean;
}
