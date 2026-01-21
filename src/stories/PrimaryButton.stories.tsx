import PrimaryButton from "./PrimaryButton";

/* eslint-disable import/no-anonymous-default-export */
export default {
  title: "Commn/PrimaryButton",
  component: PrimaryButton,
};

export const Default = () => <PrimaryButton>Hello World!</PrimaryButton>;
export const Primary = () => <PrimaryButton color="primary">Hi!</PrimaryButton>;
export const Danger = () => <PrimaryButton color="danger">Hi!</PrimaryButton>;
