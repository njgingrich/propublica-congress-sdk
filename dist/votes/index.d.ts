import { VoteListResult, SingleVoteResult, NominationVotesResult } from './types';
import { ChamberRequestParams, PagedRequestParams, BaseRequestParams } from '../types';
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
interface NominationParams extends BaseRequestParams {
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
export {};
