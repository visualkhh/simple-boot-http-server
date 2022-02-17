export class ErrorBase {
    name: string = 'Error'
    stack?: string
    data?: any;
    constructor(public message: string = 'error') {
    }
}
