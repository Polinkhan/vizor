const { EVENTS } = require("../config/config");
const FileController = require("../controllers/file.controller");
const ServiceController = require("../controllers/service.controller");

module.exports = (io) => {
  // ------------------------------------------
  // Socket.io connection
  // ------------------------------------------
  io.on("connection", (socket) => {
    console.log("User connected");

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

    // Files list
    socket.on(EVENTS.FILES, async (data) => {
      const { path } = data;
      const fileController = new FileController();
      const response = await fileController.getFileList(path);
      socket.emit(EVENTS.FILES + "_response", response);
    });

    // Files list
    socket.on(EVENTS.FILE_CONTENT, async (data) => {
      const { file_path, mimeType } = data;
      const fileController = new FileController();
      const response = await fileController.getFileContent(file_path, mimeType);
      socket.emit(EVENTS.FILE_CONTENT + "_response", response);
    });

    // ==============================
    // Handle disconnection
    // ==============================
    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};
