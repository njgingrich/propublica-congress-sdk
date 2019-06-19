export type Chamber = "House" | "Senate";

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