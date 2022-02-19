import 'reflect-metadata';
export declare class ReflectUtils {
    static getParameterTypes(target: any, propertyKey?: string | symbol): any[];
    static getReturnType(target: any, propertyKey: string | symbol): any;
    static getType(target: any, propertyKey?: string | symbol): any;
    static getMetadata(metadataKey: any, target: any, propertyKey?: string | symbol): any;
    static getMetadataKeys(target: any): any[];
    static getOwnMetadata(metadataKey: any, target: any, propertyKey?: string): number[];
    static getMetadatas(target: any): any[];
    static metadata(metadataKey: any, data: any): {
        (target: Function): void;
        (target: Object, propertyKey: string | symbol): void;
    };
    static defineMetadata(metadataKey: any, value: any, target: any, propertyKey?: string | symbol): void;
}
