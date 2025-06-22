import fs from "fs";
import path from "path";

import { select } from "@inquirer/prompts";
import { exec } from "child_process";
import { generateComponents } from "./script";

const projects = path.join(process.cwd(), "apps");
const readDir = fs.readdirSync(projects);

const actions = ["generate-components"];

const getAction = async () => {
  const action = await select({
    message: "What do you want to do?",
    choices: actions.map((action) => ({ name: action, value: action })),
  });

  return action;
};

// const getProject = async () => {
//   const project = await select({
//     message: "What project do you want to do?",
//     choices: [
//       { name: "all", value: "all" },
//       ...readDir.map((project) => ({ name: project, value: project })),
//     ],
//   });

//   return project;
// };

getAction()
  .then(async (action) => {
    for (const project of readDir) {
      if (action === "build") {
        exec(`pnpm --filter ${project} build`);
      } else if (action === "contentlayer") {
        exec(`cd apps/${project} && pnpm contentlayer2 build`);
      } else if (action === "generate-components") {
        await generateComponents(project);
        exec(`prettier --write ./apps/${project}/__registry__/index.ts`);
      }
    }
    // const project = await getProject();

    // if (project === "all") {
    //   for (const project of readDir) {
    //     if (action === "build") {
    //       exec(`pnpm --filter ${project} build`);
    //     } else if (action === "contentlayer") {
    //       exec(`cd apps/${project} && pnpm contentlayer2 build`);
    //     } else if (action === "generate-components") {
    //       await generateComponents(project);
    //       exec(`prettier --write ./apps/${project}/__registry__/index.ts`);
    //     }
    //   }
    // } else if (action === "build") {
    //   exec(`pnpm --filter ${project} build`);
    // } else if (action === "contentlayer") {
    //   exec(`cd apps/${project} && pnpm contentlayer2 build`);
    // } else if (action === "generate-components") {
    //   await generateComponents(project);
    //   exec(`prettier --write ./apps/${project}/__registry__/index.ts`);
    // }
  })
  .catch((err) => {
    console.error(err);
  });
