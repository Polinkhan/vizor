const { EVENTS } = require("../config/config");
const FileController = require("../controllers/file.controller");

module.exports = (socket) => {
  // Files list
  socket.on(EVENTS.FILES, async (data) => {
    const { path } = data;
    const fileController = new FileController();
    const response = await fileController.getFileList(path);
    socket.emit(EVENTS.FILES + "_response", response);
  });

  // Files Content
  socket.on(EVENTS.FILE_CONTENT, async (data) => {
    const { file_path, mimeType } = data;
    const fileController = new FileController();
    const response = await fileController.getFileContent(file_path, mimeType);
    socket.emit(EVENTS.FILE_CONTENT + "_response", response);
  });
};
