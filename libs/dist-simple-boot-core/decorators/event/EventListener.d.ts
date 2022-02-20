import 'reflect-metadata';
export interface EventListenerOption {
    target: string | any;
    name: string;
}
export declare const EventListener: (option: EventListenerOption) => {
    (target: Function): void;
    (target: Object, propertyKey: string | symbol): void;
};
export declare const getEventListener: (target: any, propertyKey: string) => EventListenerOption;
