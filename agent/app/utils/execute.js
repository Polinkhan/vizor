const { exec } = require("child_process");

const run = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        return reject(`Error executing command: ${error.message}`);
      }
      if (stderr) {
        return reject(`Error in command output: ${stderr}`);
      }
      resolve(stdout.trim());
    });
  });
};

module.exports = { run };
