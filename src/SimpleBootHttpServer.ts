import {SimpleApplication} from 'simple-boot-core/SimpleApplication';
import {HttpServerOption} from './option/HttpServerOption';
import {ConstructorType} from 'simple-boot-core/types/Types';
import {IncomingMessage, Server, ServerResponse} from 'http'
import {RequestResponse} from './models/RequestResponse';
import {getUrlMapping, getUrlMappings, SaveMappingConfig, UrlMappingSituationType} from './decorators/MethodMapping';
import {HttpStatus} from './codes/HttpStatus';
import {HttpHeaders} from './codes/HttpHeaders';
import {Mimes} from './codes/Mimes';
import {Filter} from './filters/Filter';
import {
    ExceptionHandlerSituationType,
    targetExceptionHandler
} from 'simple-boot-core/decorators/exception/ExceptionDecorator';
import {getInject, SituationTypeContainer, SituationTypeContainers} from 'simple-boot-core/decorators/inject/Inject';
import {EndPoint} from './endpoints/EndPoint';
import {ReflectUtils} from 'simple-boot-core/utils/reflect/ReflectUtils';
import {ReqFormUrlBody} from './models/datas/body/ReqFormUrlBody';
import {ReqJsonBody} from './models/datas/body/ReqJsonBody';
import {ReqHeader} from './models/datas/ReqHeader';
import {RouterModule} from 'simple-boot-core/route/RouterModule';
import {ReqMultipartFormBody} from './models/datas/body/ReqMultipartFormBody';
import {execValidationInValid, getValidIndex} from 'simple-boot-core/decorators/validate/Validation';
import {ValidException} from 'simple-boot-core/errors/ValidException';
import {HttpError} from './errors/HttpError';
import {getRoute} from 'simple-boot-core/decorators/route/Router';

export class SimpleBootHttpServer extends SimpleApplication {
    constructor(public rootRouter: ConstructorType<Object>, public option: HttpServerOption = new HttpServerOption()) {
        super(rootRouter, option);
    }

    public async run(otherInstanceSim?: Map<ConstructorType<any>, any>) {
        super.run(otherInstanceSim);
        const server = this.option.serverOption ? new Server(this.option.serverOption) : new Server();
        server.on('request', async (req: IncomingMessage, res: ServerResponse) => {
            res.on('close', async () => {
                if (this.option.closeEndPoints) {
                    for (const it of this.option.closeEndPoints) {
                        try {
                            const execute = (typeof it === 'function' ? this.simstanceManager.getOrNewSim(it) : it) as EndPoint;
                            const endPoint = execute?.endPoint(rr, this);
                            if (endPoint instanceof Promise) {
                                await endPoint;
                            }
                        } catch (e) {
                        }
                    }
                }

                if (!rr.resIsDone()) {
                    rr.resEnd();
                }
            });
            res.on('error', async () => {
                if (this.option.errorEndPoints) {
                    for (const it of this.option.errorEndPoints) {
                        try {
                            const execute = (typeof it === 'function' ? this.simstanceManager.getOrNewSim(it) : it) as EndPoint;
                            const endPoint = execute?.endPoint(rr, this);
                            if (endPoint instanceof Promise) {
                                await endPoint;
                            }
                        } catch (e) {
                        }
                    }
                }

                if (!rr.resIsDone()) {
                    rr.resEnd();
                }
            });

            const rr = new RequestResponse(req, res);
            const otherStorage = new Map<ConstructorType<any>, any>();
            otherStorage.set(RequestResponse, rr);
            otherStorage.set(IncomingMessage, req);
            otherStorage.set(ServerResponse, res);
            try {
                if (this.option.requestEndPoints) {
                    for (const it of this.option.requestEndPoints) {
                        try {
                            const execute = (typeof it === 'function' ? this.simstanceManager.getOrNewSim<EndPoint>(it) : it) as EndPoint;
                            execute?.endPoint(rr, this);
                        } catch (e) {
                        }
                    }
                }

                const filter: { filter: Filter, sw: boolean }[] = [];
                for (let i = 0; this.option.filters && i < this.option.filters.length; i++) {
                    const it = this.option.filters[i];
                    const execute = (typeof it === 'function' ? this.simstanceManager.getOrNewSim(it) : it) as Filter;
                    let sw = true;
                    if (execute?.before) {
                        sw = await execute.before(rr, this);
                        filter.push({filter: execute, sw});
                    }
                    if (!sw) {
                        break;
                    }
                }

                // body.. something..
                if (!rr.resIsDone()) {
                    const routerModule = await this.routing(rr.reqIntent);
                    otherStorage.set(RouterModule, routerModule);
                    const moduleInstance = routerModule?.getModuleInstance?.();
                    let methods: SaveMappingConfig[] = [];
                    if (routerModule && moduleInstance) {
                        // router 클래스 내부에서 선언된 Route일때
                        if (routerModule.propertyKeys) {
                            const map = routerModule.propertyKeys?.map(it => { return {propertyKey: it, config: getUrlMapping(moduleInstance, it)} as SaveMappingConfig });
                            methods.push(...(map ?? []));
                        } else {
                            methods.push(...(getUrlMappings(moduleInstance).filter(it => !getRoute(moduleInstance, it.propertyKey)) ?? []));
                        }
                        
                        methods = methods.filter(it => it && it.propertyKey && it.config && rr.reqMethod()?.toUpperCase() === it.config.method.toUpperCase());
                        methods.sort((a, b) => {
                            return ((b.config?.req?.contentType?.length ?? 0) + (b.config?.req?.accept?.length ?? 0)) - ((a.config?.req?.contentType?.length ?? 0) + (a.config?.req?.accept?.length ?? 0));
                        });
                        methods = methods
                            .filter(it => it.config?.req?.contentType ? (!!it.config?.req?.contentType?.find(sit => rr.reqHasContentTypeHeader(sit))) : true)
                            .filter(it => it.config?.req?.accept ? (!!it.config?.req?.accept?.find(sit => rr.reqHasAcceptHeader(sit))) : true);
                        if (methods[0]) {
                            const it = methods[0];
                            const paramTypes = ReflectUtils.getParameterTypes(moduleInstance, it.propertyKey)
                            const injects = getInject(moduleInstance, it.propertyKey);
                            const validIndexs = getValidIndex(moduleInstance, it.propertyKey);
                            if (injects) {
                                const isJson = injects.find(it => it.config?.situationType === UrlMappingSituationType.REQ_JSON_BODY);
                                const isFormUrl = injects.find(it => it.config?.situationType === UrlMappingSituationType.REQ_FORM_URL_BODY);
                                const siturationContainers = new SituationTypeContainers();
                                if (isJson) {
                                    let data = await rr.reqBodyJsonData()
                                    if (isJson.type) {
                                        data = Object.assign(new isJson.type(), data);
                                    }
                                    if (validIndexs.includes(isJson.index)) {
                                        const inValid = execValidationInValid(data);
                                        if ((inValid?.length ?? 0) > 0) {
                                            throw new ValidException(inValid);
                                        }
                                    }
                                    siturationContainers.push(new SituationTypeContainer({
                                        situationType: UrlMappingSituationType.REQ_JSON_BODY,
                                        data
                                    }));
                                }
                                if (isFormUrl) {
                                    let data = await rr.reqBodyFormUrlData()
                                    if (isFormUrl.type) {
                                        data = Object.assign(new isFormUrl.type(), data);
                                    }
                                    if (validIndexs.includes(isFormUrl.index)) {
                                        const inValid = execValidationInValid(data);
                                        if ((inValid?.length ?? 0) > 0) {
                                            throw new ValidException(inValid);
                                        }
                                    }
                                    siturationContainers.push(new SituationTypeContainer({situationType: UrlMappingSituationType.REQ_FORM_URL_BODY, data}));
                                }
                                if (siturationContainers.length) {
                                    otherStorage.set(SituationTypeContainers, siturationContainers);
                                }
                            }

                            for (const paramType of paramTypes) {
                                if (paramType === ReqFormUrlBody) {
                                    otherStorage.set(ReqFormUrlBody, await rr.reqBodyReqFormUrlBody())
                                } else if (paramType === ReqJsonBody) {
                                    otherStorage.set(ReqJsonBody, await rr.reqBodyReqJsonBody())
                                } else if (paramType === URLSearchParams) {
                                    otherStorage.set(URLSearchParams, rr.reqUrlSearchParamsType)
                                } else if (paramType === ReqMultipartFormBody) {
                                    otherStorage.set(ReqMultipartFormBody, rr.reqBodyReqMultipartFormBody())
                                } else if (paramType === ReqHeader) {
                                    otherStorage.set(ReqHeader, rr.reqHeaderObj)
                                }
                            }

                            // execute !!!
                            let data = await this.simstanceManager.executeBindParameterSimPromise({
                                target: moduleInstance,
                                targetKey: it.propertyKey
                            }, otherStorage);
                            // console.log('method resolver run-->', it.config?.resolver, routerModule);
                            if (it.config?.resolver) {
                                const execute = typeof it.config.resolver === 'function' ? this.simstanceManager.getOrNewSim(it.config.resolver) : it.config.resolver;
                                data = await execute?.resolve?.(data, rr);
                            }
                            const status = it.config?.res?.status ?? HttpStatus.Ok;
                            const headers = it.config?.res?.header ?? {};
                            if (it.config?.res?.contentType) {
                                headers[HttpHeaders.ContentType] = it.config?.res?.contentType;
                            }
                            // console.log('--?', routerModule, typeof routerModule, typeof routerModule === 'object');
                            if ((it.config?.res?.contentType?.toLowerCase().indexOf(Mimes.ApplicationJson.toLowerCase()) ?? -1) > -1) {
                                data = JSON.stringify(data);
                            } else if (data && typeof data === 'object') {
                                data = JSON.stringify(data);
                            }
                            rr.resSetHeaders(headers)
                            rr.resSetStatusCode(status);
                            rr.resWrite(data);
                        }
                    }

                    if (this.option.noSuchRouteEndPointMappingThrow && methods.length <= 0) {
                        throw this.option.noSuchRouteEndPointMappingThrow(rr);
                    }
                }

                // after
                for (const it of filter.reverse()) {
                    if (it.filter?.after && !await it.filter.after(rr, this, it.sw)) {
                        break;
                    }
                }
            } catch (e) {
                rr.resStatusCode(e instanceof HttpError ? e.status : HttpStatus.InternalServerError)
                const execute = typeof this.option.globalAdvice === 'function' ? this.simstanceManager.getOrNewSim(this.option.globalAdvice) : this.option.globalAdvice;
                if (!execute) {
                    rr.resEnd();
                    return;
                }
                if (e && typeof e === 'object') {
                    otherStorage.set(e.constructor as ConstructorType<any>, e);
                    otherStorage.set(SituationTypeContainer, new SituationTypeContainer({
                        situationType: ExceptionHandlerSituationType.ERROR_OBJECT,
                        data: e
                    }));
                }
                const target = targetExceptionHandler(execute, e);
                if (target) {
                    await this.simstanceManager.executeBindParameterSimPromise({
                        target: execute,
                        targetKey: target.propertyKey
                    }, otherStorage);
                }
            }

            if (!rr.resIsDone()) {
                rr.resEnd();
            }

        });
        server.listen(this.option.listen.port, this.option.listen.hostname, this.option.listen.backlog, this.option.listen.listeningListener);
        // server.on('request', (req: IncomingMessage, res: ServerResponse) => {
        //     this.option.filters.forEach(it => it.on?.(req, res));
        //     const url = new URL(req.url!, 'http://' + req.headers.host);
        //     const intent = new Intent(req.url ?? '', url);
        //     this.routing(intent).then(it => {
        //         console.log('routing-->', it)
        //         const moduleInstance = it.getModuleInstance<any>();
        //         this.option.filters.forEach(it => it.before?.(req, res, moduleInstance));
        //         if (moduleInstance) {
        //             moduleInstance?.onReceive?.(req, res);
        //         } else {
        //             it.router?.onNotFoundReceiver?.(req, res);
        //         }
        //         this.option.filters.slice().reverse().forEach(it => it.after?.(req, res, moduleInstance));
        //         res.end();
        //     }).catch(it => {
        //         console.log('catch-->', it)
        //     })
        // });
        // server.listen(this.option.listen.port, this.option.listen.hostname, this.option.listen.backlog, this.option.listen.listeningListener)
        return this;
    }
}
