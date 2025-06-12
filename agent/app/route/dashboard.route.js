const { EVENTS } = require("../config/config");
const DashboardController = require("../controllers/dashboard.controller");
module.exports = (socket) => {
  //  Dashboard Info
  socket.on(EVENTS.DASHBOARD, async (data) => {
    const dashboardController = new DashboardController();
    const response = await dashboardController.getDashboardInfo();
    socket.emit(EVENTS.DASHBOARD + "_response", response);
  });
};
