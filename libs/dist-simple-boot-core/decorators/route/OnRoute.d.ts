import { ReflectMethod, ConstructorType } from '../../types/Types';
declare type OnRouteOption = {
    isActivateMe?: boolean;
};
export declare const onRoutes: Map<ConstructorType<any>, string[]>;
export declare const OnRouteMetadataKey: unique symbol;
export declare const OnRoute: (config?: OnRouteOption | undefined) => ReflectMethod;
export declare const getOnRoute: (target: any, propertyKey: string) => OnRouteOption;
export {};
