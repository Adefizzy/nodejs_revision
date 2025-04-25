const fs = require("fs/promises");
const path = require("path");

const {
  CREATE_FILE,
  DELETE_FILE,
  RENAME_FILE,
  ADD_TO_FILE,
  createFile,
  deleteFile,
  renameFile,
  addToFile,
} = require("./file_actions");

 module.exports = async () => {
  //commands

  let fileHandler;
  try {
    fileHandler = await fs.open(path.join(__dirname, "command.txt"), "r");

    fileHandler.on("change", async (data) => {
      console.log("File changed");
      const { size } = await fs.stat(path.join(__dirname, "command.txt"));

      const buff = Buffer.alloc(size);

      await fileHandler.read(buff, 0, buff.byteLength, 0);

      const content = buff.toString("utf-8");

      const allContents = content.split("\n");

      for (const line of allContents) {
        if (line.startsWith(CREATE_FILE)) {
          await createFile(line);
        }
        if (line.startsWith(DELETE_FILE)) {
          await deleteFile(line);
        }
        if (line.startsWith(RENAME_FILE)) {
          await renameFile(line);
        }
        if (line.startsWith(ADD_TO_FILE)) {
          await addToFile(line);
        }
      }
    });

    const watcher = fs.watch(path.join(__dirname, "command.txt"));
    for await (const event of watcher) {
      if (event.eventType === "change") {
        console.log(event);
        fileHandler.emit("change");
      }
    }
  } catch (error) {
    await fileHandler.close();
  }
}
