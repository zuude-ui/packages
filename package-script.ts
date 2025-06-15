import fs from "fs";
import path from "path";

import { select } from "@inquirer/prompts";
import { exec } from "child_process";

const projects = path.join(process.cwd(), "apps");
const readDir = fs.readdirSync(projects);

const actions = ["build", "contentlayer"];

const getAction = async () => {
  const action = await select({
    message: "What do you want to do?",
    choices: actions.map((action) => ({ name: action, value: action })),
  });

  return action;
};

const getProject = async () => {
  const project = await select({
    message: "What project do you want to do?",
    choices: readDir.map((project) => ({ name: project, value: project })),
  });

  return project;
};

getAction()
  .then(async (action) => {
    const project = await getProject();

    // run the action
    if (action === "build") {
      await exec(`pnpm --filter ${project} build`);
    } else if (action === "contentlayer") {
      await exec(`cd apps/${project} && pnpm contentlayer2 build`);
    }
  })
  .catch((err) => {
    console.error(err);
  });
