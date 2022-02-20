import { ConstructorType } from '../types/Types';
import { SimstanceManager } from './SimstanceManager';
export declare class SimAtomic<T extends Object = Object> {
    type: ConstructorType<T>;
    private simstanceManager;
    constructor(type: ConstructorType<T>, simstanceManager: SimstanceManager);
    getConfig<C = any>(key?: symbol): C | undefined;
    getConfigs(): any[];
    get value(): T | undefined;
}
