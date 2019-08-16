import { ApiClient } from '../client';
import { VoteListResult, SingleVoteResult } from './types';
import { ChamberRequestParams } from '../types';

function getDateString(date: Date): string {
  return `${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getUTCDate()}`;
}

interface GetRollCallVoteParams extends ChamberRequestParams {
  congressNumber?: number;
  number: number;
  sessionNumber?: 1 | 2;
}

interface GetVotesForDateRangeParams extends ChamberRequestParams {
  startDate: Date;
  endDate: Date;
}

interface GetVotesForDateParams extends ChamberRequestParams {
  date: Date;
}

declare module '../client' {
  interface ApiClient {
    getRecentVotes(params: ChamberRequestParams): Promise<VoteListResult>;
    getRollCallVote(params: GetRollCallVoteParams): Promise<SingleVoteResult>;
    getVotesForDateRange(params: GetVotesForDateRangeParams): Promise<VoteListResult>;
    getVotesForDate(params: GetVotesForDateParams): Promise<VoteListResult>;
  }
}

ApiClient.prototype.getRecentVotes = async function(
  params: ChamberRequestParams
): Promise<VoteListResult> {
  params = this.withDefaults(params);

  const response = await this.request({
    url: `/${params.chamber}/votes/recent`,
  });
  return response.data as VoteListResult;
};

ApiClient.prototype.getRollCallVote = async function(
  params: GetRollCallVoteParams
): Promise<SingleVoteResult> {
  params = this.withDefaults(params);

  const sessionNumber = params.sessionNumber || new Date().getUTCFullYear() % 2 ? 2 : 1;
  const response = await this.request({
    url: `/${params.congressNumber}/${params.chamber}/sessions/${sessionNumber}/votes/${params.number}`,
  });
  return response.data as SingleVoteResult;
};

ApiClient.prototype.getVotesForDateRange = async function(
  params: GetVotesForDateRangeParams
): Promise<VoteListResult> {
  params = this.withDefaults(params);

  const startString = getDateString(params.startDate);
  const endString = getDateString(params.endDate);

  const response = await this.request({
    url: `/${params.chamber}/votes/${startString}/${endString}`,
  });
  return response.data as VoteListResult;
};

ApiClient.prototype.getVotesForDate = async function(
  params: GetVotesForDateParams
): Promise<VoteListResult> {
  params = this.withDefaults(params);
  const dateString = getDateString(params.date);

  const response = await this.request({
    url: `/${params.chamber}/votes/${dateString}/${dateString}`,
  });
  return response.data as VoteListResult;
};
