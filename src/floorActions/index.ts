import { ApiClient } from '../client';
import { ChamberRequestParams } from '../types';
import { FloorActionListResult } from './types';

function getDatePath(date: Date): string {
  return `${date.getUTCFullYear()}/${date.getUTCMonth()}/${date.getUTCDate()}`;
}

interface FloorActionsDateParams extends ChamberRequestParams {
  date: Date;
}

declare module '../client' {
  interface ApiClient {
    getRecentFloorActions(params: ChamberRequestParams): Promise<FloorActionListResult>;
    getFloorActionsForDate(params: FloorActionsDateParams): Promise<FloorActionListResult>;
  }
}

ApiClient.prototype.getRecentFloorActions = async function(params: ChamberRequestParams) {
  params = this.withDefaults(params);

  const response = await this.request({
    url: `/${params.chamber}/floor_updates`,
  });
  return response.data as FloorActionListResult;
};

ApiClient.prototype.getFloorActionsForDate = async function(params: FloorActionsDateParams) {
  params = this.withDefaults(params);

  const response = await this.request({
    url: `/${this.congressNumber}/${params.chamber}/${getDatePath(params.date)}`,
  });
  return response.data as FloorActionListResult;
};
