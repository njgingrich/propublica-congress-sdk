export declare class CongressAPI {
    private _congressNumber;
    private apiVersion;
    private client;
    private apiKey;
    constructor(options: APIOptions);
    private getApi;
    request(requestParams: RequestParams): Promise<any>;
    readonly congressNumber: number;
    withDefaults(params: any): any;
}
interface APIOptions {
    apiVersion?: string;
    congressNumber?: number;
    apiKey: string;
}
interface RequestParams {
    format?: 'xml' | 'json';
    offset?: number;
    url: string;
}
export {};
