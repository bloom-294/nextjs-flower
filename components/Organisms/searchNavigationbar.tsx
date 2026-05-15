import React from "react";
import { SearchCategoryList } from "./searchCategoryList";
import { BannerList } from "./bannerList";

export const SearchNavigationbar = () => {
  return (
    <div className="mt-2 pr-24 pt-12 md:mr-2 xl:w-72">
      <SearchCategoryList />
      <BannerList />
      {/* <Calendar /> */}
    </div>
  );
};
