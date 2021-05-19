import { Model } from "./Model";

export interface Job {
  jobId: number;
  customer: string;
  startDate: Date;
  days: number;
  comments: string;
  models: Model[];
}
