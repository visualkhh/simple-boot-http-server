import { Router, Sim } from "simple-boot-core/decorators/SimDecorator";
import {Hello} from './Hello';

@Sim()
@Router({
    path: '',
    route: {
        '': '/',
        '/': Hello
    }
})
export class AppRouter {
    constructor() {
    }
}
