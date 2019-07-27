import { ApiClient } from '../client';
import {
  CommitteeListResult,
  SingleCommitteeResult,
  CommitteeHearingListResult,
  SingleSubcommitteeResult,
} from './types';
import { Chamber } from '../types';

declare module '../client' {
  interface ApiClient {
    getAllCommittees(chamber: Chamber): Promise<CommitteeListResult>;
    getCommittee(chamber: Chamber, committeeId: string): Promise<SingleCommitteeResult>;
    getRecentHearings(): Promise<CommitteeHearingListResult>;
    getCommitteeHearings(
      chamber: Chamber,
      committeeId: string
    ): Promise<CommitteeHearingListResult>;
    getSubcommittee(
      chamber: Chamber,
      committeeId: string,
      subcommitteeId: string
    ): Promise<SingleSubcommitteeResult>;
  }
}

ApiClient.prototype.getAllCommittees = async function(chamber: Chamber) {
  const response = await this.request({
    url: `/${this.congressNumber}/${chamber}/committees`,
  });
  return response.data as CommitteeListResult;
};

ApiClient.prototype.getCommittee = async function(chamber: Chamber, committeeId: string) {
  const response = await this.request({
    url: `/${this.congressNumber}/${chamber}/committees/${committeeId}`,
  });
  return response.data as SingleCommitteeResult;
};

ApiClient.prototype.getRecentHearings = async function() {
  const response = await this.request({
    url: `/${this.congressNumber}/committees/hearings`,
  });
  return response.data as CommitteeHearingListResult;
};

ApiClient.prototype.getCommitteeHearings = async function(chamber: Chamber, committeeId: string) {
  const response = await this.request({
    url: `/${this.congressNumber}/${chamber}/committees/${committeeId}/hearings`,
  });
  return response.data as CommitteeHearingListResult;
};

ApiClient.prototype.getSubcommittee = async function(
  chamber: Chamber,
  committeeId: string,
  subcommitteeId: string
) {
  const response = await this.request({
    url: `/${this.congressNumber}/${chamber}/committees/${committeeId}/subcommittees/${subcommitteeId}`,
  });
  return response.data as SingleSubcommitteeResult;
};
