export declare class ConvertUtils {
    static objToGetURL(obj: any): string;
    static mapToJson(map: Map<string, any>): string;
    static jsonToMap(jsonStr: any): Map<string, string>;
    static objToStrMap(obj: any): Map<string, string>;
    static jsonToStrMap(jsonStr: string): Map<string, string>;
    static strToObject(message: string): any;
    static objToJson(obj: any): string;
    static objToMap(obj: any): Map<string, any>;
    static mapToObj(map: Map<string, any>): any;
    static toObject(obj: any): any;
    static iteratorToArray<T>(it: any): T[];
    static toJson(obj: any): string;
    static concatenateToAttribute(object_o: any): string;
    static concatenateToParameter(object_o: any): string;
    static concatenateToString: (object_o: any, unionString_s?: string, spilString_s?: string, pairString_s?: string) => string;
    static specialCharsToEscape(data: string): string;
}
