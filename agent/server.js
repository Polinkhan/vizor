const server = require("./app");
const { getConfig } = require("./app/config/config");
const { checkAllPrerequisites } = require("./app/middlewares/prerequisites");

(async () => {
  try {
    // if everything is ok,
    await checkAllPrerequisites();
    const config = await getConfig();

    // then start the server
    server.listen(config.server.port, config.server.host, () => {
      console.log(`\nApp Started successfully\n`);
    });
  } catch (err) {
    console.log(err?.message);
    process.exit(1);
  }
})();
