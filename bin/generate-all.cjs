const fs = require("fs");
const path = require("path");

const {
  COMPONENT_ROOT,
  findComponentFiles,
  createStoryFile,
  getNamedExports,
  getStoryPath,
} = require("./utils.cjs");

const main = () => {
  const files = findComponentFiles(COMPONENT_ROOT);

  let createdCount = 0;
  let alreadyExistsCount = 0;
  let skippedCount = 0;

  for (const file of files) {
    const storyPath = getStoryPath(file);
    const relativeStoryPath = path.relative(process.cwd(), storyPath);

    // story 存在チェック
    if (fs.existsSync(storyPath)) {
      alreadyExistsCount++;
      console.log(`already exists: ${relativeStoryPath}`);
      continue;
    }

    const exportNames = getNamedExports(file);

    if (exportNames.length === 0) {
      skippedCount++;
      console.log(`skip(no export): ${path.relative(process.cwd(), file)}`);
      continue;
    }

    if (exportNames.length > 1) {
      skippedCount++;
      console.log(`skip(multiple exports): ${path.relative(process.cwd(), file)}`);
      console.log(exportNames);
      continue;
    }

    const componentName = exportNames[0];
    const result = createStoryFile(file, componentName);

    if (result.status === "created") {
      createdCount++;
      console.log(`created: ${relativeStoryPath}`);
    }
  }

  console.log("");
  console.log("完了しました。");
  console.log(`created: ${createdCount}`);
  console.log(`already exists: ${alreadyExistsCount}`);
  console.log(`skipped: ${skippedCount}`);
};

main();
