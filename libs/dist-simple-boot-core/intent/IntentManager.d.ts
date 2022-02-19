import { Intent } from './Intent';
import { SimstanceManager } from '../simstance/SimstanceManager';
export declare class IntentManager {
    simstanceManager: SimstanceManager;
    constructor(simstanceManager: SimstanceManager);
    publish(it: string, data?: any): any[];
    publish(it: Intent): any[];
}
