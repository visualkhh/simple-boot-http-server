import { ReflectMethod } from '../../types/Types';
export declare type InjectionConfig = {};
export declare const Injection: (config?: InjectionConfig | undefined) => ReflectMethod;
export declare const getInjection: (target: any, propertyKey: string) => any;
