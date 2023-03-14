import { BaseRequestParams, ChamberRequestParams } from '../types';
import { MemberListResult, SingleMemberResult, NewMemberListResult, CurrentMemberListResult, LeavingMemberListResult, MemberVotesResult, MemberVoteComparisonResult, MemberBillComparisonResult, MemberCosponsorsResult } from './types';
interface AllMembersParams extends ChamberRequestParams {
    congressNumber?: number;
}
interface MemberIdParams extends BaseRequestParams {
    memberId: string;
}
interface MembersForStateParams extends ChamberRequestParams {
    state: string;
    district?: string;
}
interface LeavingMembersParams extends ChamberRequestParams {
    congressNumber?: number;
}
interface TwoMemberParams extends ChamberRequestParams {
    congressNumber?: string;
    firstMemberId: string;
    secondMemberId: string;
}
interface CosponsoredBillsParams extends MemberIdParams {
    type: 'cosponsored' | 'withdrawn';
}
declare module '../api' {
    interface CongressAPI {
        getAllMembers(params: AllMembersParams): Promise<MemberListResult>;
        getMember(params: MemberIdParams): Promise<SingleMemberResult>;
        getNewMembers(params: BaseRequestParams): Promise<NewMemberListResult>;
        getMembersForState(params: MembersForStateParams): Promise<CurrentMemberListResult>;
        getLeavingMembers(params: LeavingMembersParams): Promise<LeavingMemberListResult>;
        getMemberVotePositions(params: MemberIdParams): Promise<MemberVotesResult>;
        getMemberVoteComparison(params: TwoMemberParams): Promise<MemberVoteComparisonResult>;
        getMemberSponsorshipsComparison(params: TwoMemberParams): Promise<MemberBillComparisonResult>;
        getCosponsoredBillsForMember(params: CosponsoredBillsParams): Promise<MemberCosponsorsResult>;
    }
}
export {};
