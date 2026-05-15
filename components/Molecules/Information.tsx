const informationList = [
  {
    date: "2022.XX.XX",
    text: "新入荷しました！",
  },
  {
    date: "2022.XX.XX",
    text: "「ドライフラワー」の販売を開始します。",
  },
  {
    date: "2022.XX.XX",
    text: "【セール開催のお知らせ】Christmasセール",
  },
  {
    date: "2022.XX.XX",
    text: "雑誌「ＸＸＸＸＸＸ Vol.10』に掲載していただきました。",
  },
  {
    date: "2022.XX.XX",
    text: "【個展開催のお知らせ】",
  },
];

export const Information = () => {
  return (
    <section className="wrapper">
      <h2 className="mt-12 flex flex-wrap items-center justify-center sm:text-2xl">
        お知らせ
      </h2>

      <ul className="rounded-xl px-12 py-4 sm:py-8">
        {informationList.map((item, index) => (
          <li key={index}>
            <hr />

            <p>{item.date}</p>
            <p>{item.text}</p>
          </li>
        ))}

        <hr />
      </ul>
    </section>
  );
};
