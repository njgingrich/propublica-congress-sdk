import { ApiClient } from '../client';
import { VoteListResult, SingleVoteResult } from './types';
import { Chamber } from '../types';

function getDateString(date: Date): string {
  return `${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getUTCDate()}`;
}

declare module '../client' {
  interface ApiClient {
    getRecentVotes(chamber: Chamber): Promise<VoteListResult>;
    getRollCallVote(chamber: Chamber, number: number): Promise<SingleVoteResult>;
    getVotesForDateRange(chamber: Chamber, startDate: Date, endDate: Date): Promise<VoteListResult>;
    getVotesForDate(chamber: Chamber, date: Date): Promise<VoteListResult>;
  }
}

ApiClient.prototype.getRecentVotes = async function(): Promise<VoteListResult> {
  const response = await this.request({
    url: `/senate/votes/recent`,
  });
  return response.data as VoteListResult;
};

ApiClient.prototype.getRollCallVote = async function(
  chamber: Chamber,
  number: number
): Promise<SingleVoteResult> {
  const sessionNumber = new Date().getUTCFullYear() % 2 ? 2 : 1;
  const response = await this.request({
    url: `/senate/sessions/${sessionNumber}/votes/${number}`,
  });
  return response.data as SingleVoteResult;
};

ApiClient.prototype.getVotesForDateRange = async function(
  chamber: Chamber,
  startDate: Date,
  endDate: Date
): Promise<VoteListResult> {
  const startString = getDateString(startDate);
  const endString = getDateString(endDate);

  const response = await this.request({
    url: `/${chamber}/votes/${startString}/${endString}`,
  });
  return response.data as VoteListResult;
};

ApiClient.prototype.getVotesForDate = async function(
  chamber: Chamber,
  date: Date
): Promise<VoteListResult> {
  const dateString = getDateString(date);

  const response = await this.request({
    url: `/${chamber}/votes/${dateString}/${dateString}`,
  });
  return response.data as VoteListResult;
};
