import {Sim} from 'simple-boot-core/decorators/SimDecorator';
import {GET, POST} from 'simple-boot-http-server/decorators/MethodMapping';
import {RequestResponse} from 'simple-boot-http-server/models/RequestResponse';
import {Mimes} from 'simple-boot-http-server/codes/Mimes';
import {ReqFormUrlBody} from 'simple-boot-http-server/models/datas/body/ReqFormUrlBody';
import {ReqJsonBody} from 'simple-boot-http-server/models/datas/body/ReqJsonBody';
import {Inject} from 'simple-boot-core/decorators/inject/Inject';
import {UrlMappingSituationType} from 'simple-boot-http-server/decorators/MethodMapping';
import {OutgoingHttpHeaders} from 'http';
import {ReqHeader} from 'simple-boot-http-server/models/datas/ReqHeader';
import {RouterModule} from 'simple-boot-core/route/RouterModule';
import {ExceptionHandler} from 'simple-boot-core/decorators/exception/ExceptionDecorator';

@Sim()
export class Hello {
    constructor() {
    }

    @ExceptionHandler({throw: true})
    exception() {
        console.log('exception--->');
    }

    @GET({res: {contentType: Mimes.ApplicationJson}})
    get(rr: RequestResponse, header: ReqHeader, routerModule: RouterModule) {
        // console.dir(header, {depth: 5});
        console.log('-11->', routerModule.data)
        console.log('-11->', routerModule.intent)
        console.log('-11->', routerModule.pathData)
        console.log('-11->', routerModule.queryParamsAfterDecodeURI)
        throw new Error('------eeeeeeee---------');
        return {a: 1}
        // rr.res.setHeader('Content-Type', 'application/json');
        // rr.res.end(JSON.stringify({ a: 1 }));
    }

    @POST({req: {contentType: [Mimes.ApplicationXWwwFormUrlencoded]}, res: {contentType: Mimes.ApplicationJson}})
    post(rr: RequestResponse, @Inject({situationType: UrlMappingSituationType.REQ_FORM_URL_BODY}) data: any, url: URLSearchParams) {
        console.log('------>formData', url.toString())
        return {a: 22}
    }

    // @POST({req: {contentType: [Mimes.ApplicationJson]}, res: {contentType: Mimes.ApplicationJson}})
    // post2(rr: RequestResponse, @Inject({situationType: UrlMappingSituationType.REQ_JSON_BODY}) data: any, url: URLSearchParams) {
    //     console.log('----json-->formData', data, url.toString())
    //     return {a: 2222}
    // }
    // @POST({req: {contentType: [Mimes.ApplicationXWwwFormUrlencoded]}, res: {contentType: Mimes.ApplicationJson}})
    // post(rr: RequestResponse, data: ReqFormUrlBody, url: URLSearchParams) {
    //     console.log('------>formData', data, url.toString())
    //     return {a: 22}
    // }
    //
    // @POST({req: {contentType: [Mimes.ApplicationJson]}, res: {contentType: Mimes.ApplicationJson}})
    // post2(rr: RequestResponse, data: ReqJsonBody, url: URLSearchParams) {
    //     console.log('----json-->formData', data, url.toString())
    //     return {a: 2222}
    // }

    // @GET({req: {contentType: [Mimes.TextHtml]}, res: {header: {a: 'z'}, contentType: Mimes.ApplicationJson}})
    // @GET({req: {contentType: [Mimes.TextHtml]}, res: {header: {a: 'z'}}})
    // texthtml(rr: RequestResponse) {
    //     // rr.res.setHeader('Content-Type', 'application/json');
    //     rr.res.end(JSON.stringify({ a: 122 }));
    //     // return {zzzzz: 'zzzz'}
    // }
}
