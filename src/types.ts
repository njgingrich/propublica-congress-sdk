export type CapitalizedChamber = 'House' | 'Senate';
export type Chamber = 'house' | 'senate';

export type URLString = string;

export interface BaseApiResult {
  status: string;
  copyright: string;
  results: any;
}

export interface BasePagedResult {
  chamber: CapitalizedChamber;
  num_results: number;
  offset: number;
}

export interface BaseRequestParams {
  format?: 'json' | 'xml';
}

export interface ChamberRequestParams extends BaseRequestParams {
  chamber: Chamber;
}

export interface PagedRequestParams extends BaseRequestParams {
  // Must be a multiple of 20
  offset?: number;
}
