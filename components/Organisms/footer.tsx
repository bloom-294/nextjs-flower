import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import style from "../../src/styles/footer.module.css";

export const Footer = () => {
  const Twitter = "/logo/Twitter.png";
  const Instagram = "/logo/Instagram.png";
  const Facebook = "/logo/facebook.png";

  return (
    <>
      <div className=" flex flex-wrap justify-center items-center mx-auto py-5 px-5  bg-gray-50">
        <ul>
          <li className="float-left mx-5 ">
            <Link href="https://twitter.com/">
              <a>
                <Image src={Twitter} alt="twitter" width={50} height={50} />
              </a>
            </Link>
          </li>
          <li className="float-left mx-5">
            <Link href="https://www.instagram.com/">
              <a>
                <Image src={Instagram} alt="instagram" width={50} height={50} />
              </a>
            </Link>
          </li>
          <li className="float-left mx-5">
            <Link href="https://ja-jp.facebook.com/">
              <a>
                <Image src={Facebook} alt="facebook" width={50} height={50} />
              </a>
            </Link>
          </li>
        </ul>
      </div>
      <div className=" sm:block sm:flex flex-wrap justify-center items-center mx-auto py-5 px-5  bg-gray-50 hidden">
        <ul className="text-gray-400">
          <li className="float-left mx-5">会社概要</li>
          <li className="float-left mx-5">採用情報</li>
          <li className="float-left mx-5">利用規約</li>
          <li className="float-left mx-5">プライバシーポリシー</li>
          <li className="float-left mx-5">特定商取引法に基づく表示</li>
        </ul>
      </div>
      {/* </nav> */}
    </>
  );
};

export default Footer;
