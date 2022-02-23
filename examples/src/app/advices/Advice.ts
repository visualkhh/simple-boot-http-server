import {Sim} from 'simple-boot-core/decorators/SimDecorator';
import {ExceptionHandler, ExceptionHandlerSituationType} from 'simple-boot-core/decorators/exception/ExceptionDecorator';
import {RequestResponse} from 'simple-boot-http-server/models/RequestResponse';
import {Inject} from 'simple-boot-core/decorators/inject/Inject';

@Sim()
export class Advice {
    @ExceptionHandler()
    catch(rr: RequestResponse, @Inject({situationType: ExceptionHandlerSituationType.ERROR_OBJECT}) e: any) {
        // rr.resWriteHead(500, {a: '11'}).resEnd();
        rr.resSetHeaders({a: '11'});
        console.log('exception--->', rr.reqUrl, e);
    }
}