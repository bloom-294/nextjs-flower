import { RequiredBadge } from "components/Atoms/requiredBadge";
import React from "react";

type PaymethodInputProps = {
  ordererPayMethod: string;
  SetOrdererPayMethod: React.Dispatch<React.SetStateAction<string>>;
};

export const PaymethodInput = ({
  ordererPayMethod,
  SetOrdererPayMethod,
}: PaymethodInputProps) => {
  return (
    <div className="my-5 ml-5">
      <div className="mb-2">
        <label>お支払い方法</label>
        <RequiredBadge />
      </div>

      <div>
        <label className="radio-inline">
          <input
            className="mx-3"
            type="radio"
            name="orderer-pay-method"
            value="現金払い"
            checked={ordererPayMethod === "現金払い"}
            onChange={() => {
              SetOrdererPayMethod("現金払い");
            }}
          />
          現金払い
        </label>

        <label className="radio-inline">
          <input
            className="mx-3"
            type="radio"
            name="orderer-pay-method"
            value="クレジット"
            checked={ordererPayMethod === "クレジット"}
            onChange={() => {
              SetOrdererPayMethod("クレジット");
            }}
          />
          クレジット
        </label>
      </div>
    </div>
  );
};
