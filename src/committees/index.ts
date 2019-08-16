import { CongressAPI } from '../api';
import {
  CommitteeListResult,
  SingleCommitteeResult,
  CommitteeHearingListResult,
  SingleSubcommitteeResult,
} from './types';
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

CongressAPI.prototype.getAllCommittees = async function(params: CongressNumberParams) {
  params = this.withDefaults(params);

  const response = await this.request({
    url: `/${params.congressNumber}/${params.chamber}/committees`,
    format: params.format,
  });
  return response.data as CommitteeListResult;
};

CongressAPI.prototype.getCommittee = async function(params: CommitteeParams) {
  params = this.withDefaults(params);

  const response = await this.request({
    url: `/${params.congressNumber}/${params.chamber}/committees/${params.committeeId}`,
    format: params.format,
  });
  return response.data as SingleCommitteeResult;
};

CongressAPI.prototype.getRecentHearings = async function(params: CongressNumberParams) {
  params = this.withDefaults(params);

  const response = await this.request({
    url: `/${params.congressNumber}/committees/hearings`,
    format: params.format,
  });
  return response.data as CommitteeHearingListResult;
};

CongressAPI.prototype.getCommitteeHearings = async function(params: CommitteeParams) {
  params = this.withDefaults(params);

  const response = await this.request({
    url: `/${params.congressNumber}/${params.chamber}/committees/${params.committeeId}/hearings`,
    format: params.format,
  });
  return response.data as CommitteeHearingListResult;
};

CongressAPI.prototype.getSubcommittee = async function(params: SubcommitteeParams) {
  params = this.withDefaults(params);

  const response = await this.request({
    url: `/${params.congressNumber}/${params.chamber}/committees/${params.committeeId}/subcommittees/${params.subcommitteeId}`,
    format: params.format,
  });
  return response.data as SingleSubcommitteeResult;
};
