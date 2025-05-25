const path = require("path");
const fs = require("fs").promises;
const mime = require("mime-types");
const BaseController = require("./base.controller");

class FileController extends BaseController {
  async getFileTypeByExtension(filePath) {
    const mimeType = mime.lookup(filePath); // e.g., 'image/png'
    if (!mimeType) return "unknown";
    return mimeType;
  }

  async getFileList(directoryPath) {
    try {
      const entries = await fs.readdir(directoryPath, { withFileTypes: true });

      const dirs = [];
      const files = [];

      for (const entry of entries) {
        const fullPath = path.join(directoryPath, entry.name);
        const stats = await fs.lstat(fullPath);

        const item = {
          name: entry.name,
          size: stats.size, // in bytes
          permissions: (stats.mode & 0o777).toString(8), // e.g., '755'
        };

        if (entry.isFile()) {
          const mimeType = await this.getFileTypeByExtension(fullPath);
          files.push({ ...item, mimeType });
        } else if (entry.isDirectory()) {
          dirs.push(item);
        }
      }

      return { success: true, dirs, files };
    } catch (error) {
      console.log(error.message);
      return { success: false, error: error.message, dirs: [], files: [] };
    }
  }

  async getFileContent(filePath, mimeType) {
    try {
      if (mimeType && mimeType.startsWith("image/")) {
        const buffer = await fs.readFile(filePath);
        const base64String = Buffer.from(buffer).toString("base64");
        return `data:${mimeType};base64,${base64String}`;
      }

      if (
        mimeType &&
        mimeType.startsWith("application/") &&
        !mimeType.includes("json") &&
        !mimeType.includes("javascript")
      ) {
        return "!! Cannot open this file";
      }

      return await fs.readFile(filePath, "utf-8");
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async writeFileContent(filePath, content) {
    try {
      await this.writeFile(filePath, content);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

module.exports = FileController;
