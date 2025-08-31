import fs from "fs";
import path from "path";

const PROJECT_PATH = `apps/docs`;
const REGISTRY_PATH = path.join(process.cwd(), PROJECT_PATH, "previews");

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

// Group files by their first-level folder
const filesByFolder: Record<string, string[]> = {};

for (const file of files) {
  const relativePath = path.relative(REGISTRY_PATH, file);
  const folderName = relativePath.split(path.sep)[0]; // Get first-level folder name

  if (folderName) {
    if (!filesByFolder[folderName]) {
      filesByFolder[folderName] = [];
    }
    filesByFolder[folderName].push(file);
  }
}

let index = `import dynamic from "next/dynamic";
import type { GenericComponent } from "@workspace/ui/types";
 
`;

// Create separate object variables for each first-level folder
for (const [folderName, folderFiles] of Object.entries(filesByFolder)) {
  index += `export const ${folderName}Variants: Record<string, GenericComponent> = {`;

  // Previews for this folder
  for (const file of folderFiles) {
    const relativePath = path.relative(REGISTRY_PATH, file);

    let componentName = path.basename(file, ".tsx");

    const fileContent = fs
      .readFileSync(file, "utf8")
      .replace(/`/g, "\\`")
      .replace(/\$\{/g, "\\${");

    index += `"${componentName}": {
      name: "${componentName}",
      component: dynamic(
        () =>
          import("../previews/${relativePath.replace(".tsx", "")}"),
        {
          ssr: false,
        }
      ),
      code: \`${fileContent.replace("//PRO\n\n", "")}\`,
    },
  `;
  }

  index += `};

`;
}

fs.mkdirSync(path.join(process.cwd(), `${PROJECT_PATH}/__registry__`), {
  recursive: true,
});
fs.writeFileSync(
  path.join(process.cwd(), `${PROJECT_PATH}/__registry__/index.ts`),
  index
);
