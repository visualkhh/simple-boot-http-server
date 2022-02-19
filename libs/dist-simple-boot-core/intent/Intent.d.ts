export declare enum PublishType {
    DATA_PARAMETERS = "DATA_PARAMETERS",
    INLINE_DATA_PARAMETERS = "INLINE_DATA_PARAMETERS"
}
export declare class Intent<T = any, E = any> {
    uri: string;
    data?: T | undefined;
    event?: E | undefined;
    publishType?: PublishType;
    constructor(uri: string, data?: T | undefined, event?: E | undefined);
    get scheme(): string;
    get paths(): string[];
    get fullPath(): string;
    get pathname(): string;
    get query(): string;
    get queryParams(): {
        [key: string]: string;
    };
    get queryParamsAfterDecodeURI(): {
        [key: string]: string;
    };
    getPathnameData(urlExpression: string): {
        [name: string]: string;
    } | undefined;
}
