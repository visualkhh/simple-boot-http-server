export declare class FunctionUtils {
    static getParameterNames(func: Function | any, property?: string | symbol): string[];
    static eval<T>(script: string | null, obj?: any): T | null;
}
