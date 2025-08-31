import axios from "axios";
import { useModal } from "../../../hooks/useModal";
import { PencilIcon, PlusIcon, TrashBinIcon } from "../../../icons";
import { Modal } from "../../ui/modal";
import InclusionModal from "./itinerary modal/InclusionModal";
import { useParams } from "react-router";
import { API_URLS } from "../../../config/config";
import { useState } from "react";
import Editinclusion from "./itinerary modal/Editinclusion";
import Editexclusion from "./itinerary modal/Editexclusion";
import Editthingstotake from "./itinerary modal/Editthingstotake";

interface Props {
    inclusions: any[];
    exclusions: any[];
    thingsToGet: any[];
}

const Thingstoknow: React.FC<Props> = ({ inclusions, exclusions, thingsToGet }) => {
    const { isOpen, openModal, closeModal } = useModal();
    const [form,setform]=useState("Add")
    const [edit,setedit]=useState<any | null>(null);
   
const { slug } = useParams();
const token=localStorage.getItem("token")


    const handleDelete = async (id:any,name:string) => {
  try {
    const response = await axios.delete(
      API_URLS.itinerary.Deleteinclusion(slug, id,name),
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 || response.status === 204) {
      console.log("Inclusion deleted successfully ✅");
     
    } else {
      console.warn("Unexpected response:", response);
    }
  } catch (error: any) {
    console.error("Error deleting day ❌", error?.response?.data || error.message);
  }
};

    return (
        <>
            <section className=" bg-white rounded-lg mt-4 shadow-md">
                <div className="overflow-hidden" >
                    <div className="flex flex-col gap-2 lg:gap-2 rounded-lg bg-white p-6 ">
                        {/* Heading */}
                        <div className="flex justify-between">
                            <h2 className="text-2xl text-orange-600 font-bold">Things to know</h2>
                            <button
                                className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-orange-600 shadow-theme-xs hover:bg-gray-300 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-orange-600 dark:hover:bg-gray/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto" onClick={() => { openModal(); setform("Add") }}
                            >
                <PlusIcon/>
                                Add </button>
                        </div>


                        <span className="font-medium  text-sm">Before you go</span>
                        <hr className="border-gray-300" />
                        {/* Content */}
                        <div className="flex flex-col w-full ">
                            <div className="grid w-full grid-cols-1 gap-4  sm:grid-cols-3">
                                {/* Inclusions */}
                                <div className="flex flex-col space-y-4">
                                    <h3 className="font-bold text-lg">What's included</h3>
                                    <div className="flex flex-col space-y-2">

                                        {inclusions.map((element,index) => {
                                            return (
                                                <div className="flex flex-col p-4 rounded-lg border border-gray-200 space-y-1 justify-start relative" key={index}>
                                                    {/* Icon */}
                                                    <div className="flex ">
                                                        <div className="w-6 icon-transition">img</div>
                                                        <div className="text-xl p-2 text-orange-600 cursor-pointer absolute right-0 top-0"  >
                                                            <div className="flex gap-2">
                                                                <div className="m-2" onClick={() => { setedit(inclusions[index]); openModal(); setform("Editinclusion") }}>
                                                                    <PencilIcon />
                                                                </div>
                                                                <div className="m-2" onClick={()=>{handleDelete(element.inclusions_id,"deleteInclusion")}}>
                                                                    <TrashBinIcon />
                                                                </div>


                                                            </div>

                                                        </div>


                                                    </div>


                                                    {/* Title */}
                                                    <span className="font-semibold text-sm">{element.inclusions_title}</span>

                                                    {/* Description */}
                                                    <div className="text-xs text-gray-600">
                                                        <p>{element.inclusions_description}</p>
                                                    </div>

                                                </div>
                                            )
                                        })}


                                    </div>
                                </div>


                                <div className="flex flex-col space-y-4">
                                    <h3 className="font-bold text-lg">What's not included</h3>
                                    <div className="flex flex-col space-y-2">

                                        {exclusions.map((element,index) => {
                                            return (
                                                <div className="flex flex-col p-4 rounded-lg border border-gray-200 space-y-1 justify-start relative" key={index}>
                                                    {/* Icon */}
                                                   <div className="flex ">
                                                        <div className="w-6 icon-transition">img</div>
                                                        <div className="text-xl p-2 text-orange-600 cursor-pointer absolute right-0 top-0"  >
                                                            <div className="flex gap-2">
                                                                <div className="m-2" onClick={() => { setedit(exclusions[index]);  openModal(); setform("Editexclusion") }}>
                                                                    <PencilIcon />
                                                                </div>
                                                                <div className="m-2" onClick={()=>{handleDelete(element.exclusions_id,"deleteExclusion")}}>
                                                                    <TrashBinIcon />
                                                                </div>


                                                            </div>

                                                        </div>


                                                    </div>

                                                    {/* Title */}
                                                    <span className="font-semibold text-sm">{element.exclusions_title}</span>

                                                    {/* Description */}
                                                    <div className="text-xs text-gray-600">
                                                        <p>{element.exclusions_description}</p>
                                                    </div>
                                                </div>
                                            )
                                        })}

                                        <button className="text-sm font-medium text-orange-600" >
                                            Show less
                                        </button>
                                    </div>
                                </div>

                                {/* Things to Carry */}
                                <div className="flex flex-col space-y-4">
                                    <h3 className="font-bold text-lg">What to carry</h3>
                                    <div className="flex flex-col space-y-2">
                                        {/* yahaloop lage ga */}

                                        {thingsToGet.map((element,index) => {
                                            return (
                                                <div className="flex flex-col p-4 rounded-lg border border-gray-200 space-y-1 justify-start relative" key={index}>
                                                    {/* Icon */}
                                                   <div className="flex ">
                                                        <div className="w-6 icon-transition">img</div>
                                                        <div className="text-xl p-2 text-orange-600 cursor-pointer absolute right-0 top-0"  >
                                                            <div className="flex gap-2">
                                                                <div className="m-2" onClick={() => { setedit(thingsToGet[index]); openModal(); setform("Editthingstotake") }}>
                                                                    <PencilIcon />
                                                                </div>
                                                                <div className="m-2" onClick={()=>{handleDelete(element.thingstoget_id,"deleteItineraryThingsToGet")}}>
                                                                    <TrashBinIcon />
                                                                </div>


                                                            </div>

                                                        </div>


                                                    </div>

                                                    {/* Title */}
                                                    <span className="font-semibold text-sm">{element.thingstoget_title}</span>

                                                    {/* Description */}
                                                    <div className="text-xs text-gray-600">
                                                        <p>{element.thingstoget_description}</p>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* View More Button */}

            </section>
            <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
                {form=="Add"?<InclusionModal />:form=="Editinclusion"?
                <Editinclusion data={edit} />:form=="Editexclusion"? <Editexclusion data={edit}/>
                :form=="Editthingstotake"?<Editthingstotake data={edit}/>:<></>
                }
                
            </Modal>

        </>
    )
}
export default Thingstoknow