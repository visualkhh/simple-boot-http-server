import "reflect-metadata";
export declare class MetaDataAtomic<T = any, M = any> {
    target: T;
    metaData: M;
    constructor(target: T, metaData: M);
}
export declare class MetaDataPropertyAtomic<T = any, M = any> extends MetaDataAtomic<T, M> {
    property: string;
    parameter?: any;
    constructor(target: T, metaData: M, property: string, parameter?: any);
    call(...parameter: any): any;
}
