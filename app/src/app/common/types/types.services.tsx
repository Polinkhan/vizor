export type ServicesType = {
  active: "active" | "inactive" | "not-found";
  cpu_usage: number;
  memory_usage: number;
  description: string;
  load: string;
  pid: string;
  service_name: string;
  sub: "running" | "exited" | "inactive" | "dead";
};
