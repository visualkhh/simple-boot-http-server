import { Router, Sim } from 'simple-boot-core/decorators/SimDecorator';
import {Hello} from './Hello';

@Sim()
@Router({
    path: '',
    route: {
        '': '/',
        '/:id/:good': Hello,
        '/': Hello
    }
})
export class AppRouter {
    constructor() {
    }
}
