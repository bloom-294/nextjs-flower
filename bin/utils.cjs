const fs = require("fs");
const path = require("path");

const ROOT_DIR = process.cwd();
const COMPONENT_ROOT = path.join(ROOT_DIR, "components");

const isTargetComponentFile = (fileName) => {
  return fileName.endsWith(".tsx") && !fileName.endsWith(".stories.tsx");
};

const getStoryPath = (componentPath) => {
  const dir = path.dirname(componentPath);
  const fileName = path.basename(componentPath, ".tsx");

  return path.join(dir, `${fileName}.stories.tsx`);
};

const getNamedExports = (componentPath) => {
  const code = fs.readFileSync(componentPath, "utf8");

  const exportNames = [];

  const exportConstRegex =
    /export\s+const\s+([A-Z][A-Za-z0-9_]*)/g;

  const exportFunctionRegex =
    /export\s+function\s+([A-Z][A-Za-z0-9_]*)/g;

  let match;

  while ((match = exportConstRegex.exec(code)) !== null) {
    exportNames.push(match[1]);
  }

  while ((match = exportFunctionRegex.exec(code)) !== null) {
    exportNames.push(match[1]);
  }

  return exportNames.filter((name, index) => {
    return exportNames.indexOf(name) === index;
  });
};

const getStoryTitle = (componentPath, componentName) => {
  const relativePath = path.relative(COMPONENT_ROOT, componentPath);
  const dir = path.dirname(relativePath);

  const dirList =
    dir === "."
      ? []
      : dir.split(path.sep).map((name) => {
          return name.charAt(0).toUpperCase() + name.slice(1);
        });

  return ["Components", ...dirList, componentName].join("/");
};

const createTemplate = (componentPath, componentName) => {
  const file = path.basename(componentPath, ".tsx");
  const title = getStoryTitle(componentPath, componentName);

  return `
import type { Meta } from "@storybook/react";

import { ${componentName} } from "./${file}";

const meta = {
  title: "${title}",
  component: ${componentName},
  tags: ["autodocs"],
} as Meta<typeof ${componentName}>;

export default meta;

export const Default = {};
`;
};

const findComponentFiles = (dir) => {
  const results = [];

  if (!fs.existsSync(dir)) return results;

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      results.push(...findComponentFiles(fullPath));
      continue;
    }

    if (entry.isFile() && isTargetComponentFile(entry.name)) {
      results.push(fullPath);
    }
  }

  return results;
};

const createStoryFile = (componentPath, componentName) => {
  const storyPath = getStoryPath(componentPath);

  if (fs.existsSync(storyPath)) {
    return {
      status: "skipped",
      componentPath,
      storyPath,
    };
  }

  if (!componentName) {
    return {
      status: "no-component-name",
      componentPath,
      storyPath,
    };
  }

  const template = createTemplate(componentPath, componentName);
  fs.writeFileSync(storyPath, template, "utf8");

  return {
    status: "created",
    componentPath,
    storyPath,
  };
};

module.exports = {
  ROOT_DIR,
  COMPONENT_ROOT,
  findComponentFiles,
  createStoryFile,
  isTargetComponentFile,
  getNamedExports,
  getStoryPath,
};
