import { ChamberRequestParams } from '../types';
import { FloorActionListResult } from './types';
interface FloorActionsDateParams extends ChamberRequestParams {
    date: Date;
}
declare module '../api' {
    interface CongressAPI {
        getRecentFloorActions(params: ChamberRequestParams): Promise<FloorActionListResult>;
        getFloorActionsForDate(params: FloorActionsDateParams): Promise<FloorActionListResult>;
    }
}
export {};
