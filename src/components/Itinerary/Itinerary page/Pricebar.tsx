import { useState } from "react";
import { useModal } from "../../../hooks/useModal";
import { Modal } from "../../ui/modal";
import Addlocation from "./itinerary modal/Addlocation";
import { PencilIcon, PlusIcon } from "../../../icons";
import Editlocationmodal from "./itinerary modal/Editlocationmodal";


interface Props {
  otherLocations: any[];
  itinerarydata: Record<string, any>;
}

const Pricebar: React.FC<Props> = ({ otherLocations, itinerarydata }) => {
  const [form, setform] = useState("Add")
  const [edit, setedit] = useState<any | null>(null);
  const { isOpen, openModal, closeModal } = useModal();
  const [date] = itinerarydata.itinerarycreationDate.split('T')
  console.log(otherLocations)
  return (<>
    <div id="price" className="flex-col hidden w-full ml-4 sm:flex-grow sm:flex sm:mt-2">
      <div className="sticky top-[5rem] 
      basis-1/3 overflow 2xl:top-[6.5rem]">
        <div className="flex flex-col gap-3">
          {/* Pricing Card */}
          <div className="rounded-[1.25rem] bg-white px-6 py-4">
            <div className="flex flex-col gap-2 2xl:gap-3">
              {/* Price Section */}
              <div className="flex flex-col gap-[0.625rem]">
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-medium 2xl:text-xl">Starting From</h2>
                  <div className="rounded-full bg-[#ffe9c2] px-[0.625rem] py-[0.125rem] text-sm text-[#ffa402]">
                    {itinerarydata.eventoffer}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-gray-400 line-through text-sm ">₹ 5000</p>
                  <div className="flex grow items-center justify-between">
                    <h2 className="text-xl font-medium text-orange 2xl:text-3xl">
                      {itinerarydata.quadPrice}
                    </h2>
                    <div className="hidden rounded-full bg-blue-100 px-2 py-2 text-xs lg:block">
                      {itinerarydata.itineraryStatus}
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


          <div className="flex flex-col gap-[0.625rem] rounded-[0.625rem] bg-white lg:px-6 lg:py-4">

            <h2 className="text-sm font-medium">Detail of Trip</h2>


            <hr />
            <div className="flex justify-between">
              <div className="scrollbar-styled flex  flex-col gap-[0.625rem]">

                <div className="flex grow items-center justify-center" >
                  <div className="flex w-full items-center justify-between gap-[0.625rem] px-[0.625rem] text-xs lg:text-md">
                    {/* Vehicle Type */}
                    <p className="text-xs lg:text-md">Name</p>
                    <p>-</p>

                    {/* Price */}
                    <p className="grow">{itinerarydata.nameoftrip}</p><div className="text-orange-600 text-sm p-1 cursor-pointer"></div>
                  </div>
                </div>

                <div className="flex grow items-center justify-center" >
                  <div className="flex w-full items-center justify-between gap-[0.625rem] px-[0.625rem] text-xs lg:text-md">
                    {/* Vehicle Type */}
                    <p className="text-xs lg:text-md">Title</p>
                    <p>-</p>

                    {/* Price */}
                    <p className="grow">{itinerarydata.itinerary_title}</p><div className="text-orange-600 text-sm p-1 cursor-pointer"></div>
                  </div>
                </div>
                <div className="flex grow items-center justify-center" >
                  <div className="flex w-full items-center justify-between gap-[0.625rem] px-[0.625rem] text-xs lg:text-md">
                    {/* Vehicle Type */}
                    <p className="text-xs lg:text-md">Trip Duration</p>
                    <p>-</p>

                    {/* Price */}
                    <p className="grow">{itinerarydata.tripDuration-1}N/{itinerarydata.tripDuration}D</p><div className="text-orange-600 text-sm p-1 cursor-pointer"></div>
                  </div>
                </div>

                <div className="flex grow items-center justify-center" >
                  <div className="flex w-full items-center justify-between gap-[0.625rem] px-[0.625rem] text-xs lg:text-md">
                    {/* Vehicle Type */}
                    <p className="text-xs lg:text-md">City</p>
                    <p>-</p>

                    {/* Price */}
                    <p className="grow">{itinerarydata.city}</p><div className="text-orange-600 text-sm p-1 cursor-pointer"></div>
                  </div>
                </div>
                <div className="flex grow items-center justify-center" >
                  <div className="flex w-full items-center justify-between gap-[0.625rem] px-[0.625rem] text-xs lg:text-md">
                    {/* Vehicle Type */}
                    <p className="text-xs lg:text-md">State</p>
                    <p>-</p>

                    {/* Price */}
                    <p className="grow">{itinerarydata.state}</p><div className="text-orange-600 text-sm p-1 cursor-pointer"></div>
                  </div>
                </div>

                <div className="flex grow items-center justify-center" >
                  <div className="flex w-full items-center justify-between gap-[0.625rem] px-[0.625rem] text-xs lg:text-md">
                    {/* Vehicle Type */}
                    <p className="text-xs lg:text-md">Country</p>
                    <p>-</p>

                    {/* Price */}
                    <p className="grow">{itinerarydata.country}</p><div className="text-orange-600 text-sm p-1 cursor-pointer"></div>
                  </div>
                </div>
                <div className="flex grow items-center justify-center" >
                  <div className="flex w-full items-center justify-between gap-[0.625rem] px-[0.625rem] text-xs lg:text-md">
                    {/* Vehicle Type */}
                    <p className="text-xs lg:text-md">Type</p>
                    <p>-</p>

                    {/* Price */}
                    <p className="grow">{itinerarydata.itineraryType}</p><div className="text-orange-600 text-sm p-1 cursor-pointer"></div>
                  </div>
                </div>

                <div className="flex grow items-center justify-center" >
                  <div className="flex w-full items-center justify-between gap-[0.625rem] px-[0.625rem] text-xs lg:text-md">
                    {/* Vehicle Type */}
                    <p className="text-xs lg:text-md">Created by</p>
                    <p>-</p>

                    {/* Price */}
                    <p className="grow">{itinerarydata.itinerarycreatedby}</p><div className="text-orange-600 text-sm p-1 cursor-pointer"></div>
                  </div>
                </div>
                <div className="flex grow items-center justify-center" >
                  <div className="flex w-full items-center justify-between gap-[0.625rem] px-[0.625rem] text-xs lg:text-md">
                    {/* Vehicle Type */}
                    <p className="text-xs lg:text-md">Created date</p>
                    <p>-</p>

                    {/* Price */}
                    <p className="grow">{date}</p><div className="text-orange-600 text-sm p-1 cursor-pointer"></div>
                  </div>
                </div>

                {/* Pricing Item */}
              </div>





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
                  </div>
                </div>


                {/* yaha button the */}
              </div>
            </div>
            <hr />

            <div className="scrollbar-styled flex  flex-col gap-[0.625rem]">
              {/* Pricing Item */}


              <div className="flex grow items-center justify-center">

                <div className="flex w-full items-center justify-between gap-[0.625rem] px-[0.625rem]  text-sm lg:text-md">

                  {/* Vehicle Type */}
                  <p className="text-sm font-medium lg:text-md">Quad Sharing</p>
                  <p>-</p>

                  {/* Occupancy */}
                  <p className="grow">₹ {itinerarydata.quadPrice}</p>

                  {/* Price */}

                </div>
              </div>
              <div className="flex grow items-center justify-center">

                <div className="flex w-full items-center justify-between gap-[0.625rem] px-[0.625rem] py-1 text-sm lg:text-md">

                  {/* Vehicle Type */}
                  <p className="text-sm font-medium lg:text-md">Triple Sharing</p>
                  <p>-</p>

                  {/* Occupancy */}
                  <p className="grow">₹ {itinerarydata.tripalsharingPrice}</p>

                  {/* Price */}

                </div>
              </div>
              <div className="flex grow items-center justify-center">

                <div className="flex w-full items-center justify-between gap-[0.625rem] px-[0.625rem] py-1 text-sm lg:text-md">

                  {/* Vehicle Type */}
                  <p className="text-sm font-medium lg:text-md">Double Sharing</p>
                  <p>-</p>

                  {/* Occupancy */}
                  <p className="grow">₹ {itinerarydata.doublesharingPrice}</p>

                  {/* Price */}

                </div>
              </div>

            </div>

            {/* Batch List */}

          </div>

          <div className="flex flex-col gap-[0.625rem] rounded-[0.625rem] bg-white lg:px-6 lg:py-4">
            <div className="flex justify-between ">
              <h2 className="text-sm font-medium mx-auto">Pickup Location</h2>
              <h2 className="text-sm font-medium mx-auto"> Drop Location</h2>
            </div>

            <hr />
            <div className="flex justify-between">
              <div className="scrollbar-styled flex  flex-col gap-[0.625rem] mx-auto">

                {otherLocations.map((elm, index) => {
                  return (
                    elm.otherlocation_type === "pickup" && (
                      <div className="flex grow items-center justify-center" key={index}>
                        <div className="flex w-full items-center justify-between gap-[0.625rem] px-[0.625rem] text-xs lg:text-md">
                          {/* Vehicle Type */}
                          <p className="text-xs lg:text-md">{elm.otherlocation_name}</p>
                          <p>-</p>

                          {/* Price */}
                          <p className="grow">₹ {elm.otherlocation_price}</p><div className="text-orange-600 text-sm p-1 cursor-pointer" onClick={() => { setedit(otherLocations[index]); setform("EditLocation"); openModal() }}><PencilIcon /></div>
                        </div>
                      </div>
                    )
                  )
                })}
                {/* Pricing Item */}
              </div>



              <div className="scrollbar-styled flex  flex-col gap-[0.625rem] mx-auto ">
                {/* Pricing Item */}
                {otherLocations.map((elm, index) => {
                  return (
                    elm.otherlocation_type === "drop" && (
                      <div className="flex grow items-center justify-center" key={index}>
                        <div className="flex w-full items-center justify-between gap-[0.625rem] px-[0.625rem] text-xs lg:text-md">
                          {/* Vehicle Type */}
                          <p className="text-xs lg:text-md">{elm.otherlocation_name}</p>
                          <p>-</p>

                          {/* Price */}
                          <p className="grow">₹ {elm.otherlocation_price}</p><div className="text-orange-600 text-sm p-1 cursor-pointer" onClick={() => { setedit(otherLocations[index]); setform("EditLocation"); openModal() }}><PencilIcon /></div>
                        </div>
                      </div>
                    )
                  )
                })}

              </div>

            </div>
            <button
              className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-orange-600 shadow-theme-xs hover:bg-gray-300 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-orange-600 dark:hover:bg-gray/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto" onClick={() => { openModal(); setform("Add") }}
            >
              <PlusIcon />
              Add Location</button>
          </div>
          {/* Action Buttons */}

        </div>
      </div>
    </div>
    <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
      {form == "Add" ? <Addlocation /> :
        <Editlocationmodal data={edit} />
      }

    </Modal>
  </>)
}


export default Pricebar