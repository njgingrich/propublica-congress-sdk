import { CongressAPI } from '../api';
import { VoteListResult, SingleVoteResult, NominationVotesResult } from './types';
import { ChamberRequestParams, PagedRequestParams } from '../types';

function getDateString(date: Date): string {
  return `${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getUTCDate()}`;
}

interface RollCallVoteParams extends ChamberRequestParams, PagedRequestParams {
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

declare module '../api' {
  interface CongressAPI {
    getNominationVotes(params: NominationParams): Promise<NominationVotesResult>;
    getRecentVotes(params: ChamberRequestParams): Promise<VoteListResult>;
    getRollCallVote(params: RollCallVoteParams): Promise<SingleVoteResult>;
    getVotesForDateRange(params: DateRangeParams): Promise<VoteListResult>;
    getVotesForDate(params: DateParams): Promise<VoteListResult>;
    getVotesForType(params: VoteTypeParams): Promise<VoteListResult>;
  }
}

CongressAPI.prototype.getNominationVotes = async function(
  params: NominationParams
): Promise<NominationVotesResult> {
  params = this.withDefaults(params);

  const response = await this.request({
    url: `/${params.congressNumber}/nominations`,
  });
  return response.data as NominationVotesResult;
};

CongressAPI.prototype.getRecentVotes = async function(
  params: ChamberRequestParams
): Promise<VoteListResult> {
  params = this.withDefaults(params);

  const response = await this.request({
    url: `/${params.chamber}/votes/recent`,
  });
  return response.data as VoteListResult;
};

CongressAPI.prototype.getRollCallVote = async function(
  params: RollCallVoteParams
): Promise<SingleVoteResult> {
  params = this.withDefaults(params);

  const sessionNumber = params.sessionNumber || new Date().getUTCFullYear() % 2 ? 2 : 1;
  const response = await this.request({
    url: `/${params.congressNumber}/${params.chamber}/sessions/${sessionNumber}/votes/${params.number}`,
  });
  return response.data as SingleVoteResult;
};

CongressAPI.prototype.getVotesForDateRange = async function(
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

CongressAPI.prototype.getVotesForDate = async function(
  params: DateParams
): Promise<VoteListResult> {
  params = this.withDefaults(params);
  const dateString = getDateString(params.date);

  const response = await this.request({
    url: `/${params.chamber}/votes/${dateString}/${dateString}`,
  });
  return response.data as VoteListResult;
};

CongressAPI.prototype.getVotesForType = async function(
  params: VoteTypeParams
): Promise<VoteListResult> {
  params = this.withDefaults(params);

  const response = await this.request({
    url: `/${params.congressNumber}/${params.chamber}/votes/${params.type}`,
  });
  return response.data as VoteListResult;
};
