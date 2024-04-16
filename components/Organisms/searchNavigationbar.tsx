import React from 'react'
import Image from 'next/image'
import { Calendar } from '../Molecules/calendar'
import { SearchCategoryList } from './searchCategoryList'
import { BannerList } from './bannerList'

export const SearchNavigationbar = () => {
  return (
    <>
      <div className="md:mr-2 mt-2 pr-24 pt-12  xl:w-72 " >
        <SearchCategoryList />
        <BannerList />
        {/* <Calendar /> */}
      </div>
    </>
  )
}
