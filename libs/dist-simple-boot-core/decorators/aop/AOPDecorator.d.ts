import 'reflect-metadata';
import { MetaDataPropertyAtomic } from '../MetaDataAtomic';
import { ConstructorType, ReflectMethod } from '../../types/Types';
declare type AOPOption = {
    type?: ConstructorType<any>;
    property: string;
};
declare type AroundOption = {
    after?: (obj: any, propertyKey: string, args: any[], beforeReturn: any) => any[];
    before?: (obj: any, propertyKey: string, args: any[]) => any[];
};
export declare const After: (data: AOPOption) => {
    (target: Function): void;
    (target: Object, propertyKey: string | symbol): void;
};
export declare const getAfter: (target: any, propertyKey: string) => AOPOption;
export declare const getAfters: (target: any) => MetaDataPropertyAtomic<any, AOPOption>[];
export declare const getProtoAfters: (target: any, propertyKey: string, type?: ConstructorType<any> | undefined) => MetaDataPropertyAtomic<any, AOPOption>[];
export declare const Before: (data: AOPOption) => {
    (target: Function): void;
    (target: Object, propertyKey: string | symbol): void;
};
export declare const getBefore: (target: any, propertyKey: string) => AOPOption;
export declare const getBefores: (target: any) => MetaDataPropertyAtomic<any, AOPOption>[];
export declare const getProtoBefores: (target: any, propertyKey: string, type?: ConstructorType<any> | undefined) => MetaDataPropertyAtomic<any, AOPOption>[];
export declare class AroundForceReturn {
    value: any;
    constructor(value: any);
}
export declare const Around: (config: AroundOption) => ReflectMethod;
export declare const getAround: (target: any, propertyKey: string) => AroundOption;
export {};
