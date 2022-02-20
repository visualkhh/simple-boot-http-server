import 'reflect-metadata';
import { ConstructorType, MethodParameter } from '../../types/Types';
import { ExceptionHandlerSituationType } from '../exception/ExceptionDecorator';
export declare enum InjectSituationType {
    INDEX = "SIMPLE_BOOT_CORE://Inject/INDEX"
}
export declare type SituationType = string | InjectSituationType | ExceptionHandlerSituationType;
export declare class SituationTypeContainer {
    situationType: SituationType;
    data: any;
    index?: number;
    constructor({ situationType, data, index }: {
        situationType: SituationType;
        data: any;
        index?: number;
    });
}
export declare class SituationTypeContainers {
    containers: SituationTypeContainer[];
    push(...item: SituationTypeContainer[]): void;
    get length(): number;
    find(predicate: (value: SituationTypeContainer, index: number, obj: SituationTypeContainer[]) => unknown, thisArg?: any): SituationTypeContainer | undefined;
}
export declare type InjectConfig = {
    scheme?: string;
    type?: ConstructorType<any>;
    situationType?: SituationType;
    applyProxy?: {
        type: ConstructorType<ProxyHandler<any>>;
        param?: any[];
    };
};
export declare type SaveInjectConfig = {
    index: number;
    propertyKey?: string | symbol;
    config: InjectConfig;
};
export declare const Inject: (config?: InjectConfig) => MethodParameter;
export declare const getInject: (target: ConstructorType<any> | Function | any, propertyKey?: string | symbol | undefined) => SaveInjectConfig[];
