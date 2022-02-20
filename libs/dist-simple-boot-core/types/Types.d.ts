export interface ConstructorType<T> {
    new (...args: any[]): T;
}
export declare type GenericClassDecorator<T> = (target: T) => void;
export declare type ReflectMethod = (target: any | ConstructorType<any> | {
    constructor: ConstructorType<any>;
    [key: string]: Function;
}, propertyKey: string, descriptor: PropertyDescriptor) => any;
export declare type MethodParameter = (target: Object, propertyKey: string | symbol, parameterIndex: number) => void;
