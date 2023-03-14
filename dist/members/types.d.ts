import { BaseApiResult, CapitalizedChamber, URLString } from '../types';
export declare type MemberId = string;
interface SharedMember {
    title: string;
    short_title: string;
    state: string;
    party: 'R' | 'D' | 'ID';
    leadership_role: string;
    fec_candidate_id: string;
    lis_id: string;
    ocd_id: string;
    seniority: string;
    senate_class: number | string;
    state_rank: string;
    office: string;
    phone: string;
    fax: string;
    contact_form: URLString;
    missed_votes_pct: number;
    votes_with_party_pct: number;
}
interface MemberName {
    first_name: string;
    middle_name: string;
    last_name: string;
    suffix: string;
}
export interface Member extends SharedMember, MemberName {
    id: MemberId;
    api_uri: URLString;
    date_of_birth: string;
    gender: 'M' | 'F';
    twitter_account: string;
    facebook_account: string;
    youtube_account: string;
    govtrack_id: string;
    cspan_id: string;
    votesmart_id: string;
    icpsr_id: string;
    crp_id: string;
    google_entity_id: string;
    url: URLString;
    rss_url: URLString;
    in_office: boolean;
    dw_nominate: number;
    ideal_point: any;
    next_election: string;
    total_votes: number;
    missed_votes: number;
    total_present: number;
    last_updated: string;
    senate_class: string;
}
interface MemberRole extends SharedMember {
    congress: string;
    chamber: CapitalizedChamber;
    senate_class: number;
    start_date: string;
    end_date: string;
    bills_sponsored: number;
    bills_cosponsored: number;
    committees: Committee[];
    subcommittees: SubCommittee[];
}
interface Committee {
    name: string;
    code: string;
    api_uri: URLString;
    side: string;
    title: string;
    rank_in_party: number;
    begin_date: string;
    end_date: string;
}
interface SubCommittee extends Committee {
    parent_committee_id: string;
}
export interface SingleMember extends MemberName {
    member_id: MemberId;
    date_of_birth: string;
    gender: 'M' | 'F';
    url: URLString;
    times_topics_url: URLString;
    times_tag: string;
    govtract_id: string;
    cspan_id: string;
    votesmart_id: string;
    icpsr_id: string;
    twitter_account: string;
    facebook_account: string;
    youtube_account: string;
    crp_id: string;
    google_entity_id: string;
    rss_url: URLString;
    in_office: boolean;
    current_party: 'D' | 'R' | 'I';
    most_recent_vote: string;
    last_updated: string;
    roles: MemberRole[];
}
export interface NewMember extends MemberName {
    id: MemberId;
    api_uri: URLString;
    party: 'R' | 'D' | 'I';
    chamber: CapitalizedChamber;
    state: string;
    district: string;
    start_date: string;
}
export interface CurrentMember extends MemberName {
    id: MemberId;
    name: string;
    role: string;
    gender: 'M' | 'F';
    party: 'R' | 'D' | 'I';
    times_topics_url: URLString;
    twitter_id: string;
    facebook_account: string;
    youtube_id: string;
    seniority: string;
    next_election: string;
    api_uri: URLString;
}
export interface LeavingMember extends MemberName {
    id: MemberId;
    api_uri: string;
    party: 'D' | 'R' | 'I';
    state: string;
    district: string;
    begin_date: string;
    end_date: string;
    status: string;
    note: string;
}
export interface MemberVotes {
    member_id: MemberId;
    total_votes: string;
    offset: string;
    votes: MemberVote[];
}
interface MemberVote {
    member_id: MemberId;
    chamber: CapitalizedChamber;
    congress: string;
    session: string;
    roll_call: string;
    vote_uri: URLString;
    bill: {
        bill_id: string;
        number: string;
        bill_uri: URLString;
        title: string;
        latest_action: string;
    };
    description: string;
    question: string;
    result: string;
    date: string;
    time: string;
    total: {
        yes: number;
        no: number;
        present: number;
        not_voting: number;
    };
    position: string;
}
interface MemberVoteComparison {
    first_member_id: MemberId;
    first_member_api_uri: URLString;
    second_member_id: MemberId;
    second_member_api_uri: URLString;
    congress: string;
    chamber: CapitalizedChamber;
    common_votes: string;
    disagree_votes: string;
    agree_percent: string;
    disagree_percent: string;
}
interface MemberBill {
    number: string;
    api_uri: URLString;
    title: string;
    sponsor_uri: URLString;
    introduced_date: string;
    cosponsors: string;
    committees: string;
    latest_major_action_date: string;
    latest_major_action: string;
    first_member_date: string;
    second_member_date: string;
}
interface MemberBillComparison {
    first_member_api_uri: URLString;
    second_member_api_uri: URLString;
    chamber: CapitalizedChamber;
    congress: string;
    common_bills: string;
    bills: MemberBill[];
}
interface CosponsoredBill {
    congress: string;
    bill_id: string;
    bill_type: string;
    number: string;
    bill_uri: URLString;
    title: string;
    short_title: string;
    cosponsored_date: string;
    sponsor_title: string;
    sponsor_id: string;
    sponsor_name: string;
    sponsor_state: string;
    sponsor_party: string;
    sponsor_uri: URLString;
    gpo_pdf_uri: URLString;
    congressdotgov_url: URLString;
    govtrack_url: URLString;
    introduced_date: string;
    active: boolean;
    last_vote: string;
    house_passage: boolean;
    senate_passage: boolean;
    enacted: boolean;
    vetoed: boolean;
    cosponsors: number;
    cosponsors_by_party: {
        R: number;
        D: number;
        I: number;
    };
    committees: string;
    primary_subject: string;
    summary: string;
    summary_short: string;
    latest_major_action_date: string;
    latest_major_action: string;
}
interface MemberCosponsors {
    id: string;
    member_uri: URLString;
    name: string;
    num_results: number;
    offset: number;
    bills: CosponsoredBill[];
}
export interface MemberListResult extends BaseApiResult {
    results: {
        congress: string;
        chamber: CapitalizedChamber;
        num_results: number;
        offset: number;
        members: Member[];
    };
}
export interface SingleMemberResult extends BaseApiResult {
    results: SingleMember[];
}
export interface NewMemberListResult extends BaseApiResult {
    results: {
        num_results: string;
        offset: string;
        members: NewMember[];
    };
}
export interface CurrentMemberListResult extends BaseApiResult {
    results: CurrentMember[];
}
export interface LeavingMemberListResult extends BaseApiResult {
    congress: string;
    chamber: CapitalizedChamber;
    num_results: number;
    offset: number;
    members: LeavingMember[];
}
export interface MemberVotesResult extends BaseApiResult {
    results: MemberVotes[];
}
export interface MemberVoteComparisonResult extends BaseApiResult {
    results: MemberVoteComparison;
}
export interface MemberBillComparisonResult extends BaseApiResult {
    results: MemberBillComparison[];
}
export interface MemberCosponsorsResult extends BaseApiResult {
    results: MemberCosponsors[];
}
export {};
