import { Router, Sim } from "simple-boot-core/decorators/SimDecorator";
import {Index} from "./Index";
import {Hello} from "./hello";

@Sim({})
@Router({
    path: '/users',
    route: {
        '': Index,
        '/': Index,
        '/hello': Hello
    }
})
export class UsersRouter {
}
