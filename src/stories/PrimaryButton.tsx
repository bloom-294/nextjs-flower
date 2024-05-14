import React from "react";
import "./PrimaryButton.css";

export const PrimaryButton = ({ children, color = "default" }: any) => {
  return <button className={color}>{children}</button>;
};

export default PrimaryButton;
