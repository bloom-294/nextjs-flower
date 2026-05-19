#!/usr/bin/env node
"use strict";

const fs = require("fs");
const prompts = require("prompts");

let baseDir= "";
let categoryDir = "";
let dirEntries = "";
let dirPaths = [];
let storyTargetPath = "";
let componentName = "";


const template = (dir, file) => {
  return `
    import type { Meta, StoryObj } from "@storybook/react";
    import { ${file} } from "./${file}";

    const meta = {
      title: "${dir}/${file}",
      componentName: ${file},
    } satisfies Meta<typeof ${file}>;

    export default meta;

    type Story = StoryObj<typeof meta>;

    export const Default: Story = {};
  `;
};

const createStory = (broadFlag) => {
	if (broadFlag == true) {
		storyTargetPath = `./src/${baseDir}/`;
	} else {
		storyTargetPath = `./${baseDir}/${categoryDir}/`;
	}

	dirEntries = fs.readdirSync(storyTargetPath);

	if (dirEntries.includes(`${componentName}.stories.tsx`)) {
		console.error("もう既に存在しています");
    console.log(4,storyTargetPath);
		return process.exit(1);
	} else {
		storyTargetPath = `${storyTargetPath}${componentName}.stories.tsx`;
    console.log(3,storyTargetPath);

		let templateFn = broadFlag == true ? template(baseDir, componentName) : template(categoryDir, componentName);

		fs.writeFile(storyTargetPath, templateFn, function (err) {
			if (err) {
				console.error("❌");
				throw err;
			}
		});

		console.log(`
        🎉✨success✨🎉
        🍪 ${storyTargetPath}
        `);
	}
};

const DirListAdd = async () => {
	dirEntries.forEach((e) => {
		dirPaths.push({ title: e, value: e });
	});
};

const formatComponentName = (fileName) => {
  const componentName = fileName.replace(".tsx", "");

  return (
    componentName.charAt(0).toUpperCase() +
    componentName.slice(1)
  );
};

(async () => {
	try {
		const confirm = await prompts({
			type: "confirm",
			name: "value",
			message: "ディレクトリは作成しましたか？",
			initial: true,
		});

		if (confirm.value == true) {
			console.log(confirm.value);
		} else {
			console.error("作成してください");
			return process.exit(1);
		}

		const select_dir = await prompts({
			type: "select",
			name: "value",
			message: "選択してください",
			choices: [
				{ title: "src/Pages", value: "pages" },
				{ title: "components", value: "components" },
			],
			initial: 0,
		});

		baseDir= `${select_dir.value}`;
    
    if (baseDir == "pages") {
      dirEntries = fs.readdirSync(`./src/${baseDir}`);      
    } else {
      dirEntries = fs.readdirSync(`./${baseDir}`);      
    }

		DirListAdd();

		const selectChild = await prompts({
			type: "select",
			name: "value",
			message: "",
			choices: dirPaths,
			initial: 0,
		});

		//   Pages
		if (baseDir == "pages") {
			componentName = formatComponentName(selectChild.value);
      console.log("kp", componentName);
			createStory(true);

			//   components
		} else {
			categoryDir = selectChild.value;
			storyTargetPath = `./${baseDir}/${categoryDir}/`;
			dirEntries = fs.readdirSync(storyTargetPath);

			dirPaths = [];
			DirListAdd();

			const selectGchild = await prompts({
				type: "select",
				name: "value",
				message: "選択してください",
				choices: dirPaths,
				initial: 0,
			});
      console.log(1,selectGchild.value);

			componentName = formatComponentName(selectChild.value);
      console.log("kc", componentName);
			createStory(false);
		}
	} catch {
		console.log("exit");
	}
})();
