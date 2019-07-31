import { ApiClient } from '../client';
import { Chamber } from '../types';
import { FloorActionListResult } from './types';

function getDatePath(date: Date): string {
  return `${date.getUTCFullYear()}/${date.getUTCMonth()}/${date.getUTCDate()}`;
}

declare module '../client' {
  interface ApiClient {
    getRecentFloorActions(chamber: Chamber): Promise<FloorActionListResult>;
    getFloorActionsForDate(chamber: Chamber, date: Date): Promise<FloorActionListResult>;
  }
}

ApiClient.prototype.getRecentFloorActions = async function(chamber: Chamber) {
  const response = await this.request({
    url: `/${this.congressNumber}/${chamber}/floor_updates`,
  });
  return response.data as FloorActionListResult;
};

ApiClient.prototype.getFloorActionsForDate = async function(chamber: Chamber, date: Date) {
  const response = await this.request({
    url: `/${this.congressNumber}/${chamber}/${getDatePath(date)}`,
  });
  return response.data as FloorActionListResult;
};
