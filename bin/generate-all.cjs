const path = require("path");
const {
  COMPONENT_ROOT,
  findComponentFiles,
  createStoryFile,
} = require("./utils.cjs");

const main = () => {
  const files = findComponentFiles(COMPONENT_ROOT);

  if (files.length === 0) {
    console.log("生成対象の .tsx ファイルが見つかりませんでした。");
    return;
  }

  let createdCount = 0;
  let skippedCount = 0;

  for (const file of files) {
    const result = createStoryFile(file);
    const relativePath = path.relative(process.cwd(), result.storyPath);

    if (result.status === "created") {
      createdCount++;
      console.log(`created: ${relativePath}`);
    }

    if (result.status === "skipped") {
      skippedCount++;
      console.log(`skipped: ${relativePath}`);
    }
  }

  console.log("");
  console.log("完了しました。");
  console.log(`created: ${createdCount}`);
  console.log(`skipped: ${skippedCount}`);
};

main();
