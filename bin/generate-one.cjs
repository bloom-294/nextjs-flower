const fs = require("fs");
const path = require("path");
const prompts = require("prompts");

const {
  COMPONENT_ROOT,
  findComponentFiles,
  createStoryFile,
  getNamedExports,
  getStoryPath,
} = require("./utils.cjs");

const main = async () => {
  const files = findComponentFiles(COMPONENT_ROOT);

  const filesWithoutStory = files.filter((file) => {
    const storyPath = getStoryPath(file);
    return !fs.existsSync(storyPath);
  });

  if (filesWithoutStory.length === 0) {
    console.log("story 未作成の .tsx ファイルはありません。");
    return;
  }

  const fileResponse = await prompts({
    type: "select",
    name: "file",
    message: "story を生成するファイルを選択してください",
    choices: filesWithoutStory.map((file) => ({
      title: path.relative(process.cwd(), file),
      value: file,
    })),
    initial: 0,
  });

  if (!fileResponse.file) {
    console.log("キャンセルしました。");
    return;
  }

  const exportNames = getNamedExports(fileResponse.file);

  if (exportNames.length === 0) {
    console.log("export されているコンポーネントが見つかりませんでした。");
    return;
  }

  let componentName = exportNames[0];

  if (exportNames.length > 1) {
    const exportResponse = await prompts({
      type: "select",
      name: "componentName",
      message: "story に使う export を選択してください",
      choices: exportNames.map((name) => ({
        title: name,
        value: name,
      })),
      initial: 0,
    });

    if (!exportResponse.componentName) {
      console.log("キャンセルしました。");
      return;
    }

    componentName = exportResponse.componentName;
  }

  const result = createStoryFile(fileResponse.file, componentName);
  const relativePath = path.relative(process.cwd(), result.storyPath);

  if (result.status === "created") {
    console.log(`created: ${relativePath}`);
    return;
  }

  console.log(`生成できませんでした: ${result.status}`);
};

main();
