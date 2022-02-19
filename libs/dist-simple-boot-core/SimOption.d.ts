import { ConstructorType } from './types/Types';
export declare class SimOption {
    advice: ConstructorType<any>[];
    proxy?: {
        onProxy: <T>(it: T) => T;
    } | undefined;
    name?: string;
    constructor(advice?: ConstructorType<any>[], proxy?: {
        onProxy: <T>(it: T) => T;
    } | undefined);
    addAdvicce(advice: ConstructorType<any>): void;
    setAdvice(...advice: ConstructorType<any>[]): SimOption;
}
