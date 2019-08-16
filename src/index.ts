// import votes from "./votes";
import { getApiClient, ApiClient } from './client';
import './votes';
import './members';

class CongressAPI {
  public api: ApiClient;
  public constructor(apiKey: string) {
    this.api = getApiClient({ apiKey });
  }
}

const client = new CongressAPI(process.env.API_KEY || '');
const result = client.api.getVotesForDate({
  chamber: 'senate',
  date: new Date('2019-06-13'),
});
result.then(res => console.log(res));

const result2 = client.api.getMemberVotePositions({ memberId: 'A000367' });
result2.then(res => console.log(res));
