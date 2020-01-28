import { CongressAPI } from '../api';
import { ChamberRequestParams } from '../types';
import { FloorActionListResult } from './types';

function getDatePath(date: Date): string {
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
}

interface FloorActionsDateParams extends ChamberRequestParams {
  date: Date;
}

declare module '../api' {
  interface CongressAPI {
    getRecentFloorActions(params: ChamberRequestParams): Promise<FloorActionListResult>;
    getFloorActionsForDate(params: FloorActionsDateParams): Promise<FloorActionListResult>;
  }
}

CongressAPI.prototype.getRecentFloorActions = async function(params: ChamberRequestParams) {
  params = this.withDefaults(params);

  const response = await this.request({
    url: `/${params.chamber}/floor_updates`,
    format: params.format,
  });
  return response.data as FloorActionListResult;
};

CongressAPI.prototype.getFloorActionsForDate = async function(params: FloorActionsDateParams) {
  params = this.withDefaults(params);

  const response = await this.request({
    url: `/${params.chamber}/floor_updates/${getDatePath(params.date)}`,
    format: params.format,
  });
  return response.data as FloorActionListResult;
};
