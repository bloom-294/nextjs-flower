const fs = require("fs");
const path = require("path");

const ROOT_DIR = process.cwd();
const COMPONENT_ROOT = path.join(ROOT_DIR, "components");

const toComponentName = (fileName) => {
  const name = path.basename(fileName, ".tsx");
  return name.charAt(0).toUpperCase() + name.slice(1);
};

const isTargetComponentFile = (fileName) => {
  return fileName.endsWith(".tsx") && !fileName.endsWith(".stories.tsx");
};

const getStoryPath = (componentPath) => {
  const dir = path.dirname(componentPath);
  const fileName = path.basename(componentPath, ".tsx");

  return path.join(dir, `${fileName}.stories.tsx`);
};

const getStoryTitle = (componentPath) => {
  const relativePath = path.relative(COMPONENT_ROOT, componentPath);

  const dir = path.dirname(relativePath);

  const dirList = dir.split(path.sep).map((name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  });

  const componentName = toComponentName(componentPath);

  return ["Components", ...dirList, componentName].join("/");
};

const createTemplate = (componentPath) => {
  const file = path.basename(componentPath, ".tsx");
  const componentName = toComponentName(componentPath);
  const title = getStoryTitle(componentPath);

  return `
import type { Meta, StoryObj } from "@storybook/react";

import { ${componentName} } from "./${file}";

const meta: Meta<typeof ${componentName}> = {
  title: "${title}",
  component: ${componentName},
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ${componentName}>;

export const Default: Story = {};
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

const createStoryFile = (componentPath) => {
  const storyPath = getStoryPath(componentPath);

  if (fs.existsSync(storyPath)) {
    return {
      status: "skipped",
      componentPath,
      storyPath,
    };
  }

  const template = createTemplate(componentPath);
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
};
