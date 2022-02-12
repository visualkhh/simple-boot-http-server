import { SimpleApplication } from 'simple-boot-core/SimpleApplication';
import { HttpServerOption } from './option/HttpServerOption';
import { ConstructorType } from 'simple-boot-core/types/Types';
import { IncomingMessage, Server, ServerResponse } from 'http'
import { RequestResponse } from './models/RequestResponse';
import {
    getCONNECTS,
    getDELETES,
    getGETS, getHEADS,
    getPATCHS,
    getPOSTS,
    getPUTS, getTRACES,
    MappingConfig,
    SaveMappingConfig
} from './decorators/MethodMapping';
import { HttpStatus } from './codes/HttpStatus';
import { HttpHeaders } from './codes/HttpHeaders';
import { Mimes } from './codes/Mimes';
import { Filter } from './filters/Filter';

export class SimpleBootHttpServer extends SimpleApplication {
    constructor(public rootRouter: ConstructorType<Object>, public option: HttpServerOption = new HttpServerOption()) {
        super(rootRouter, option);
    }

    public async run(otherInstanceSim?: Map<ConstructorType<any>, any>) {
        super.run(otherInstanceSim);
        // const initializers = [];
        // for (let initializerElement of this.option.initializers) {
        //     initializers.push(await initializerElement.run(this));
        // }
        // this.option?.initializersCallBack?.(this, initializers);

        const server = this.option.serverOption ? new Server(this.option.serverOption) : new Server();
        server.on('request', async (req: IncomingMessage, res: ServerResponse) => {
            // const promise = new Promise(r => {
            //     setTimeout(() => {
            //         r(req.url);
            //     }, 9000);
            // })
            // const data = await promise;
            // res.end(data);
            try {

                if (this.option.requestEndPoints) {
                    for (const it of this.option.requestEndPoints) {
                        try {
                            it.endPoint(req, res);
                        } catch (e) {
                        }
                    }
                }

                if (this.option.filters) {
                    const filter: {filter: Filter, sw: boolean}[] = [];
                    for (const it of this.option.filters) {
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
                    const rr = new RequestResponse(req, res);
                    if (!rr.res.finished || !rr.res.writableEnded) {
                        const data = await this.routing(rr.reqIntent);
                        const moduleInstance = data.getModuleInstance();
                        if (moduleInstance) {
                            const methods: SaveMappingConfig[] = [];
                            if ('GET' === rr.reqMethod()) {
                                methods.push(...getGETS(moduleInstance) ?? []);
                            } else if ('POST' === rr.reqMethod()) {
                                methods.push(...getPOSTS(moduleInstance) ?? []);
                            } else if ('DELETE' === rr.reqMethod()) {
                                methods.push(...getDELETES(moduleInstance) ?? []);
                            } else if ('PUT' === rr.reqMethod()) {
                                methods.push(...getPUTS(moduleInstance) ?? []);
                            } else if ('PATCH' === rr.reqMethod()) {
                                methods.push(...getPATCHS(moduleInstance) ?? []);
                            } else if ('HEAD' === rr.reqMethod()) {
                                methods.push(...getHEADS(moduleInstance) ?? []);
                            } else if ('TRACE' === rr.reqMethod()) {
                                methods.push(...getTRACES(moduleInstance) ?? []);
                            } else if ('CONNECT' === rr.reqMethod()) {
                                methods.push(...getCONNECTS(moduleInstance) ?? []);
                            }
                            const otherStorage = new Map<ConstructorType<any>, any>();
                            otherStorage.set(RequestResponse, rr);
                            methods.forEach(it => {
                                let data = this.simstanceManager.executeBindParameterSim({target: moduleInstance, targetKey: it.propertyKey}, otherStorage);
                                const status = it.config.resStatus ?? HttpStatus.Ok;
                                const headers = it.config.resHeaders;
                                rr.res.writeHead(status, headers);
                                const contentType = Object.entries(headers ?? {}).find(([key, value]) => key.toLowerCase() === HttpHeaders.ContentType.toLowerCase());
                                if ((contentType?.[1]??'').toLowerCase().indexOf(Mimes.ApplicationJson.toLowerCase()) >= 0 ) {
                                    data = JSON.stringify(data);
                                }
                                rr.res.end(data);
                            })
                        }
                    }


                    // after
                    for (const it of filter.reverse()) {
                        if (it.filter?.after && !await it.filter.after(req, res, this, it.sw)) {
                            break;
                        }
                    }
                }
            } catch (e) {
                this.option.globalAdvice?.catch(e, req, res);

            }
            res.on('close', () => {
                if (this.option.closeEndPoints) {
                    for (const it of this.option.closeEndPoints) {
                        try {
                            it.endPoint(req, res);
                        } catch (e) {
                        }
                    }
                }
            });
            res.on('error', () => {
                if (this.option.errorEndPoints) {
                    for (const it of this.option.errorEndPoints) {
                        try {
                            it.endPoint(req, res);
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
    }
}
