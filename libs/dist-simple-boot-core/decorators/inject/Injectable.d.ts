import "reflect-metadata";
import { ConstructorType, GenericClassDecorator } from '../../types/Types';
export interface InjectableConfig {
    scheme?: string;
}
export declare const Injectable: (config?: InjectableConfig | undefined) => GenericClassDecorator<ConstructorType<any>>;
export declare const getInjectable: (target: ConstructorType<any> | Function | any) => InjectableConfig | undefined;
