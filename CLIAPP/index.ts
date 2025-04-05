const fs = require("node:fs/promises");
const path = require("node:path");

const argv = process.argv.slice(2);
const [cmd, ...others] = argv;
const commands = ["add", "sub", "mul", "div", "help"];

const getHelpText = async () => {
  try {
    const text = await fs.readFile(path.join(__dirname,'..', "help.txt"), "utf8");
    console.log(text);
    process.exit(0);
  } catch (error) {
    console.error("Error reading help file:", error);
    process.exit(1);
  }
};

const calculate = (operation: string, numbers: number[]) => {
  switch (operation) {
    case "add":
      return numbers.reduce((acc, val) => acc + val, 0);
    case "sub":
      return numbers.reduce((acc, val) => acc - val);
    case "mul":
      return numbers.reduce((acc, val) => acc * val, 1);
    case "div":
      return numbers.reduce((acc, val) => acc / val);
    default:
      console.log("Invalid operation");
      process.exit(1);
  }
};

module.exports.commandLineApp = function() {
  if (!cmd || cmd === "help" || !commands.includes(cmd)) {
    getHelpText();
  } else {
    if (others.length === 0) {
      console.log(
        'Please provide a command. Use "help" to see available commands.'
      );
      process.exit(1);
    }

    if (others.every((val) => isNaN(+val))) {
      console.log("Please provide valid numbers.");
      process.exit(1);
    }

    const numbers = others.filter((val) => !isNaN(+val)).map((val) => +val);

    console.log(calculate(cmd, numbers));
  }
};
