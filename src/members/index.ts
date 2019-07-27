import { ApiClient } from '../client';
import { Chamber } from '../types';
import {
  MemberListResult,
  SingleMemberResult,
  NewMemberListResult,
  CurrentMemberListResult,
  LeavingMemberListResult,
  MemberVotesResult,
  MemberVoteComparisonResult,
} from './types';

declare module '../client' {
  interface ApiClient {
    getAllMembers(chamber: Chamber): Promise<MemberListResult>;
    getMember(memberId: string): Promise<SingleMemberResult>;
    getNewMembers(): Promise<NewMemberListResult>;
    getMembersForState(
      chamber: Chamber,
      state: string,
      district?: string
    ): Promise<CurrentMemberListResult>;
    getLeavingMembers(): Promise<LeavingMemberListResult>;
    getMemberVotePositions(memberId: string): Promise<MemberVotesResult>;
    getMemberVoteComparison(
      firstMemberId: string,
      secondMemberId: string,
      chamber: Chamber
    ): Promise<MemberVoteComparisonResult>;
  }
}

ApiClient.prototype.getAllMembers = async function(chamber: Chamber) {
  const response = await this.request({
    url: `/${this.congressNumber}/${chamber}/members`,
  });
  return response.data as MemberListResult;
};

ApiClient.prototype.getMember = async function(memberId: string) {
  const response = await this.request({
    url: `/members/${memberId}`,
  });
  return response.data as SingleMemberResult;
};

ApiClient.prototype.getNewMembers = async function() {
  const response = await this.request({
    url: `/members/new`,
  });
  return response.data as NewMemberListResult;
};

ApiClient.prototype.getMembersForState = async function(
  chamber: Chamber,
  state: string,
  district?: string
) {
  let url = `/members/${chamber}/${state}/current`;
  if (district) {
    url = `/members/${chamber}/${state}/${district}/current`;
  }

  const response = await this.request({ url });
  return response.data as CurrentMemberListResult;
};

ApiClient.prototype.getLeavingMembers = async function() {
  const response = await this.request({
    url: `${this.congressNumber}/members/leaving`,
  });
  return response.data as LeavingMemberListResult;
};

ApiClient.prototype.getMemberVotePositions = async function(memberId: string) {
  const response = await this.request({
    url: `/members/${memberId}/votes`,
  });
  return response.data as MemberVotesResult;
};

ApiClient.prototype.getMemberVoteComparison = async function(
  firstMemberId: string,
  secondMemberId: string,
  chamber: Chamber
) {
  const response = await this.request({
    url: `/members/${firstMemberId}/votes/${secondMemberId}/${this.congressNumber}/${chamber}`,
  });
  return response.data as MemberVoteComparisonResult;
};
