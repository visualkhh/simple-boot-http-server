import "reflect-metadata";
import { ConstructorType } from '../types/Types';
import { Runnable } from '../run/Runnable';
import { SimAtomic } from './SimAtomic';
import { SaveInjectConfig } from '../decorators/inject/Inject';
import { SimOption } from '../SimOption';
export declare type FirstCheckMaker = (obj: {
    target: Object;
    targetKey?: string | symbol;
}, token: ConstructorType<any>, idx: number, saveInjectConfig?: SaveInjectConfig) => any | undefined;
export declare class SimstanceManager implements Runnable {
    private option;
    private _storage;
    private simProxyHandler;
    private otherInstanceSim?;
    constructor(option: SimOption);
    get storage(): Map<ConstructorType<any>, any>;
    getSimAtomics(): SimAtomic[];
    getSimConfig(scheme: string | undefined): SimAtomic<any>[];
    findFirstSim({ scheme, type }: {
        scheme?: string;
        type?: ConstructorType<any>;
    }): SimAtomic<any> | undefined;
    getOrNewSim<T>(k?: ConstructorType<T>): T | undefined;
    getOrNewSims<T>(k: ConstructorType<T>): T[];
    register(target: ConstructorType<any>): void;
    set(target: ConstructorType<any>, obj: any): void;
    resolve<T>(target: ConstructorType<any>): T;
    newSim<T>(target: ConstructorType<T>, simCreateAfter?: (data: T) => void, otherStorage?: Map<ConstructorType<any>, any>): T;
    callBindPostConstruct(obj: any): void;
    executeBindParameterSimPromise({ target, targetKey, firstCheckMaker }: {
        target: Object;
        targetKey?: string | symbol;
        firstCheckMaker?: FirstCheckMaker[];
    }, otherStorage?: Map<ConstructorType<any>, any>): Promise<any>;
    executeBindParameterSim({ target, targetKey, firstCheckMaker }: {
        target: Object;
        targetKey?: string | symbol;
        firstCheckMaker?: FirstCheckMaker[];
    }, otherStorage?: Map<ConstructorType<any>, any>): any;
    getParameterSim({ target, targetKey, firstCheckMaker }: {
        target: Object;
        targetKey?: string | symbol;
        firstCheckMaker?: FirstCheckMaker[];
    }, otherStorage?: Map<ConstructorType<any>, any>): any[];
    proxy<T = any>(target: T): T;
    run(otherInstanceSim?: Map<ConstructorType<any>, any>): void;
}
