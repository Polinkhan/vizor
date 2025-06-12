const { EVENTS } = require("../config/config");
const ServiceController = require("../controllers/service.controller");

module.exports = (socket) => {
  // All Services
  socket.on(EVENTS.SERVICE, async (data) => {
    const servicesController = new ServiceController();
    const response = await servicesController.getAllServices();
    socket.emit(EVENTS.SERVICE + "_response", response);
  });

  // Update Services
  socket.on(EVENTS.UPDATE_SERVICE, async (data) => {
    const { action, service_name } = data;
    const servicesController = new ServiceController();
    const response = await servicesController.update_service(action, service_name);
    socket.emit(EVENTS.UPDATE_SERVICE + "_response", response);
  });
};
