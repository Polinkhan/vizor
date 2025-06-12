const fs = require("fs");
const yaml = require("js-yaml");
const { run } = require("../utils/execute");
const { CONFIG_PATH } = require("../config/default");

const getCurrentUser = async () => {
  try {
    return await run("whoami");
  } catch (err) {}
};

const checkRootAccess = async () => {
  const currentUser = await getCurrentUser();

  if (currentUser !== "root") {
    throw new Error(
      "\n⚠️  Error: Insufficient Permissions\n\n" +
        " - This application requires root/administrator privileges to function properly.\n" +
        " - Please restart the application with elevated permissions\n\n" +
        " - Don't worry, it's safe to run, you can see the source code here: " +
        process.env.GITHUB_URL +
        "\n"
    );
  }
};

const checkYamlConfig = async () => {
  if (!fs.existsSync(CONFIG_PATH)) {
    throw new Error(`${CONFIG_PATH} not found`);
  }
};

const checkAllPrerequisites = async () => {
  await checkRootAccess();
  await checkYamlConfig();
};

module.exports = { checkAllPrerequisites };
