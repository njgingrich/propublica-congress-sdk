import { ApiClient } from '../client';
import { BaseRequestParams, ChamberRequestParams } from '../types';
import {
  MemberListResult,
  SingleMemberResult,
  NewMemberListResult,
  CurrentMemberListResult,
  LeavingMemberListResult,
  MemberVotesResult,
  MemberVoteComparisonResult,
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

declare module '../client' {
  interface ApiClient {
    getAllMembers(params: AllMembersParams): Promise<MemberListResult>;
    getMember(params: MemberIdParams): Promise<SingleMemberResult>;
    getNewMembers(): Promise<NewMemberListResult>;
    getMembersForState(params: MembersForStateParams): Promise<CurrentMemberListResult>;
    getLeavingMembers(params: LeavingMembersParams): Promise<LeavingMemberListResult>;
    getMemberVotePositions(params: MemberIdParams): Promise<MemberVotesResult>;
    getMemberVoteComparison(params: TwoMemberParams): Promise<MemberVoteComparisonResult>;
  }
}

ApiClient.prototype.getAllMembers = async function(params: AllMembersParams) {
  params = this.withDefaults(params);

  const response = await this.request({
    url: `/${this.congressNumber}/${params.chamber}/members`,
  });
  return response.data as MemberListResult;
};

ApiClient.prototype.getMember = async function(params: MemberIdParams) {
  params = this.withDefaults(params);

  const response = await this.request({
    url: `/members/${params.memberId}`,
  });
  return response.data as SingleMemberResult;
};

ApiClient.prototype.getNewMembers = async function() {
  const response = await this.request({
    url: `/members/new`,
  });
  return response.data as NewMemberListResult;
};

ApiClient.prototype.getMembersForState = async function(params: MembersForStateParams) {
  params = this.withDefaults(params);

  let url = `/members/${params.chamber}/${params.state}/current`;
  if (params.district) {
    url = `/members/${params.chamber}/${params.state}/${params.district}/current`;
  }

  const response = await this.request({ url });
  return response.data as CurrentMemberListResult;
};

ApiClient.prototype.getLeavingMembers = async function(params: LeavingMembersParams) {
  params = this.withDefaults(params);

  const response = await this.request({
    url: `${params.congressNumber}/${params.chamber}/members/leaving`,
  });
  return response.data as LeavingMemberListResult;
};

ApiClient.prototype.getMemberVotePositions = async function(params: MemberIdParams) {
  params = this.withDefaults(params);

  const response = await this.request({
    url: `/members/${params.memberId}/votes`,
  });
  return response.data as MemberVotesResult;
};

ApiClient.prototype.getMemberVoteComparison = async function(params: TwoMemberParams) {
  params = this.withDefaults(params);
  const response = await this.request({
    url: `/members/${params.firstMemberId}/votes/${params.secondMemberId}/${params.congressNumber}/${params.chamber}`,
  });
  return response.data as MemberVoteComparisonResult;
};
