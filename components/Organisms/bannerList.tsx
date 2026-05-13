import Image from "next/image";

const images = [
  "/happyChristmas.jpg",
  "/happybirthdayBanner.jpg",
  "/ChristmasBanner.png",
];

export const BannerList = () => {
  return (
    <div className="mt-12">
      <ul>
        {images.map((image) => (
          <li key={image} className="mb-2">
            <Image
              src={image}
              width={200}
              height={150}
              alt="バナー画像"
              sizes="200px"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
