const fs = require("fs/promises");
const path = require("path");

const CREATE_FILE = "create a file";
const DELETE_FILE = "delete the file";
const RENAME_FILE = "rename the file";
const ADD_TO_FILE = "add to the file";

const createFile = async (content) => {
  const fileName = content.split(CREATE_FILE)[1].trim();
  if (!fileName) {
    console.log("File name is required");
    return;
  }
  try {
    const fileHandlerExist = await fs.open(
      path.join(__dirname, fileName),
      "r"
    );
    fileHandlerExist.close();
    console.log("File already exists");
  } catch (error) {
    const newFileHandler = await fs.open(path.join(__dirname, fileName), "w");
    newFileHandler.close();
    console.log("File created");
  }
};

const deleteFile = async (content) => {
  const fileName = content.split(DELETE_FILE)[1].trim();
  if (!fileName) {
    console.log("File name is required");
    return;
  }
  try {
    await fs.unlink(path.join(__dirname, fileName));
    console.log("File deleted");
  } catch (error) {
    if (error.code === "ENOENT") {
      console.log("File does not exist");
    } else {
      console.log("Error deleting file", error);
    }
  }
};

const renameFile = async (content) => {
  const [oldFileName, newFileName] = content
    .split(RENAME_FILE)[1]
    .trim()
    .split("to");

  if (!oldFileName || !newFileName) {
    console.log("Old and new file names are required");
    return;
  }
  try {
    await fs.rename(
      path.join(__dirname, oldFileName.trim()),
      path.join(__dirname, newFileName.trim())
    );
    console.log("File renamed");
  } catch (error) {
    if (error.code === "ENOENT") {
      console.log("File does not exist");
    } else {
      console.log("Error renaming file", error);
    }
  }
};

const addToFile = async (content) => {
  const [fileName, text] = content.split(ADD_TO_FILE)[1].trim().split(":");
  if (!fileName || !text) {
    console.log("File name and text are required");
    return;
  }
  try {
    const fileHandler = await fs.open(
      path.join(__dirname, fileName.trim()),
      "r+"
    );
    await fileHandler.writeFile(text.trim());
    await fileHandler.close();
    console.log("Text added to file");
  } catch (error) {
    if (error.code === "ENOENT") {
      console.log("File does not exist");
    } else {
      console.log("Error adding text to file", error);
    }
  }
};


module.exports = {
  CREATE_FILE,
  DELETE_FILE,
  RENAME_FILE,
  ADD_TO_FILE,
  createFile,
  deleteFile,
  renameFile,
  addToFile,
};