import {SimpleApplication} from 'simple-boot-core/SimpleApplication';
import {HttpServerOption} from './option/HttpServerOption';
import {ConstructorType} from 'simple-boot-core/types/Types';
import {IncomingMessage, Server, ServerResponse} from 'http'
import {RequestResponse} from './models/RequestResponse';
import {
    getCONNECTS,
    getDELETES,
    getGETS, getHEADS,
    getPATCHS,
    getPOSTS,
    getPUTS, getTRACES,
    SaveMappingConfig
} from './decorators/MethodMapping';
import {HttpStatus} from './codes/HttpStatus';
import {HttpHeaders} from './codes/HttpHeaders';
import {Mimes} from './codes/Mimes';
import {Filter} from './filters/Filter';
import {targetExceptionHandler} from 'simple-boot-core/decorators/exception/ExceptionDecorator';
import {SiturationTypeContainer, SituationType} from 'simple-boot-core/decorators/inject/Inject';

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
            try {

                if (this.option.requestEndPoints) {
                    for (const it of this.option.requestEndPoints) {
                        try {
                            const execute = typeof it === 'function' ? this.simstanceManager.getOrNewSim(it) : it;
                            execute?.endPoint(req, res);
                        } catch (e) {
                        }
                    }
                }

                const filter: { filter: Filter, sw: boolean }[] = [];
                for (let i = 0; this.option.filters && i < this.option.filters.length; i++) {
                    const it = this.option.filters[i];
                    const execute = typeof it === 'function' ? this.simstanceManager.getOrNewSim(it) : it;
                    let sw = true;
                    if (execute?.before) {
                        sw = await execute.before(req, res, this);
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
                    const methods: SaveMappingConfig[] = [];
                    if (moduleInstance) {
                        if (rr.reqMethod() === 'GET') {
                            methods.push(...getGETS(moduleInstance) ?? []);
                        } else if (rr.reqMethod() === 'POST') {
                            methods.push(...getPOSTS(moduleInstance) ?? []);
                        } else if (rr.reqMethod() === 'DELETE') {
                            methods.push(...getDELETES(moduleInstance) ?? []);
                        } else if (rr.reqMethod() === 'PUT') {
                            methods.push(...getPUTS(moduleInstance) ?? []);
                        } else if (rr.reqMethod() === 'PATCH') {
                            methods.push(...getPATCHS(moduleInstance) ?? []);
                        } else if (rr.reqMethod() === 'HEAD') {
                            methods.push(...getHEADS(moduleInstance) ?? []);
                        } else if (rr.reqMethod() === 'TRACE') {
                            methods.push(...getTRACES(moduleInstance) ?? []);
                        } else if (rr.reqMethod() === 'CONNECT') {
                            methods.push(...getCONNECTS(moduleInstance) ?? []);
                        }

                        methods.forEach(it => {
                            let data = this.simstanceManager.executeBindParameterSim({
                                target: moduleInstance,
                                targetKey: it.propertyKey
                            }, otherStorage);
                            const status = it.config.resStatus ?? HttpStatus.Ok;
                            const headers = it.config.resHeaders;
                            rr.res.writeHead(status, headers);
                            const contentType = Object.entries(headers ?? {}).find(([key, value]) => key.toLowerCase() === HttpHeaders.ContentType.toLowerCase());
                            if ((contentType?.[1] ?? '').toLowerCase().indexOf(Mimes.ApplicationJson.toLowerCase()) >= 0) {
                                data = JSON.stringify(data);
                            }
                            rr.res.end(data);
                        })
                    }

                    if (this.option.noSuchRouteEndPointMappingThrow && methods.length <= 0) {
                        throw this.option.noSuchRouteEndPointMappingThrow(rr);
                    }
                }

                // after
                for (const it of filter.reverse()) {
                    if (it.filter?.after && !await it.filter.after(req, res, this, it.sw)) {
                        break;
                    }
                }
            } catch (e) {
                if (e && typeof e === 'object') {
                    otherStorage.set(e.constructor as ConstructorType<any>, e);
                    otherStorage.set(SiturationTypeContainer, new SiturationTypeContainer(SituationType.ExceptionHandlerErrorObject, e));
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
                            const execute = typeof it === 'function' ? this.simstanceManager.getOrNewSim(it) : it;
                            execute?.endPoint(req, res);
                        } catch (e) {
                        }
                    }
                }
            });
            res.on('error', () => {
                if (this.option.errorEndPoints) {
                    for (const it of this.option.errorEndPoints) {
                        try {
                            const execute = typeof it === 'function' ? this.simstanceManager.getOrNewSim(it) : it;
                            execute?.endPoint(req, res);
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
