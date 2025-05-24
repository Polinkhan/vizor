export type ServicesType = {
  active: "active" | "inactive" | "not-found";
  cpu_usage: number;
  description: string;
  load: string;
  pid: string;
  rss: number;
  service_name: string;
  sub: "running" | "exited" | "inactive" | "dead";
  vms: number;
};
