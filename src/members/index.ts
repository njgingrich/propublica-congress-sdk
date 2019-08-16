import { CongressAPI } from '../api';
import { BaseRequestParams, ChamberRequestParams } from '../types';
import {
  MemberListResult,
  SingleMemberResult,
  NewMemberListResult,
  CurrentMemberListResult,
  LeavingMemberListResult,
  MemberVotesResult,
  MemberVoteComparisonResult,
  MemberBillComparisonResult,
  MemberCosponsorsResult,
} from './types';

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

CongressAPI.prototype.getAllMembers = async function(params: AllMembersParams) {
  params = this.withDefaults(params);

  const response = await this.request({
    url: `/${this.congressNumber}/${params.chamber}/members`,
    format: params.format,
  });
  return response.data as MemberListResult;
};

CongressAPI.prototype.getMember = async function(params: MemberIdParams) {
  params = this.withDefaults(params);

  const response = await this.request({
    url: `/members/${params.memberId}`,
    format: params.format,
  });
  return response.data as SingleMemberResult;
};

CongressAPI.prototype.getNewMembers = async function(params: BaseRequestParams) {
  params = this.withDefaults(params);

  const response = await this.request({
    url: `/members/new`,
    format: params.format,
  });
  return response.data as NewMemberListResult;
};

CongressAPI.prototype.getMembersForState = async function(params: MembersForStateParams) {
  params = this.withDefaults(params);

  let url = `/members/${params.chamber}/${params.state}/current`;
  if (params.district) {
    url = `/members/${params.chamber}/${params.state}/${params.district}/current`;
  }

  const response = await this.request({ url, format: params.format });
  return response.data as CurrentMemberListResult;
};

CongressAPI.prototype.getLeavingMembers = async function(params: LeavingMembersParams) {
  params = this.withDefaults(params);

  const response = await this.request({
    url: `${params.congressNumber}/${params.chamber}/members/leaving`,
    format: params.format,
  });
  return response.data as LeavingMemberListResult;
};

CongressAPI.prototype.getMemberVotePositions = async function(params: MemberIdParams) {
  params = this.withDefaults(params);

  const response = await this.request({
    url: `/members/${params.memberId}/votes`,
    format: params.format,
  });
  return response.data as MemberVotesResult;
};

CongressAPI.prototype.getMemberVoteComparison = async function(params: TwoMemberParams) {
  params = this.withDefaults(params);

  const response = await this.request({
    url: `/members/${params.firstMemberId}/votes/${params.secondMemberId}/${params.congressNumber}/${params.chamber}`,
    format: params.format,
  });
  return response.data as MemberVoteComparisonResult;
};

CongressAPI.prototype.getMemberSponsorshipsComparison = async function(params: TwoMemberParams) {
  params = this.withDefaults(params);

  const response = await this.request({
    url: `/members/${params.firstMemberId}/bills/${params.secondMemberId}/${params.congressNumber}/${params.chamber}`,
    format: params.format,
  });
  return response.data as MemberBillComparisonResult;
};

CongressAPI.prototype.getCosponsoredBillsForMember = async function(
  params: CosponsoredBillsParams
) {
  params = this.withDefaults(params);

  const response = await this.request({
    url: `/members/${params.memberId}/bills/${params.type}`,
    format: params.format,
  });
  return response.data as MemberCosponsorsResult;
};
