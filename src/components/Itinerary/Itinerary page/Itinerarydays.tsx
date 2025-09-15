import { useState } from "react";
import { Modal } from "../../ui/modal";
import Daysmodal from "./itinerary modal/Daysmodal";
import { useModal } from "../../../hooks/useModal";
import { TrashBinIcon } from "../../../icons";
import Adddaysmodal from "./itinerary modal/Adddaysmodal";
import axios from "axios";
import { API_URLS } from "../../../config/config";
import { useParams } from "react-router";


interface Props {
    days: any[];
}

const Itinerarydays: React.FC<Props> = ({ days }) => {
    const { slug } = useParams();
    const [isOpendays, setisOpendays] = useState();
    const [form, setform] = useState("Add")
    const [edit, setedit] = useState<any | null>(null);
    const toggleid = (id: any) => {
        setisOpendays(isOpendays === id ? null : id);
    };
    const token = localStorage.getItem("token")
    const { isOpen, openModal, closeModal } = useModal();

    const handleDelete = async (id: any) => {
        try {
            const response = await axios.delete(
                API_URLS.itinerary.Deleteitinerarydays(slug, id),
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
            <section className=" bg-white rounded-lg  mt-2 shadow-md">
                <div className="overflow-hidden" >
                    <div className="flex flex-col gap-2 lg:gap-2 rounded-lg bg-white p-6 ">
                        {/* Heading */}

                        <div className="flex justify-between">
                            <h2 className="text-2xl text-orange-600 font-bold">Detailed Itinerary</h2>

                        </div>
                        <span className="font-medium  text-sm">Your days at a glance</span>
                        <hr className="border-gray-300" />

                        {days.map((elem, index) => {
                            let id = index + 1
                            return (
                                <>

                                    <div className={`${isOpendays === id ? 'mb-4 mt-4' : 'flex flex-wrap gap-5 lg:gap-5 rounded-xl'} `} key={id}>


                                        <div className={`${isOpendays === id ? "flex w-full gap-[0.625rem] items-start " : "flex w-full gap-[0.625rem] items-center rounded-xl p-2 shadow-md"}`} >
                                            {/* Day Number Box */}


                                            <div
                                                className={`flex shrink-0 basis-[40px] cursor-pointer items-center justify-center rounded-[.25rem] bg-gray-700/5 py-2 transition-all duration-300${isOpendays === id ? "w-30 lg:w-20 lg:basis-[80px] lg:rounded-[0.625rem] lg:py-4" : "w-30 h-15 lg:h-20 lg:w-20 lg:basis-[80px] lg:rounded-[0.625rem]"}`}

                                            >
                                                <div className="flex items-center flex-col lg:flex-row-reverse lg:gap-2" onClick={() => toggleid(id)}>
                                                    {/* Adjusted font size for better mobile readability */}
                                                    <h6 className="text-base font-semibold lg:text-lg xl:text-xl">{id}</h6>
                                                    <p className="text-sm lg:text-md xl:text-lg">Day</p>
                                                </div>
                                            </div>

                                            {/* Itinerary Details */}

                                            <div className="grow " onClick={() => toggleid(id)}>
                                                <h3 className="cursor-pointer text-sm font-medium lg:text-lg">
                                                    {elem.itinerary_days_title}
                                                </h3>
                                                {isOpendays === id && (
                                                    <div className="itinerary-description mt-[0.375rem] text-sm text-gray-500 lg:mt-2 lg:text-base ml-4" >
                                                        {elem.itinerary_days_description}

                                                    </div>
                                                )}

                                            </div>

                                            {/* Arrow Icon */}
                                            <div className="cursor-pointer rotate-360 mr-4 text-orange-600" onClick={() => { setedit(days[index]); setform("Edit"); openModal() }} >
                                                <svg
                                                    className="fill-current"
                                                    width="18"
                                                    height="18"
                                                    viewBox="0 0 18 18"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
                                                        fill=""
                                                    />
                                                </svg>
                                            </div>
                                            <div className="text-xl p-2 text-orange-600 cursor-pointer" onClick={() => { handleDelete(elem.itinerary_days_id) }} >
                                                <TrashBinIcon />

                                            </div>
                                        </div>

                                    </div>
                                </>
                            )
                        })}


                        <button
                            className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-orange-600 shadow-theme-xs hover:bg-gray-300 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-orange-600 dark:hover:bg-gray/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto" onClick={() => { openModal(); setform("Add") }}
                        >
                            <svg
                                className="fill-current"
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
                                    fill=""
                                />
                            </svg>
                            Add Days</button>

                    </div>
                </div>
            </section>
            <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
                {form == "Add" ? <Adddaysmodal /> :
                    <Daysmodal days={edit} />
                }

            </Modal>



        </>
    )
}

export default Itinerarydays