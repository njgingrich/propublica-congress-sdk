import { BaseApiResult, BasePagedResponse, URLString } from '../types';

type Chamber = 'House' | 'Senate';

export interface Bill {
  number: string;
  bill_id: string;
  api_uri: URLString;
  title: string;
  latest_action: string;
}

export interface Nomination {
  nomination_id: string;
  number: string;
  name: string;
  agency: string;
}

interface VotePosition {
  member_id: string;
  name: string;
  party: 'R' | 'D' | 'I';
  state: string;
  vote_position: 'Yes' | 'No' | 'Not Voting';
  dw_nominate: number;
}

interface VoteTotal {
  yes: number;
  no: number;
  present: number;
  not_voting: number;
  majority_position?: 'Yes' | 'No';
}

interface Member {
  id: string;
  api_uri: URLString;
  name: string;
  party: 'R' | 'D' | 'I';
  state: string;
}

interface MemberMissedVotes extends Member {
  total_votes: number;
  missed_votes: number;
  missed_votes_pct: number;
  rank: number;
  notes: string;
}

interface MemberPartyVotes extends Member {
  total_votes: number;
  votes_with_party: number;
  party_votes_pct: number;
  rank: number;
  notes: string;
}

interface MemberLoneNoVotes extends Member {
  total_votes: number;
  loneno: number;
  rank: number;
  notes: string;
}

interface MemberPerfectVotes extends Member {
  total_votes: number;
  notes: string;
}

/**
 * Of the format:
 *
 * "Ryan (WI)": 239,
 * "Pelosi": 189,
 * "Ryan (OH)": 2,
 * "Cooper": 1,
 * "Webster": 1,
 * "Not Voting": 2,
 * "Lewis (GA)": 1
 */
interface SpeakerVoteTotal {
  [key: string]: number;
}

interface Vote {
  congress: number;
  chamber: Chamber;
  session: number;
  roll_call: number;
  source: URLString;
  url: URLString;
  vote_uri: URLString;
  bill?: Bill;
  amendment: {};
  nomination?: Nomination;
  question: string;
  question_text: string;
  description: string;
  vote_type: '1/2' | '2/3 YEA-AND-NAY' | '3/5' | 'YEA_AND_NAY' | 'RECORDED VOTE';
  // YYYY-MM-DD
  date: string;
  // HH:MM:SS
  time: string;
  result: string;
  tie_breaker?: string;
  tie_breaker_vote?: 'Yea' | 'Nay';
  document_number: string;
  document_title: string;
  democratic: VoteTotal;
  republican: VoteTotal | SpeakerVoteTotal;
  independent: VoteTotal | SpeakerVoteTotal;
  total: VoteTotal | SpeakerVoteTotal;
}

interface VoteWithPositions extends Vote {
  positions: VotePosition[];
  vacant_seats: [];
}

export interface VoteListResult extends BaseApiResult {
  results: {
    chamber: Chamber;
    offset: number;
    num_results: number;
    votes: Vote[];
  };
}

export interface SingleVoteResult extends BaseApiResult {
  results: {
    votes: {
      vote: VoteWithPositions;
    };
  };
}

export interface MemberMissedVotesResult extends BaseApiResult {
  results: BasePagedResponse & {
    congress: number;
    members: MemberMissedVotes[];
  };
}

export interface MemberPartyVotesResult extends BaseApiResult {
  results: BasePagedResponse & {
    congress: number;
    members: MemberPartyVotes[];
  };
}

export interface MemberLoneNoVotesResult extends BaseApiResult {
  results: BasePagedResponse & {
    congress: number;
    members: MemberLoneNoVotes[];
  };
}

export interface MemberPerfectVotesResult extends BaseApiResult {
  results: BasePagedResponse & {
    congress: number;
    members: MemberPerfectVotes[];
  };
}
