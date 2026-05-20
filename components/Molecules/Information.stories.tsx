import type { Meta } from "@storybook/react";
import { Information } from "./Information";

const meta = {
  title: "Components/Molecules/Information",
  component: Information,
  tags: ["autodocs"],
  
} as Meta<typeof Information>;

export default meta;

export const Default = {
  args: {
    informationList: [
      {
        date: "2022.XX.XX",
        text: "新入荷しました！",
      },
      {
        date: "2022.XX.XX",
        text: "「ドライフラワー」の販売を開始します。",
      },
    ],
  },
};

export const Empty = {
  args: {
    informationList: [],
  },
};
