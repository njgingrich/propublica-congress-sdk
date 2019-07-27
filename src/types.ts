export type Chamber = 'House' | 'Senate';

export type URLString = string;

export interface BaseApiResult {
  status: string;
  copyright: string;
  results: any;
}

export interface BasePagedResult {
  chamber: Chamber;
  num_results: number;
  offset: number;
}
