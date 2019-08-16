import { ApiClient } from '../client';
import { VoteListResult, SingleVoteResult, NominationVotesResult } from './types';
import { ChamberRequestParams } from '../types';

function getDateString(date: Date): string {
  return `${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getUTCDate()}`;
}

interface RollCallVoteParams extends ChamberRequestParams {
  congressNumber?: number;
  number: number;
  sessionNumber?: 1 | 2;
}

interface DateRangeParams extends ChamberRequestParams {
  startDate: Date;
  endDate: Date;
}

interface DateParams extends ChamberRequestParams {
  date: Date;
}

interface VoteTypeParams extends ChamberRequestParams {
  congressNumber?: number;
  type: 'missed' | 'party' | 'loneno' | 'perfect';
}

interface NominationParams {
  congressNumber?: number;
}

declare module '../client' {
  interface ApiClient {
    getNominationVotes(params: NominationParams): Promise<NominationVotesResult>;
    getRecentVotes(params: ChamberRequestParams): Promise<VoteListResult>;
    getRollCallVote(params: RollCallVoteParams): Promise<SingleVoteResult>;
    getVotesForDateRange(params: DateRangeParams): Promise<VoteListResult>;
    getVotesForDate(params: DateParams): Promise<VoteListResult>;
    getVotesForType(params: VoteTypeParams): Promise<VoteListResult>;
  }
}

ApiClient.prototype.getNominationVotes = async function(
  params: NominationParams
): Promise<NominationVotesResult> {
  params = this.withDefaults(params);

  const response = await this.request({
    url: `/${params.congressNumber}/nominations`,
  });
  return response.data as NominationVotesResult;
};

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
  params: RollCallVoteParams
): Promise<SingleVoteResult> {
  params = this.withDefaults(params);

  const sessionNumber = params.sessionNumber || new Date().getUTCFullYear() % 2 ? 2 : 1;
  const response = await this.request({
    url: `/${params.congressNumber}/${params.chamber}/sessions/${sessionNumber}/votes/${params.number}`,
  });
  return response.data as SingleVoteResult;
};

ApiClient.prototype.getVotesForDateRange = async function(
  params: DateRangeParams
): Promise<VoteListResult> {
  params = this.withDefaults(params);

  const startString = getDateString(params.startDate);
  const endString = getDateString(params.endDate);

  const response = await this.request({
    url: `/${params.chamber}/votes/${startString}/${endString}`,
  });
  return response.data as VoteListResult;
};

ApiClient.prototype.getVotesForDate = async function(params: DateParams): Promise<VoteListResult> {
  params = this.withDefaults(params);
  const dateString = getDateString(params.date);

  const response = await this.request({
    url: `/${params.chamber}/votes/${dateString}/${dateString}`,
  });
  return response.data as VoteListResult;
};

ApiClient.prototype.getVotesForType = async function(
  params: VoteTypeParams
): Promise<VoteListResult> {
  params = this.withDefaults(params);

  const response = await this.request({
    url: `/${params.congressNumber}/${params.chamber}/votes/${params.type}`,
  });
  return response.data as VoteListResult;
};
