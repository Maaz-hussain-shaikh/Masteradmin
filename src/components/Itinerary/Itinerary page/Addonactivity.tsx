import { useState } from "react";
import { PencilIcon, PlusIcon, TrashBinIcon } from "../../../icons";
import { Modal } from "../../ui/modal";
import { useModal } from "../../../hooks/useModal";
import Addonmodal from "./itinerary modal/Addonmodal";
import axios from "axios";
import { API_URLS } from "../../../config/config";
import { useParams } from "react-router";
import EditAddon from "./itinerary modal/EditAddon";

interface Props {
    addOns: any[];

}

const Addonactivity: React.FC<Props> = ({ addOns }) => {
    const [expanded, setExpanded] = useState(false);
    const{slug}=useParams();
    const [edit, setedit] = useState<any | null>(null);
    const token=localStorage.getItem("token")
    const { isOpen, openModal, closeModal } = useModal();
    const [form, setform] = useState("Add")

    const handleDelete = async (id: any) => {
        try {
            const response = await axios.delete(
                API_URLS.itinerary.Deleteaddon(slug, id),
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 200 || response.status === 204) {
                console.log("Day deleted successfully ✅");
                // yaha tu state update kar de (days list se delete karna)
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
                            <h2 className="text-2xl text-orange-600 font-bold">Add On Activites</h2>
                            <button
                                className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-orange-600 shadow-theme-xs hover:bg-gray-300 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-orange-600 dark:hover:bg-gray/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto" onClick={() => { setform("Add"); openModal(); }}
                            >
                                <PlusIcon />
                                Add </button>
                        </div>



                        <hr className="border-gray-300" />
                        {/* Content */}

                        {addOns.map((elm, index) => {
                            return (
                                <div
                                    className={`border rounded-2xl shadow-sm bg-white p-4 mb-4 transition-all}`}
                                    key={index}>
                                    {/* Header */}
                                    <div className="flex flex-col lg:flex-row lg:items-start gap-4 cursor-pointer">
                                        {/* Image */}
                                        <div className="relative w-90 mx-auto overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
                                            <img
                                                src="/images/grid-image/image-01.png"
                                                alt="Cover"
                                                className=" object-cover rounded-xl"
                                            />
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 flex flex-col  ">
                                            <div className="flex justify-between text-orange-600 text-xl">
                                                <h3 className="text-lg lg:text-xl text-orange-600 font-semibold">
                                                    {elm.itinerary_addOns_title}
                                                </h3>
                                                <div className="flex gap-2">
                                                    <div className="m-2" onClick={()=>{setedit(addOns[index]); setform("Edit"); openModal()}}>
                                                        <PencilIcon />
                                                    </div>
                                                    <div className="m-2" onClick={()=>{handleDelete(elm.itinerary_addOns_id)}}>
                                                        <TrashBinIcon />
                                                    </div>


                                                </div>
                                            </div>


                                            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-4 mt-1">
                                                {elm.itinerary_addOns_description}
                                            </p>

                                            {/* Pricing & Actions */}
                                            <div className="flex flex-col lg:flex-row lg:items-end justify-between mt-3">
                                                <div className="mt-2">
                                                    <p className="text-gray-400 line-through text-sm">₹ {elm.itinerary_addOns_amount + 500}</p>
                                                    <p className="text-xl lg:text-2xl font-bold text-orange-600">
                                                        ₹ {elm.itinerary_addOns_amount}
                                                    </p>
                                                    <p className="text-xs text-gray-500">Per Adult</p>
                                                </div>

                                                <div className="flex items-center justify-between lg:justify-end mt-2 lg:mt-0">
                                                    <p className="text-orange-600 mr-3 text-sm cursor-pointer" onClick={() => setExpanded(!expanded)}>
                                                        {expanded ? "Hide" : "See Details"}
                                                    </p>
                                                    <button
                                                        type="button"
                                                        className="text-white rounded-full bg-orange-600 px-4 py-2 text-sm shadow-sm hover:bg-orange-700 transition"

                                                    >
                                                        {expanded ? "Added" : "Add Activity"}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>




                                    {/* Expand Section */}
                                    {expanded && (
                                        <div className="mt-4 border-t pt-4 space-y-4">
                                            <div>
                                                <h4 className="font-semibold text-gray-800 mb-2">Price Includes</h4>
                                                <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias exercitationem, autem in dignissimos, mollitia maiores aperiam asperiores natus nihil consequuntur modi vitae ex, temporibus animi perferendis! Possimus natus accusamus minus.</p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                            )
                        })}

                    </div>
                </div>

                {/* View More Button */}

            </section>
            <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
                {form==="Add"?<Addonmodal />:<EditAddon data={edit}/>}
                

            </Modal>

        </>
    );
};

export default Addonactivity;
