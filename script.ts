import fs from "fs";
import path from "path";

export const generateComponents = async (project: string) => {
  const PROJECT_PATH = `apps/${project}`;
  const REGISTRY_PATH = path.join(
    process.cwd(),
    PROJECT_PATH,
    "components/examples"
  );

  function getFilesRecursive(directory: string): string[] {
    if (!fs.existsSync(directory)) {
      return [];
    }
    const files = [];
    const items = fs.readdirSync(directory);

    // Remove the check for index.tsx
    for (const item of items) {
      const fullPath = path.join(directory, item);
      if (fs.statSync(fullPath).isDirectory()) {
        files.push(...getFilesRecursive(fullPath));
      } else if (item.endsWith(".tsx")) {
        files.push(fullPath);
      }
    }

    return files;
  }

  const files = getFilesRecursive(REGISTRY_PATH);

  let index = `import dynamic from "next/dynamic";
import type { GenericComponent } from "@workspace/ui/types";
 
export const variants: Record<string, GenericComponent> = {`;

  // Previews
  for (const file of files) {
    const relativePath = path.relative(REGISTRY_PATH, file);

    let componentName = relativePath.replace(/\.tsx$/, "");

    const fileContent = fs
      .readFileSync(file, "utf8")
      .replace(/`/g, "\\`")
      .replace(/\$\{/g, "\\${");

    index += `"${componentName}": {
      name: "${componentName}",
      component: dynamic(
        () =>
          import("@/components/examples/${relativePath.replace(".tsx", "")}"),
        {
          ssr: false,
        }
      ),
      code: \`${fileContent.replace("//PRO\n\n", "")}\`,
    },
  `;
  }

  index += `
};

`;
  fs.mkdirSync(path.join(process.cwd(), `${PROJECT_PATH}/__registry__`), {
    recursive: true,
  });
  fs.writeFileSync(
    path.join(process.cwd(), `${PROJECT_PATH}/__registry__/index.ts`),
    index
  );
};

generateComponents("video");
