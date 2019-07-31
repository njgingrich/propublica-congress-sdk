import { BaseApiResult, BasePagedResult, Chamber, URLString } from '../types';
import { MemberId } from '../members/types';
type CommitteeId = string;

interface BaseCommittee {
  id: CommitteeId;
  name: string;
  url: URLString;
  chair: string;
  chair_id: MemberId;
  chair_party: 'R' | 'D' | 'I';
  chair_state: string;
  ranking_member_id: MemberId;
}

export interface Committee extends BaseCommittee {
  api_uri: URLString;
  chair_uri: URLString;
  subcommittees: BaseSubcommittee[];
}

interface BaseSubcommittee {
  id: CommitteeId;
  name: string;
  api_uri: URLString;
}

interface Subcommittee {
  congress: string;
  chamber: Chamber;
  num_results: number;
  id: CommitteeId;
  name: string;
  committee_id: CommitteeId;
  committee_name: string;
  committee_url: URLString;
  chair: string;
  chair_id: MemberId;
  chair_party: 'R' | 'D' | 'I';
  chair_state: string;
  ranking_member_id: MemberId;
  current_members: CommitteeMember[];
}

interface CommitteeMember {
  id: MemberId;
  name: string;
  api_uri: URLString;
  party: 'R' | 'D' | 'I';
  // /committee/:id current_members has the chamber property, /committee/subcommittees/:id does not
  side: string;
  rank_in_party: number;
  state: string;
  note: string;
  begin_date: string;
}

interface CommitteeHearing {
  chamber: Chamber;
  committee: string;
  committee_code: string;
  api_uri: URLString;
  date: string;
  time: string;
  location: string;
  description: string;
  bill_ids: string[];
  url: URLString;
  meeting_type: string;
}

export interface SingleCommittee extends BaseCommittee {
  congress: string;
  chamber: Chamber;
  num_results: number;
  current_members: CommitteeMember[];
}

export interface CommitteeListResult extends BaseApiResult {
  results: {
    congress: string;
    chamber: string;
    num_results: number;
    committees: Committee[];
  }[];
}

export interface SingleCommitteeResult extends BaseApiResult {
  results: SingleCommittee[];
}

export interface CommitteeHearingListResult extends BaseApiResult {
  results: (BasePagedResult & {
    hearings: CommitteeHearing[];
  })[];
}

export interface SingleSubcommitteeResult extends BaseApiResult {
  results: Subcommittee[];
}
