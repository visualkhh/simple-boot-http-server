import "reflect-metadata";
import { ReflectMethod } from 'simple-boot-core/types/Types';
import { ReflectUtils } from 'simple-boot-core/utils/reflect/ReflectUtils';
export type SaveMappingConfig = {propertyKey: string | symbol; config: MappingConfig}
export type MappingConfig = {
    resStatus?: number;
    resHeaders?: {[key: string]: string};
}
const GETSMappingMetadataKey = Symbol('GET_METHODS');
const GETMappingMetadataKey = Symbol('GET_METHOD');

export const GET = (config: MappingConfig = {}): ReflectMethod => {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        const saveMappingConfigs = (ReflectUtils.getMetadata(GETSMappingMetadataKey, target.constructor) ?? []) as SaveMappingConfig[];
        saveMappingConfigs.push({propertyKey, config});
        ReflectUtils.defineMetadata(GETSMappingMetadataKey, saveMappingConfigs, target.constructor);
        ReflectUtils.defineMetadata(GETMappingMetadataKey, config, target, propertyKey);
    }
}

export const getGET = (target: any, propertyKey: string): MappingConfig => {
    return ReflectUtils.getMetadata(GETMappingMetadataKey, target, propertyKey);
}
export const getGETS = (target: any): SaveMappingConfig[] => {
    if (null != target && undefined != target && typeof target === 'object') {
        target = target.constructor;
    }
    return ReflectUtils.getMetadata(GETSMappingMetadataKey, target);
}
