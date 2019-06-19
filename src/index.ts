type APIOptions = {
    apiVersion?: string;
    congressNumber?: number;
    apiKey: string;
}

class CongressAPI {
    apiVersion: string = 'v1';
    congressNumber: number = 116;

    private apiKey: string;

    constructor(options: APIOptions) {
        this.apiKey = options.apiKey;
    }
}