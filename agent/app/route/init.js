module.exports = (io) => {
  io.on("connection", (socket) => {
    /*
     ** Dashboard Routes
     */
    require("./dashboard.route")(socket);

    /*
     ** Services Routes
     */
    require("./services.route")(socket);

    /*
     ** Files Routes
     */
    require("./files.route")(socket);

    /*
     ** Network Routes
     */
    require("./network.route")(socket);

    /*
     ** Disconnection
     */
    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};
