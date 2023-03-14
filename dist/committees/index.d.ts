import { CommitteeListResult, SingleCommitteeResult, CommitteeHearingListResult, SingleSubcommitteeResult } from './types';
import { ChamberRequestParams } from '../types';
interface CongressNumberParams extends ChamberRequestParams {
    congressNumber?: number;
}
interface CommitteeParams extends CongressNumberParams {
    committeeId: string;
}
interface SubcommitteeParams extends CommitteeParams {
    subcommitteeId: string;
}
declare module '../api' {
    interface CongressAPI {
        getAllCommittees(params: CongressNumberParams): Promise<CommitteeListResult>;
        getCommittee(params: CommitteeParams): Promise<SingleCommitteeResult>;
        getRecentHearings(params: CongressNumberParams): Promise<CommitteeHearingListResult>;
        getCommitteeHearings(params: CommitteeParams): Promise<CommitteeHearingListResult>;
        getSubcommittee(params: SubcommitteeParams): Promise<SingleSubcommitteeResult>;
    }
}
export {};
