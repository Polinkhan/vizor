const { EVENTS } = require("../config/config");
const NetworkController = require("../controllers/networkController");

module.exports = (socket) => {
  // Port list
  socket.on(EVENTS.PORT_LIST, async (data) => {
    const networkController = new NetworkController();
    const response = await networkController.getPortList();
    socket.emit(EVENTS.PORT_LIST + "_response", response);
  });

  // Install net-tools
  socket.on(EVENTS.INSTALL_NET_TOOLS, async (data) => {
    const networkController = new NetworkController();
    const response = await networkController.installNetTools();
    socket.emit(EVENTS.INSTALL_NET_TOOLS + "_response", response);
  });
};
