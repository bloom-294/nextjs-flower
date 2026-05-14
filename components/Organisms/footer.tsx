import Image from "next/image";
import Link from "next/link";

const snsList = [
  {
    href: "https://twitter.com/",
    src: "/logo/Twitter.png",
    alt: "twitter",
  },
  {
    href: "https://www.instagram.com/",
    src: "/logo/Instagram.png",
    alt: "instagram",
  },
  {
    href: "https://ja-jp.facebook.com/",
    src: "/logo/facebook.png",
    alt: "facebook",
  },
];

const footerMenuList = [
  "会社概要",
  "採用情報",
  "利用規約",
  "プライバシーポリシー",
  "特定商取引法に基づく表示",
];

export const Footer = () => {
  return (
    <>
      <div className="mx-auto flex flex-wrap items-center justify-center bg-gray-50 px-5 py-5">
        <ul className="flex flex-wrap items-center justify-center">
          {snsList.map((sns) => (
            <li key={sns.alt} className="mx-5">
              <Link href={sns.href}>
                <Image
                  src={sns.src}
                  alt={sns.alt}
                  width={50}
                  height={50}
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="mx-auto hidden flex-wrap items-center justify-center bg-gray-50 px-5 py-5 sm:flex">
        <ul className="flex flex-wrap items-center justify-center text-gray-400">
          {footerMenuList.map((menu) => (
            <li key={menu} className="mx-5">
              {menu}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Footer;
