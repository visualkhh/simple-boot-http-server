import 'reflect-metadata';
import { ConstructorType, ReflectMethod } from '../../types/Types';
export declare enum ExceptionHandlerSituationType {
    ERROR_OBJECT = "SIMPLE_BOOT_CORE://ExceptionHandler/ERROR_OBJECT"
}
export declare type ExceptionHandlerConfig = {
    type?: ConstructorType<any>;
};
export declare type SaveExceptionHandlerConfig = {
    propertyKey?: string | symbol;
    method: Function;
    config: ExceptionHandlerConfig;
};
export declare const ExceptionHandler: (config?: ExceptionHandlerConfig) => ReflectMethod;
export declare const getExceptionHandler: (target: any, propertyKey: string) => ExceptionHandlerConfig;
export declare const getExceptionHandlers: (target: any) => SaveExceptionHandlerConfig[] | undefined;
export declare const targetExceptionHandlers: (target: any, error: any) => SaveExceptionHandlerConfig[];
export declare const targetExceptionHandler: (target: any, error: any, excludeMethods?: Function[]) => SaveExceptionHandlerConfig | undefined;
