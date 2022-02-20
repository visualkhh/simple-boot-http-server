import "reflect-metadata";
import { ConstructorType, GenericClassDecorator } from '../types/Types';
export declare const sims: Set<ConstructorType<any>>;
export interface SimConfig {
    scheme?: string;
}
export declare type RouteProperty = ConstructorType<Object> | [ConstructorType<Object>, any] | string;
export declare type Route = {
    [name: string]: RouteProperty;
};
export interface RouterConfig {
    path: string;
    route: Route;
    routers?: ConstructorType<Object>[];
}
export declare const SimMetadataKey: unique symbol;
export declare const Sim: (config?: SimConfig) => GenericClassDecorator<ConstructorType<any>>;
export declare const getSim: (target: ConstructorType<any> | Function | any) => SimConfig | undefined;
export declare const RouterMetadataKey: unique symbol;
export declare const Router: (config?: RouterConfig | undefined) => GenericClassDecorator<ConstructorType<any>>;
export declare const getRouter: (target: ConstructorType<any> | Function | any) => RouterConfig | undefined;
export declare const PostConstruct: (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare const getPostConstruct: (target: any, propertyKey: string) => any;
