import PrimaryButton from "./PrimaryButton";

export default {
  title: "Commn/PrimaryButton",
  component: PrimaryButton,
};

export const Default = () => <PrimaryButton>Hello World!</PrimaryButton>;
export const Primary = () => <PrimaryButton color="primary">Hi!</PrimaryButton>;
export const Danger = () => <PrimaryButton color="danger">Hi!</PrimaryButton>;
