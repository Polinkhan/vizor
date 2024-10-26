export type ServicesType = {
  active: "active" | "inactive" | "not-found";
  cpu_usage: number;
  description: string;
  load: string;
  pid: string;
  rss: number;
  service_name: string;
  sub: "running" | "exited" | "inactive" | "dead";
  vms: 314.671875;
};

export type AvailableJobType = {
  id: number;
  name: string;
  componentName: string;
  data: string;
};

export type MyJobsType = {
  name: string;
  endTime: Date;
  assignee: string;
  job: AvailableJobType;
};
