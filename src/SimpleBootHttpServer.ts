import {SimpleApplication} from 'simple-boot-core/SimpleApplication';
import {HttpServerOption} from './option/HttpServerOption';
import {ConstructorType} from 'simple-boot-core/types/Types';
import {IncomingMessage, Server, ServerResponse} from 'http'
import {RequestResponse} from './models/RequestResponse';
import {
    getCONNECTS,
    getDELETES,
    getGETS,
    getHEADS,
    getPATCHS,
    getPOSTS,
    getPUTS,
    getTRACES, getUrlMappings,
    SaveMappingConfig
} from './decorators/MethodMapping';
import {HttpStatus} from './codes/HttpStatus';
import {HttpHeaders} from './codes/HttpHeaders';
import {Mimes} from './codes/Mimes';
import {Filter} from './filters/Filter';
import {
    ExceptionHandlerSituationType,
    targetExceptionHandler
} from 'simple-boot-core/decorators/exception/ExceptionDecorator';
import {SituationType, SiturationTypeContainer} from 'simple-boot-core/decorators/inject/Inject';
import {EndPoint} from './endpoints/EndPoint';

export class SimpleBootHttpServer extends SimpleApplication {
    constructor(public rootRouter: ConstructorType<Object>, public option: HttpServerOption = new HttpServerOption()) {
        super(rootRouter, option);
    }

    public async run(otherInstanceSim?: Map<ConstructorType<any>, any>) {
        super.run(otherInstanceSim);
        const server = this.option.serverOption ? new Server(this.option.serverOption) : new Server();
        server.on('request', async (req: IncomingMessage, res: ServerResponse) => {
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
                if (!rr.res.finished || !rr.res.writableEnded) {
                    const data = await this.routing(rr.reqIntent);
                    const moduleInstance = data.getModuleInstance();
                    let methods: SaveMappingConfig[] = [];
                    if (moduleInstance) {
                        methods.push(... (getUrlMappings(moduleInstance).filter(it => rr.reqMethod()?.toUpperCase() === it.config.method.toUpperCase()) ?? []));
                        methods = methods
                            .filter(it => it.config?.req?.contentType ? (it.config?.req?.contentType?.find(sit => rr.reqHasContentTypeHeader(sit)) ? true : false) : true)
                            .filter(it => it.config?.req?.accept ? (it.config?.req?.accept?.find(sit => rr.reqHasAcceptHeader(sit)) ? true : false) : true);
                        if (methods[0]) {
                            const it = methods[0];
                            console.log('method run-->', it);
                            let data = await this.simstanceManager.executeBindParameterSimPromise({
                                target: moduleInstance,
                                targetKey: it.propertyKey
                            }, otherStorage);

                            console.log('method resolver run-->', it.config?.resolver, data);

                            if (it.config?.resolver) {
                                const execute = typeof it.config.resolver === 'function' ? this.simstanceManager.getOrNewSim(it.config.resolver) : it.config.resolver;
                                data = await execute?.resolve?.(data, rr);
                            }

                            const status = it.config?.res?.status ?? HttpStatus.Ok;
                            const headers = it.config?.res?.header ?? {};
                            if (it.config?.res?.contentType) {
                                headers[HttpHeaders.ContentType] = it.config?.res?.contentType;
                            }

                            if (it.config?.res?.contentType?.toLowerCase() === Mimes.ApplicationJson.toLowerCase()) {
                                data = JSON.stringify(data);
                            } else if (typeof data === 'object'){
                                data = JSON.stringify(data);
                            }

                            rr.resSetHeaders(headers)
                            rr.resSetStatusCode(status);
                            rr.resEnd(data);
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
                if (e && typeof e === 'object') {
                    otherStorage.set(e.constructor as ConstructorType<any>, e);
                    otherStorage.set(SiturationTypeContainer, new SiturationTypeContainer(ExceptionHandlerSituationType.ERROR_OBJECT, e));
                }
                const execute = typeof this.option.globalAdvice === 'function' ? this.simstanceManager.getOrNewSim(this.option.globalAdvice) : this.option.globalAdvice;
                let target = targetExceptionHandler(execute, e);
                if (target) {
                    let data = this.simstanceManager.executeBindParameterSim({
                        target: execute,
                        targetKey: target.propertyKey
                    }, otherStorage);
                }
            }

            res.on('close', () => {
                if (this.option.closeEndPoints) {
                    for (const it of this.option.closeEndPoints) {
                        try {
                            const execute = (typeof it === 'function' ? this.simstanceManager.getOrNewSim(it) : it) as EndPoint;
                            execute?.endPoint(rr, this);
                        } catch (e) {
                        }
                    }
                }
            });

            res.on('error', () => {
                if (this.option.errorEndPoints) {
                    for (const it of this.option.errorEndPoints) {
                        try {
                            const execute = (typeof it === 'function' ? this.simstanceManager.getOrNewSim(it) : it) as EndPoint;
                            execute?.endPoint(rr, this);
                        } catch (e) {
                        }
                    }
                }
            });
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
