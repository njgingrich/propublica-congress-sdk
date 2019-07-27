// import votes from "./votes";
import { getApiClient, ApiClient } from './client';
import './votes';
import './members';
import './committees';

class CongressAPI {
  public client: ApiClient;
  public constructor(apiKey: string) {
    this.client = getApiClient({ apiKey });
  }
}

const api = new CongressAPI(process.env.API_KEY || '');
const result = api.client.getVotesForDate('senate', new Date('2019-06-13'));
result.then(res => console.log(res));

const result2 = api.client.getMemberVotePositions('A000367');
result2.then(res => console.log(res));
