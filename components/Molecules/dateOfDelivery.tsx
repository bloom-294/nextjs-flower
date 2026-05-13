import { useEffect } from "react";

type DateOfDeliveryProps = {
  ordererDateState: { current: string[] };
};

const formatDate = (date: Date, separator: "jp" | "hyphen" = "jp") => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  if (separator === "hyphen") {
    return `${year}-${month}-${day}`;
  }

  return `${year}年${month}月${day}日`;
};

const addDays = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
};

export const DateOfDelivery = ({ ordererDateState }: DateOfDeliveryProps) => {
  const deliveryType = ordererDateState.current[0];

  let label = "";
  let deliveryText = "";
  let note = "";

  if (deliveryType === "日時指定なし") {
    const threeDaysLaterFormat = formatDate(addDays(3));
    const fiveDaysLaterFormat = formatDate(addDays(5));

    label = "日時指定なし";
    deliveryText = `${threeDaysLaterFormat}～${fiveDaysLaterFormat}`;
    note = "※即日配送・日時指定（６日以降）が可能です";
  } else if (deliveryType === "日時指定あり") {
    const [year, month, day] = ordererDateState.current[2].split("-");

    label = "日時指定あり";
    deliveryText = `${year}年${month}月${day}日`;
    note = "（天候により到着が前後することがあります）";
  } else {
    label = "即日配送";
    deliveryText = formatDate(addDays(1));
    note = "（天候により到着が前後することがあります）";
  }

  useEffect(() => {
    ordererDateState.current[4] = formatDate(new Date(), "hyphen");
    ordererDateState.current[5] = deliveryText;
  }, [ordererDateState, deliveryText]);

  return (
    <div className="grid h-24 grid-cols-7">
      <p className="col-span-2 flex items-center justify-center">
        配達日時
      </p>

      <ul className="col-span-4 items-center py-4">
        <li>{label}</li>
        <li>
          {deliveryText}{" "}
          <span className="text-sm">
            {deliveryType === "日時指定なし" ? "発送予定" : "到着予定"}
          </span>
        </li>
        <li className="text-sm">{note}</li>
      </ul>
    </div>
  );
};
