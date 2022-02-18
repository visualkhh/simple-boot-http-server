import 'reflect-metadata';
import {ConstructorType, ReflectMethod} from 'simple-boot-core/types/Types';
import {ReflectUtils} from 'simple-boot-core/utils/reflect/ReflectUtils';
import {Resolver} from '../resolvers/Resolver';
import {Mimes} from '../codes/Mimes';
import {HttpMethod} from '../codes/HttpMethod';

export type MappingConfig = {
    method: HttpMethod | string,
    description?: {
        name?: string;
        detail?: string;
    };

    req?: {
        contentType?: string[];
        accept?: string[];
    };

    res?: {
        status?: number;
        header?: {[key: string]: string};
        contentType?: Mimes | string;
    }
    resolver?: Resolver|ConstructorType<Resolver>;
}
export type SaveMappingConfig = {propertyKey: string | symbol; config: MappingConfig}
const MappingMetadataKey = Symbol('MappingMetadataKey');
// const GETSMappingMetadataKey = Symbol('GET_METHODS');
// const GETMappingMetadataKey = Symbol('GET_METHOD');

export const UrlMapping = (config: MappingConfig): ReflectMethod => {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        const saveMappingConfigs = (ReflectUtils.getMetadata(MappingMetadataKey, target.constructor) ?? []) as SaveMappingConfig[];
        saveMappingConfigs.push({propertyKey, config});
        ReflectUtils.defineMetadata(MappingMetadataKey, saveMappingConfigs, target.constructor);
        ReflectUtils.defineMetadata(MappingMetadataKey, config, target, propertyKey);
    }
}
export const getUrlMapping = (target: any, propertyKey: string): MappingConfig => {
    return ReflectUtils.getMetadata(MappingMetadataKey, target, propertyKey);
}

export const getUrlMappings = (target: any): SaveMappingConfig[] => {
    if (target !== null && undefined !== target && typeof target === 'object') {
        target = target.constructor;
    }
    return ReflectUtils.getMetadata(MappingMetadataKey, target);
}

export const GET = (inputConfig: Omit<MappingConfig,'method'> = {}): ReflectMethod => {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        const config = inputConfig as MappingConfig;
        config.method = HttpMethod.GET;
        const saveMappingConfigs = (ReflectUtils.getMetadata(MappingMetadataKey, target.constructor) ?? []) as SaveMappingConfig[];
        saveMappingConfigs.push({propertyKey, config});
        ReflectUtils.defineMetadata(MappingMetadataKey, saveMappingConfigs, target.constructor);
        ReflectUtils.defineMetadata(MappingMetadataKey, config, target, propertyKey);
    }
}

export const getGET = (target: any, propertyKey: string): MappingConfig => {
    return getUrlMapping(target, propertyKey);
}
export const getGETS = (target: any): SaveMappingConfig[] => {
    return getUrlMappings(target)?.filter(it => it.config?.method.toUpperCase() === HttpMethod.GET);
}

export const POST = (inputConfig: Omit<MappingConfig,'method'> = {}): ReflectMethod => {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        const config = inputConfig as MappingConfig;
        config.method = HttpMethod.POST;
        const saveMappingConfigs = (ReflectUtils.getMetadata(MappingMetadataKey, target.constructor) ?? []) as SaveMappingConfig[];
        saveMappingConfigs.push({propertyKey, config});
        ReflectUtils.defineMetadata(MappingMetadataKey, saveMappingConfigs, target.constructor);
        ReflectUtils.defineMetadata(MappingMetadataKey, config, target, propertyKey);
    }
}

export const getPOST = (target: any, propertyKey: string): MappingConfig => {
    return getUrlMapping(target, propertyKey);
}
export const getPOSTS = (target: any): SaveMappingConfig[] => {
    return getUrlMappings(target)?.filter(it => it.config?.method.toUpperCase() === HttpMethod.POST);
}

export const DELETE = (inputConfig: Omit<MappingConfig,'method'> = {}): ReflectMethod => {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        const config = inputConfig as MappingConfig;
        config.method = HttpMethod.DELETE;
        const saveMappingConfigs = (ReflectUtils.getMetadata(MappingMetadataKey, target.constructor) ?? []) as SaveMappingConfig[];
        saveMappingConfigs.push({propertyKey, config});
        ReflectUtils.defineMetadata(MappingMetadataKey, saveMappingConfigs, target.constructor);
        ReflectUtils.defineMetadata(MappingMetadataKey, config, target, propertyKey);
    }
}

export const getDELETE = (target: any, propertyKey: string): MappingConfig => {
    return getUrlMapping(target, propertyKey);
}
export const getDELETES = (target: any): SaveMappingConfig[] => {
    return getUrlMappings(target)?.filter(it => it.config?.method.toUpperCase() === HttpMethod.DELETE);
}

export const PUT = (inputConfig: Omit<MappingConfig,'method'> = {}): ReflectMethod => {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        const config = inputConfig as MappingConfig;
        config.method = HttpMethod.PUT;
        const saveMappingConfigs = (ReflectUtils.getMetadata(MappingMetadataKey, target.constructor) ?? []) as SaveMappingConfig[];
        saveMappingConfigs.push({propertyKey, config});
        ReflectUtils.defineMetadata(MappingMetadataKey, saveMappingConfigs, target.constructor);
        ReflectUtils.defineMetadata(MappingMetadataKey, config, target, propertyKey);
    }
}

export const getPUT = (target: any, propertyKey: string): MappingConfig => {
    return getUrlMapping(target, propertyKey);
}
export const getPUTS = (target: any): SaveMappingConfig[] => {
    return getUrlMappings(target)?.filter(it => it.config?.method.toUpperCase() === HttpMethod.PUT);
}

export const PATCH = (inputConfig: Omit<MappingConfig,'method'> = {}): ReflectMethod => {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        const config = inputConfig as MappingConfig;
        config.method = HttpMethod.PATCH;
        const saveMappingConfigs = (ReflectUtils.getMetadata(MappingMetadataKey, target.constructor) ?? []) as SaveMappingConfig[];
        saveMappingConfigs.push({propertyKey, config});
        ReflectUtils.defineMetadata(MappingMetadataKey, saveMappingConfigs, target.constructor);
        ReflectUtils.defineMetadata(MappingMetadataKey, config, target, propertyKey);
    }
}

export const getPATCH = (target: any, propertyKey: string): MappingConfig => {
    return getUrlMapping(target, propertyKey);
}
export const getPATCHS = (target: any): SaveMappingConfig[] => {
    return getUrlMappings(target)?.filter(it => it.config?.method.toUpperCase() === HttpMethod.GET);
}

export const OPTIONS = (inputConfig: Omit<MappingConfig,'method'> = {}): ReflectMethod => {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        const config = inputConfig as MappingConfig;
        config.method = HttpMethod.OPTIONS;
        const saveMappingConfigs = (ReflectUtils.getMetadata(MappingMetadataKey, target.constructor) ?? []) as SaveMappingConfig[];
        saveMappingConfigs.push({propertyKey, config});
        ReflectUtils.defineMetadata(MappingMetadataKey, saveMappingConfigs, target.constructor);
        ReflectUtils.defineMetadata(MappingMetadataKey, config, target, propertyKey);
    }
}

export const getOPTIONS = (target: any, propertyKey: string): MappingConfig => {
    return getUrlMapping(target, propertyKey);
}
export const getOPTIONSS = (target: any): SaveMappingConfig[] => {
    return getUrlMappings(target)?.filter(it => it.config?.method.toUpperCase() === HttpMethod.OPTIONS);
}

export const HEAD = (inputConfig: Omit<MappingConfig,'method'> = {}): ReflectMethod => {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        const config = inputConfig as MappingConfig;
        config.method = HttpMethod.HEAD;
        const saveMappingConfigs = (ReflectUtils.getMetadata(MappingMetadataKey, target.constructor) ?? []) as SaveMappingConfig[];
        saveMappingConfigs.push({propertyKey, config});
        ReflectUtils.defineMetadata(MappingMetadataKey, saveMappingConfigs, target.constructor);
        ReflectUtils.defineMetadata(MappingMetadataKey, config, target, propertyKey);
    }
}

export const getHEAD = (target: any, propertyKey: string): MappingConfig => {
    return getUrlMapping(target, propertyKey);
}
export const getHEADS = (target: any): SaveMappingConfig[] => {
    return getUrlMappings(target)?.filter(it => it.config?.method.toUpperCase() === HttpMethod.GET);
}

export const TRACE = (inputConfig: Omit<MappingConfig,'method'> = {}): ReflectMethod => {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        const config = inputConfig as MappingConfig;
        config.method = HttpMethod.TRACE;
        const saveMappingConfigs = (ReflectUtils.getMetadata(MappingMetadataKey, target.constructor) ?? []) as SaveMappingConfig[];
        saveMappingConfigs.push({propertyKey, config});
        ReflectUtils.defineMetadata(MappingMetadataKey, saveMappingConfigs, target.constructor);
        ReflectUtils.defineMetadata(MappingMetadataKey, config, target, propertyKey);
    }
}

export const getTRACE = (target: any, propertyKey: string): MappingConfig => {
    return getUrlMapping(target, propertyKey);
}
export const getTRACES = (target: any): SaveMappingConfig[] => {
    return getUrlMappings(target)?.filter(it => it.config?.method.toUpperCase() === HttpMethod.TRACE);
}

export const CONNECT = (inputConfig: Omit<MappingConfig,'method'> = {}): ReflectMethod => {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        const config = inputConfig as MappingConfig;
        config.method = HttpMethod.CONNECT;
        const saveMappingConfigs = (ReflectUtils.getMetadata(MappingMetadataKey, target.constructor) ?? []) as SaveMappingConfig[];
        saveMappingConfigs.push({propertyKey, config});
        ReflectUtils.defineMetadata(MappingMetadataKey, saveMappingConfigs, target.constructor);
        ReflectUtils.defineMetadata(MappingMetadataKey, config, target, propertyKey);
    }
}

export const getCONNECT = (target: any, propertyKey: string): MappingConfig => {
    return getUrlMapping(target, propertyKey);
}
export const getCONNECTS = (target: any): SaveMappingConfig[] => {
    return getUrlMappings(target)?.filter(it => it.config?.method.toUpperCase() === HttpMethod.CONNECT);
}
