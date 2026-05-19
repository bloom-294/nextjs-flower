const path = require("path");
const prompts = require("prompts");

const {
  COMPONENT_ROOT,
  findComponentFiles,
  createStoryFile,
} = require("./utils.cjs");

const main = async () => {
  const files = findComponentFiles(COMPONENT_ROOT);

  if (files.length === 0) {
    console.log("生成対象の .tsx ファイルが見つかりませんでした。");
    return;
  }

  const choices = files.map((file) => ({
    title: path.relative(process.cwd(), file),
    value: file,
  }));

  const response = await prompts({
    type: "select",
    name: "file",
    message: "story を生成するファイルを選択してください",
    choices,
    initial: 0,
  });

  if (!response.file) {
    console.log("キャンセルしました。");
    return;
  }

  const result = createStoryFile(response.file);
  const relativePath = path.relative(process.cwd(), result.storyPath);

  if (result.status === "created") {
    console.log(`created: ${relativePath}`);
    return;
  }

  if (result.status === "skipped") {
    console.log(`skipped: ${relativePath}`);
    console.log("既に story ファイルが存在します。");
  }
};

main();
