import { ConstructorType } from '../../types/Types';
export declare class ObjectUtils {
    static getAllProtoTypeName(target?: any): string[];
    static getProtoTypeName(target?: any): string[];
    static getProtoTypes(target?: any): Function[];
    static seal<T>(target: T): T;
    static isPrototypeOfTarget(start: ConstructorType<any> | null | undefined, target: any | null | undefined): boolean;
    static getPrototypeOfDepth(target: any, dest: ConstructorType<any> | null | undefined): object[];
    static getAllProtoType(start: ConstructorType<any> | null | undefined): ConstructorType<any>[];
    static getPrototypeOf(start: any): any;
    static getPrototypeKeyMap(target: any): Map<Function, string>;
    static getPrototypeName(target: any, fnc: Function): string | undefined;
}
