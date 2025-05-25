import fs from "node:fs/promises";

async function listFilesAndDirs(path) {
  const entries = await fs.readdir(path, { withFileTypes: true });

  const files = [];
  const directories = [];

  for (const entry of entries) {
    if (entry.isFile()) {
      files.push(entry.name);
    } else if (entry.isDirectory()) {
      directories.push(entry.name);
    }
  }

  return { files, directories };
}

const { files, directories } = await listFilesAndDirs("/var/log");

console.log("Files:", files);
console.log("Directories:", directories);
