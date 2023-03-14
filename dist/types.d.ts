export declare type CapitalizedChamber = 'House' | 'Senate';
export declare type Chamber = 'house' | 'senate';
export declare type URLString = string;
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
    offset?: number;
}
