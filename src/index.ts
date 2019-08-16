// import votes from "./votes";
import { CongressAPI } from './api';
import './votes';
import './members';

const Congress = new CongressAPI({ apiKey: process.env.API_KEY || '' });
const result = Congress.getVotesForDate({
  chamber: 'senate',
  date: new Date('2019-06-13'),
});
result.then(res => console.log(res));

const result2 = Congress.getMemberVotePositions({ memberId: 'A000367' });
result2.then(res => console.log(res));
