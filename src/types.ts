export type Chamber = 'house' | 'senate';

export type URLString = string;

export interface BaseApiResult {
  status: string;
  copyright: string;
  results: any;
}

export interface BasePagedResponse {
  chamber: Chamber;
  num_results: number;
  offset: number;
}
