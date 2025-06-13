// const CONFIG_PATH = "vizor.yaml";
const CONFIG_PATH = "/etc/vizor/vizor.yaml";

const DEFAULT_CONFIG = {
  server: {
    port: 25125,
    host: "127.0.0.1",
  },
  log: {
    level: "info",
    file: "/var/log/vizor.log",
  },
  file_actions: {
    copy: true,
    move: true,
    delete: false,
    rename: true,
    create: true,
    create_dir: true,
  },
};

module.exports = { CONFIG_PATH, DEFAULT_CONFIG };
