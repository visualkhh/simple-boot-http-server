import 'reflect-metadata';
import { ReflectMethod } from 'simple-boot-core/types/Types';
import { ReflectUtils } from 'simple-boot-core/utils/reflect/ReflectUtils';
export type MappingConfig = {
    resStatus?: number;
    resHeaders?: {[key: string]: string};
}
export type SaveMappingConfig = {propertyKey: string | symbol; config: MappingConfig}
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
    if (target !== null && undefined !== target && typeof target === 'object') {
        target = target.constructor;
    }
    return ReflectUtils.getMetadata(GETSMappingMetadataKey, target);
}

const POSTSMappingMetadataKey = Symbol('POST_METHODS');
const POSTMappingMetadataKey = Symbol('POST_METHOD');
export const POST = (config: MappingConfig = {}): ReflectMethod => {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        const saveMappingConfigs = (ReflectUtils.getMetadata(POSTSMappingMetadataKey, target.constructor) ?? []) as SaveMappingConfig[];
        saveMappingConfigs.push({propertyKey, config});
        ReflectUtils.defineMetadata(POSTSMappingMetadataKey, saveMappingConfigs, target.constructor);
        ReflectUtils.defineMetadata(POSTMappingMetadataKey, config, target, propertyKey);
    }
}

export const getPOST = (target: any, propertyKey: string): MappingConfig => {
    return ReflectUtils.getMetadata(POSTMappingMetadataKey, target, propertyKey);
}
export const getPOSTS = (target: any): SaveMappingConfig[] => {
    if (target !== null && undefined !== target && typeof target === 'object') {
        target = target.constructor;
    }
    return ReflectUtils.getMetadata(POSTSMappingMetadataKey, target);
}

const DELETESMappingMetadataKey = Symbol('DELETE_METHODS');
const DELETEMappingMetadataKey = Symbol('DELETE_METHOD');
export const DELETE = (config: MappingConfig = {}): ReflectMethod => {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        const saveMappingConfigs = (ReflectUtils.getMetadata(DELETESMappingMetadataKey, target.constructor) ?? []) as SaveMappingConfig[];
        saveMappingConfigs.push({propertyKey, config});
        ReflectUtils.defineMetadata(DELETESMappingMetadataKey, saveMappingConfigs, target.constructor);
        ReflectUtils.defineMetadata(DELETEMappingMetadataKey, config, target, propertyKey);
    }
}

export const getDELETE = (target: any, propertyKey: string): MappingConfig => {
    return ReflectUtils.getMetadata(DELETEMappingMetadataKey, target, propertyKey);
}
export const getDELETES = (target: any): SaveMappingConfig[] => {
    if (target !== null && undefined !== target && typeof target === 'object') {
        target = target.constructor;
    }
    return ReflectUtils.getMetadata(DELETESMappingMetadataKey, target);
}

const PUTSMappingMetadataKey = Symbol('PUT_METHODS');
const PUTMappingMetadataKey = Symbol('PUT_METHOD');
export const PUT = (config: MappingConfig = {}): ReflectMethod => {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        const saveMappingConfigs = (ReflectUtils.getMetadata(PUTSMappingMetadataKey, target.constructor) ?? []) as SaveMappingConfig[];
        saveMappingConfigs.push({propertyKey, config});
        ReflectUtils.defineMetadata(PUTSMappingMetadataKey, saveMappingConfigs, target.constructor);
        ReflectUtils.defineMetadata(PUTMappingMetadataKey, config, target, propertyKey);
    }
}

export const getPUT = (target: any, propertyKey: string): MappingConfig => {
    return ReflectUtils.getMetadata(PUTMappingMetadataKey, target, propertyKey);
}
export const getPUTS = (target: any): SaveMappingConfig[] => {
    if (target !== null && undefined !== target && typeof target === 'object') {
        target = target.constructor;
    }
    return ReflectUtils.getMetadata(PUTSMappingMetadataKey, target);
}

const PATCHSMappingMetadataKey = Symbol('PATCH_METHODS');
const PATCHMappingMetadataKey = Symbol('PATCH_METHOD');
export const PATCH = (config: MappingConfig = {}): ReflectMethod => {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        const saveMappingConfigs = (ReflectUtils.getMetadata(PATCHSMappingMetadataKey, target.constructor) ?? []) as SaveMappingConfig[];
        saveMappingConfigs.push({propertyKey, config});
        ReflectUtils.defineMetadata(PATCHSMappingMetadataKey, saveMappingConfigs, target.constructor);
        ReflectUtils.defineMetadata(PATCHMappingMetadataKey, config, target, propertyKey);
    }
}

export const getPATCH = (target: any, propertyKey: string): MappingConfig => {
    return ReflectUtils.getMetadata(PATCHMappingMetadataKey, target, propertyKey);
}
export const getPATCHS = (target: any): SaveMappingConfig[] => {
    if (target !== null && undefined !== target && typeof target === 'object') {
        target = target.constructor;
    }
    return ReflectUtils.getMetadata(PATCHSMappingMetadataKey, target);
}

const OPTIONSSMappingMetadataKey = Symbol('OPTIONS_METHODS');
const OPTIONSMappingMetadataKey = Symbol('OPTIONS_METHOD');
export const OPTIONS = (config: MappingConfig = {}): ReflectMethod => {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        const saveMappingConfigs = (ReflectUtils.getMetadata(OPTIONSSMappingMetadataKey, target.constructor) ?? []) as SaveMappingConfig[];
        saveMappingConfigs.push({propertyKey, config});
        ReflectUtils.defineMetadata(OPTIONSSMappingMetadataKey, saveMappingConfigs, target.constructor);
        ReflectUtils.defineMetadata(OPTIONSMappingMetadataKey, config, target, propertyKey);
    }
}

export const getOPTIONS = (target: any, propertyKey: string): MappingConfig => {
    return ReflectUtils.getMetadata(OPTIONSMappingMetadataKey, target, propertyKey);
}
export const getOPTIONSS = (target: any): SaveMappingConfig[] => {
    if (target !== null && undefined !== target && typeof target === 'object') {
        target = target.constructor;
    }
    return ReflectUtils.getMetadata(OPTIONSSMappingMetadataKey, target);
}

const HEADSMappingMetadataKey = Symbol('HEAD_METHODS');
const HEADMappingMetadataKey = Symbol('HEAD_METHOD');
export const HEAD = (config: MappingConfig = {}): ReflectMethod => {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        const saveMappingConfigs = (ReflectUtils.getMetadata(HEADSMappingMetadataKey, target.constructor) ?? []) as SaveMappingConfig[];
        saveMappingConfigs.push({propertyKey, config});
        ReflectUtils.defineMetadata(HEADSMappingMetadataKey, saveMappingConfigs, target.constructor);
        ReflectUtils.defineMetadata(HEADMappingMetadataKey, config, target, propertyKey);
    }
}

export const getHEAD = (target: any, propertyKey: string): MappingConfig => {
    return ReflectUtils.getMetadata(HEADMappingMetadataKey, target, propertyKey);
}
export const getHEADS = (target: any): SaveMappingConfig[] => {
    if (target !== null && undefined !== target && typeof target === 'object') {
        target = target.constructor;
    }
    return ReflectUtils.getMetadata(HEADSMappingMetadataKey, target);
}

const TRACESMappingMetadataKey = Symbol('TRACE_METHODS');
const TRACEMappingMetadataKey = Symbol('TRACE_METHOD');
export const TRACE = (config: MappingConfig = {}): ReflectMethod => {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        const saveMappingConfigs = (ReflectUtils.getMetadata(TRACESMappingMetadataKey, target.constructor) ?? []) as SaveMappingConfig[];
        saveMappingConfigs.push({propertyKey, config});
        ReflectUtils.defineMetadata(TRACESMappingMetadataKey, saveMappingConfigs, target.constructor);
        ReflectUtils.defineMetadata(TRACEMappingMetadataKey, config, target, propertyKey);
    }
}

export const getTRACE = (target: any, propertyKey: string): MappingConfig => {
    return ReflectUtils.getMetadata(TRACEMappingMetadataKey, target, propertyKey);
}
export const getTRACES = (target: any): SaveMappingConfig[] => {
    if (target !== null && undefined !== target && typeof target === 'object') {
        target = target.constructor;
    }
    return ReflectUtils.getMetadata(TRACESMappingMetadataKey, target);
}

const CONNECTSMappingMetadataKey = Symbol('CONNECT_METHODS');
const CONNECTMappingMetadataKey = Symbol('CONNECT_METHOD');
export const CONNECT = (config: MappingConfig = {}): ReflectMethod => {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        const saveMappingConfigs = (ReflectUtils.getMetadata(CONNECTSMappingMetadataKey, target.constructor) ?? []) as SaveMappingConfig[];
        saveMappingConfigs.push({propertyKey, config});
        ReflectUtils.defineMetadata(CONNECTSMappingMetadataKey, saveMappingConfigs, target.constructor);
        ReflectUtils.defineMetadata(CONNECTMappingMetadataKey, config, target, propertyKey);
    }
}

export const getCONNECT = (target: any, propertyKey: string): MappingConfig => {
    return ReflectUtils.getMetadata(CONNECTMappingMetadataKey, target, propertyKey);
}
export const getCONNECTS = (target: any): SaveMappingConfig[] => {
    if (target !== null && undefined !== target && typeof target === 'object') {
        target = target.constructor;
    }
    return ReflectUtils.getMetadata(CONNECTSMappingMetadataKey, target);
}
