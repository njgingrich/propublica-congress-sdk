import axios, { AxiosInstance } from 'axios';
import './votes';
import './members';

export class CongressAPI {
  private _congressNumber: number = 116;
  private apiVersion: string = 'v1';
  private client: AxiosInstance;

  private apiKey: string;

  public constructor(options: APIOptions) {
    this.apiKey = options.apiKey;
    if (options.congressNumber) {
      this._congressNumber = options.congressNumber;
    }

    this.client = this.getApi();
  }

  private getApi(): AxiosInstance {
    return axios.create({
      baseURL: `https://api.propublica.org/congress/${this.apiVersion}`,
      headers: { 'X-API-Key': this.apiKey },
    });
  }

  public request(requestParams: RequestParams): Promise<any> {
    return this.client.get(`${requestParams.url}.json`);
  }

  public get congressNumber() {
    return this._congressNumber;
  }

  public withDefaults(params: any) {
    return {
      format: 'json',
      congressNumber: this.congressNumber,
      ...params,
    };
  }
}

interface APIOptions {
  apiVersion?: string;
  congressNumber?: number;
  apiKey: string;
}

interface RequestParams {
  url: string;
}
