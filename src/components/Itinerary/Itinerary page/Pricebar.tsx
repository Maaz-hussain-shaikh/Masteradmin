import { useEffect, useState } from "react";
import { useModal } from "../../../hooks/useModal";
import { Modal } from "../../ui/modal";
import Addlocation from "./itinerary modal/Addlocation";
import { CalenderIcon, PencilIcon, PlusIcon, TrashBinIcon } from "../../../icons";
import Editlocationmodal from "./itinerary modal/Editlocationmodal";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import "./daypiker.css"
import axios from "axios";
import { API_URLS } from "../../../config/config";
import { useParams } from "react-router";
import Itinerarycardinfo from "./Itinerarycardinfo";
import AddCard from "./itinerary modal/AddCard";
import EditBatchmodal from "./itinerary modal/EditBatchmodal";



interface Props {
  otherLocations: any[];
  itinerarydata: Record<string, any>;
  cards: Record<string, any>;
}
type Batchtype = {
  trip_date: string;
  trip_batches_id: number;// ya Date agar date object hai
  // aur bhi properties ho to unhe add karo
};


const Pricebar: React.FC<Props> = ({ otherLocations, itinerarydata, cards }) => {
  const { slug } = useParams()
  const [itdata,setitdata]=useState<any | null>(null);
  const token = localStorage.getItem("token")
  const username = localStorage.getItem("username")
  const [form, setform] = useState("Add")
  const [edit, setedit] = useState<any | null>(null);
  const { isOpen, openModal, closeModal } = useModal();
  const [date] = itinerarydata.itinerarycreationDate.split('T')
  const [selected, setSelected] = useState<Date[]>([]);
  const [isBatch, setBatch] = useState(false)
  const [Batch, setBatchdata] = useState<Batchtype[]>([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editbatchid,seteditbatchid]=useState(0)

  useEffect(() => {
    const fetchbatch = async () => {

      try {
        const responce = await axios.get(API_URLS.itinerary.fetchBatchs(slug), {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        })
        if (responce.status == 200) {
          setBatchdata(responce.data.data)
          setLoading(false)
        }
      } catch (error: any) {
        setError(error.message || "Something went wrong")
      }


    }
    fetchbatch()
  }, [loading]);

  const handlesaveBatch = async () => {
    if (!selected || selected.length === 0) {
      console.error("No dates selected!");
      return; // stop execution, API call nahi hogi
    }

    const trip_dates = selected.map(date => {
      const d = new Date(date);
      d.setMinutes(d.getMinutes() - d.getTimezoneOffset()); // timezone adjust
      return d.toISOString().split("T")[0];
    });

    try {
      const payload = {
        itinerary_id: slug,   // param id bhejna
        trip_dates: trip_dates,
        trip_time: "10:00 am",
        trip_createdby: username
      };

      const response = await axios.post(API_URLS.itinerary.savebatch, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (response.status === 201) {
        setBatch(!isBatch)
        setLoading(true)
        console.log(response.data);
      }

    } catch (error) {
      console.error("Error while saving batch:", error);
    }
  };


  const handleDelete = async (id: any) => {
    try {
      const response = await axios.delete(
        API_URLS.itinerary.Deletebatch(id),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 || response.status === 204) {
        console.log("Batch deleted successfully ✅");
        setLoading(true)
        // yaha tu state update kar de (days list se delete karna)
      } else {
        console.warn("Unexpected response:", response);
      }
    } catch (error: any) {
      console.error("Error deleting day ❌", error?.response?.data || error.message);
    }
  };


  return (<>
    <div id="price" className="flex-col hidden w-full ml-4 sm:flex-grow sm:flex sm:mt-2">
      <div className="">
{cards.length > 0 ? (
        <Itinerarycardinfo {...cards[0]} />
      ) : (
        <div className="m-auto">
         <button
              className="flex w-full items-center mb-2 justify-center gap-2 rounded-full border border-gray-300 bg-white text-orange-600 p-2" onClick={() => { setitdata(itinerarydata); openModal(); setform("AddCard")}}
            >
              <PlusIcon />
              Add Card</button>
          </div>
      )}
      </div>
      
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
          <div className="flex flex-col gap-[0.625rem] rounded-[0.625rem] bg-white lg:px-6 lg:py-4">


            <h2 className="text-sm font-medium mx-auto">Select Batch </h2>

            {/* Selected Dates */}

            {isBatch ? <>
              <div className="mt-4 text-xs text-gray-600 space-y-1">
                <div className="bg-white p-4 rounded-lg shadow-lg">
                  <DayPicker
                    mode="multiple"
                    selected={selected}
                    onSelect={(dates) => setSelected(dates || [])}
                    required={false}

                    styles={{
                      caption: { color: "#EA580C !importent", fontWeight: "bold" }, // center align
                    }}
                  />
                </div>

                <div className="mt-4 max-h-48 overflow-y-auto ">
                  <strong>Selected Dates:</strong>
                  <ul>
                    {selected?.map((date, i) => (
                      <div className="bg-gray-100 rounded-lg mt-2 p-2 text-center" key={i}>
                        <p>{date.toDateString()}</p>
                      </div>

                    ))}
                  </ul>
                </div>
                <div className="flex gap-3 justify-end">
                  <button className="p-2 bg-orange-600 text-sm text-white rounded-lg" onClick={handlesaveBatch}>
                    Save Date
                  </button>
                  <button className="p-2 bg-gray-200 text-sm text-gray-600 rounded-lg" onClick={() => { setBatch(!isBatch) }}>
                    Close
                  </button>
                </div>
              </div>
            </> : <>
              <div className="max-h-48 overflow-y-auto">
                {/* Loader ya Error handling */}
                {loading ? (
                  <><div className="text-center m-4">Loading...</div>.</>
                ) : error ? (
                  <>{error}</>
                ) : (
                  <ul>
                    {Batch && Batch.length > 0 ? (
                      Batch.map((date: { trip_date: string, trip_batches_id: number }, i: number) => (
                        <div
                          className="bg-gray-100 rounded-lg mt-2 p-2 text-center text-xs"
                          key={i}
                        >
                          <div className="flex justify-between items-center">
                            {/* Left side */}
                            <div className="flex items-center gap-2 text-sm">
                              <span className="text-orange-600 flex items-center">
                                <CalenderIcon className="w-4 h-4" />
                              </span>
                              <p>{date.trip_date}</p>
                            </div>

                            {/* Right side */}
                            <div className="text-sm text-orange-600 gap-3 flex items-center cursor-pointer" onClick={()=>{setform("Editbatch"); seteditbatchid(date.trip_batches_id); openModal();}}>
                              <div className="flex items-center gap-2 text-sm"><PencilIcon /><p className="text-xs" >
                                Edit Slot{date.trip_batches_id}
                              </p></div>

                              <TrashBinIcon className="w-4 h-4 cursor-pointer" onClick={() => { handleDelete(date.trip_batches_id) }} />
                            </div>
                          </div>

                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-center text-sm">No Batchs available</p>
                    )}
                  </ul>
                )}
              </div>
              <button
                className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-orange-600 shadow-theme-xs hover:bg-gray-300 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-orange-600 dark:hover:bg-gray/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto" onClick={() => {
                  setBatch(!isBatch);
                }}
              >
                <PlusIcon />
                Add Batchs</button>

            </>

            }
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
                    <p className="grow">{itinerarydata.tripDuration - 1}N/{itinerarydata.tripDuration}D</p><div className="text-orange-600 text-sm p-1 cursor-pointer"></div>
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
        </div>
      </div>


    </div>
    <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
      {form == "Add" ? <Addlocation /> :form == "EditLocation" ? 
        <Editlocationmodal data={edit} />: form=="AddCard"?<AddCard data={itdata}/>:form=="Editbatch"?<EditBatchmodal batchid={editbatchid} quadprice={itinerarydata.quadPrice} doubleprice={itinerarydata.doublesharingPrice} tripleprice={itinerarydata.tripalsharingPrice}/>:<></>
      }

    </Modal>
  </>)
}


export default Pricebar