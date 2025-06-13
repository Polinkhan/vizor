const { EVENTS } = require("../config/config");
const TaskManagerController = require("../controllers/taskManager.controller");
module.exports = (socket) => {
  //  Task Manager Info
  socket.on(EVENTS.CPU_UTILIZATION, async (data) => {
    const taskManagerController = new TaskManagerController();
    const response = await taskManagerController.getCpuUtilization();
    socket.emit(EVENTS.CPU_UTILIZATION + "_response", response);
  });

  socket.on(EVENTS.CPU_DETAILS, async (data) => {
    const taskManagerController = new TaskManagerController();
    const response = await taskManagerController.getCpuDetails();
    socket.emit(EVENTS.CPU_DETAILS + "_response", response);
  });

  socket.on(EVENTS.MEMORY_UTILIZATION, async (data) => {
    const taskManagerController = new TaskManagerController();
    const response = await taskManagerController.getMemoryUtilization();
    socket.emit(EVENTS.MEMORY_UTILIZATION + "_response", response);
  });

  socket.on(EVENTS.NETWORK_USAGE, async (data) => {
    const taskManagerController = new TaskManagerController();
    const response = await taskManagerController.getNetworkUsage();
    socket.emit(EVENTS.NETWORK_USAGE + "_response", response);
  });

  socket.on(EVENTS.NETWORK_DETAILS, async (data) => {
    const taskManagerController = new TaskManagerController();
    const response = await taskManagerController.getNetworkDetails();
    socket.emit(EVENTS.NETWORK_DETAILS + "_response", response);
  });
};
