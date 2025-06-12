const { exec } = require("child_process");

exec("sudo apt-get install -y net-tools", (error, stdout, stderr) => {
  if (error) {
    if (error.message.includes("command not found")) {
    }
  }
  if (stderr) return console.error(`stderr: ${stderr}`);

  console.log(stdout);
});
