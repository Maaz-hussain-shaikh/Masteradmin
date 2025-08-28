import { useState } from "react"

export default function Pricebar() {


  return (<>
    <div id="price" className="flex-col hidden w-full ml-4 sm:flex-grow sm:flex sm:mt-2">
      <div className="sticky top-[5rem] 
      basis-1/3 overflow-auto 2xl:top-[6.5rem]">
        <div className="flex flex-col gap-3">
          {/* Pricing Card */}
          <div className="rounded-[1.25rem] bg-white px-6 py-4">
            <div className="flex flex-col gap-2 2xl:gap-3">
              {/* Price Section */}
              <div className="flex flex-col gap-[0.625rem]">
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-medium 2xl:text-xl">Starting From</h2>
                  <div className="rounded-full bg-[#ffe9c2] px-[0.625rem] py-[0.125rem] text-sm text-[#ffa402]">
                    ₹ 1,500 OFF
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-gray-400 line-through text-sm ">₹ 5000</p>
                  <div className="flex grow items-center justify-between">
                    <h2 className="text-xl font-medium text-orange 2xl:text-3xl">
                      ₹ 5000
                    </h2>
                    <div className="hidden rounded-full bg-blue-100 px-2 py-2 text-xs lg:block">
                      Per Person
                    </div>
                  </div>
                </div>
              </div>

              {/* Book Now Button */}
              <a
                href="/booking/package?slug=kedarkantha-trek"
                className="hidden text-white rounded-full bg-orange-600 text-center px-4 py-[0.375rem] text-lg lg:block"
              >
                Book Now
              </a>
            </div>
          </div>

          {/* Pricing Details */}
          <div className="flex flex-col gap-[0.625rem] rounded-[0.625rem] bg-white lg:px-6 lg:py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium lg:text-xl">Pricing</h2>
              <div className="flex items-center gap-3 2xl:gap-4">
                <div className="flex items-center ">

                  <div className="group relative">
                    <p>Occupancy</p>

                    <div className="absolute left-16 top-full hidden w-[78vw] max-w-[400px] -translate-x-1/2 rounded-[0.625rem] bg-white p-4 text-center text-xs shadow-lg group-hover:block z-10">
                      <p className="py-1 text-gray-400">
                        <span className="font-medium text-gray-800">Double -</span>{" "}
                        Room will be shared between 2 people.
                      </p>
                      <p className="py-1 text-gray-400">
                        <span className="font-medium text-gray-800">Triple -</span>{" "}
                        Room will be shared between 3 people.
                      </p>
                      <p className="py-1 text-gray-400">
                        <span className="font-medium text-gray-800">Quad -</span>{" "}
                        Room will be shared between 4 people.
                      </p>
                    </div>
                  </div>
                </div>
                

                {/* yaha button the */}
              </div>
            </div>
            <hr />

            <div className="scrollbar-styled flex  flex-col gap-[0.625rem] ">
              {/* Pricing Item */}
              <div className="flex grow items-center justify-center">

                <div className="flex w-full items-center justify-between gap-[0.625rem] px-[0.625rem] py-1 text-sm lg:text-md">

                  {/* Vehicle Type */}
                  <p className="text-sm font-medium lg:text-md">Quad Sharing</p>
                  <p>-</p>

                  {/* Occupancy */}
                  <p className="grow">5000</p>

                  {/* Price */}

                </div>
              </div>
              <div className="flex grow items-center justify-center">

                <div className="flex w-full items-center justify-between gap-[0.625rem] px-[0.625rem] py-1 text-sm lg:text-md">

                  {/* Vehicle Type */}
                  <p className="text-sm font-medium lg:text-md">Triple Sharing</p>
                  <p>-</p>

                  {/* Occupancy */}
                  <p className="grow">5500</p>

                  {/* Price */}

                </div>
              </div>
              <div className="flex grow items-center justify-center">

                <div className="flex w-full items-center justify-between gap-[0.625rem] px-[0.625rem] py-1 text-sm lg:text-md">

                  {/* Vehicle Type */}
                  <p className="text-sm font-medium lg:text-md">Double Sharing</p>
                  <p>-</p>

                  {/* Occupancy */}
                  <p className="grow">6000</p>

                  {/* Price */}

                </div>
              </div>

            </div>

            {/* Batch List */}

          </div>

          <div className="flex flex-col gap-[0.625rem] rounded-[0.625rem] bg-white lg:px-6 lg:py-4">
            <h2 className="text-lg font-medium lg:text-xl">Batches</h2>

            <hr />

          </div>

          {/* Action Buttons */}

        </div>
      </div></div>
  </>)
}