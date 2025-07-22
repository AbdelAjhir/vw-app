import fs from "fs";
import chalk from "chalk";

if (!fs.existsSync(".env")) {
  console.error(chalk.red("ERROR: Missing .env file in the project root"));
  console.error("Please create a .env file before running the app");
  console.error("You can do it with: cp .env.example .env\n");
  process.exit(1);
}
