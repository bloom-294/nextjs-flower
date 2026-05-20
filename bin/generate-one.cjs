const path = require("path");
const prompts = require("prompts");

const {
  COMPONENT_ROOT,
  findComponentFiles,
  createStoryFile,
  getNamedExports,
} = require("./utils.cjs");

const main = async () => {
  const files = findComponentFiles(COMPONENT_ROOT);

  if (files.length === 0) {
    console.log("生成対象の .tsx ファイルが見つかりませんでした。");
    return;
  }

  const fileResponse = await prompts({
    type: "select",
    name: "file",
    message: "story を生成するファイルを選択してください",
    choices: files.map((file) => ({
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

  if (result.status === "skipped") {
    console.log(`skipped: ${relativePath}`);
    console.log("既に story ファイルが存在します。");
    return;
  }

  console.log(`生成できませんでした: ${result.status}`);
};

main();
