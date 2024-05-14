import React from "react";
import Image from "next/image";

export const BannerList = () => {
  const images = [
    "/happyChristmas.jpg",
    "/happybirthdayBanner.jpg",
    "/ChristmasBanner.png",
  ];
  return (
    <>
      <div className=" mt-12">
        <ul>
          {images.map((image: string, index: number) => {
            return (
              <li className="mb-2" key={index}>
                <Image src={image} width={200} height={150} alt="topImage" />
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
