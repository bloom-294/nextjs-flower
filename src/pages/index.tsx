import { Loader } from "components/Atoms/loader";
import { Information } from "components/Molecules/Information";
import { Map } from "components/Molecules/map";
import { Slide } from "components/Molecules/swiper";
import { SlideCursor } from "components/Molecules/swiperCursor";
import { ItemsSection } from "components/Organisms/ItemsSection";
import { NewItemsList } from "components/Organisms/newItemList";
import { SearchNavigationbar } from "components/Organisms/searchNavigationbar";
import { TopRecognizeList } from "components/Organisms/topRecognizeList";

type Item = {
  category: string;
  id: number;
  imagePath: string;
  info: string;
  name: string;
  popular: number;
  price: string;
  recommend: number;
};

type HomeProps = {
  data: Item[];
};

const Home = ({ data }: HomeProps) => {

  if (!data) {
    return <Loader />;
  }

  return (
    <div className="container flex flex-wrap justify-center items-center mx-auto">
      <div className="-translate-y-10">
        <Slide />
        <h3 className="sm:text-2xl mx-8 mt-10">特集</h3>
        <div className="bg-gray-5 sm:mt-4 mt-2">
          <SlideCursor />
        </div>
      </div>

      <section className="mb-5 flex flex-wrap justify-center items-center mx-auto">
        <div className="flex h-full">
          <div className="hidden xl:flex xl:flex-nowrap xl:justify-start mx-auto">
            <SearchNavigationbar />
          </div>

          <div className="h-full">
            <ItemsSection title="新入荷" titleClassName="mt-8">
              <NewItemsList />
            </ItemsSection>
            <ItemsSection title="おすすめ" titleClassName="mt-12">
              <TopRecognizeList />
            </ItemsSection>
            <Information />
            <Map />
          </div>
        </div>
      </section>
    </div>
  );
};

export const getStaticProps = async () => {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!API_BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
  }

  const normalizedBaseUrl = API_BASE_URL.endsWith("/")
    ? API_BASE_URL
    : `${API_BASE_URL}/`;
  const res = await fetch(new URL("items", normalizedBaseUrl).toString());
  const json: Item[] = await res.json();

  return {
    props: { data: json },
    revalidate: 1,
  };
};

export default Home;
