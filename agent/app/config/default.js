const CONFIG_PATH = "vizor.yaml";
// const CONFIG_PATH = "/etc/vizor/vizor.yaml";

const DEFAULT_CONFIG = {
  server: {
    port: 25125,
    host: "127.0.0.1",
  },
  log: {
    level: "info",
    file: "/var/log/vizor.log",
  },
};

module.exports = { CONFIG_PATH, DEFAULT_CONFIG };
