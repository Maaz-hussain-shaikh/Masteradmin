import React from "react";
import { PencilIcon, TrashBinIcon } from "../../../icons";
import axios from "axios";
import { API_URLS } from "../../../config/config";
import { useParams } from "react-router";
import { Modal } from "../../ui/modal";
import Editcardmodal from "./itinerary modal/Editcardmodal";
import { useModal } from "../../../hooks/useModal";


type CardProps = {

    itinerary_cards_id: number,
    itinerary_id: number,
    name_of_trip: string,
    duration: string,
    price_of_trip: number,
    discount: number,
    type_of_trip: string,
    country: string,
    state: number,
    cards_Tag: string,
    cards_Tag2: string,
    cards_Image: string,
    cards_status: string,
    is_event: string,
    Nameofevent: string,
    seasonoftrip: string,
    create_by: number,
    creation_time: string
};

const Itinerarycardinfo: React.FC<CardProps> = ({
    itinerary_cards_id,
    itinerary_id,
    name_of_trip,
    duration,
    price_of_trip,
    discount,
    type_of_trip,
    country,
    state,
    cards_Tag,
    cards_Tag2,
    cards_Image,
    cards_status,
    is_event,
    Nameofevent,
    seasonoftrip,
    create_by,
    creation_time,
}) => {
    const token = localStorage.getItem("token")
    const { slug } = useParams()
    const { isOpen, openModal, closeModal } = useModal();
    const handleDelete = async (id: any) => {
        try {
            const response = await axios.delete(
                API_URLS.itinerary.Deletecard(slug, id),
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 200 || response.status === 204) {
                console.log("Batch deleted successfully ✅");

                // yaha tu state update kar de (days list se delete karna)
            } else {
                console.warn("Unexpected response:", response);
            }
        } catch (error: any) {
            console.error("Error deleting day ❌", error?.response?.data || error.message);
        }
    };

    const changestatus = async (id: any) => {
        try {
            const form = new FormData()

            if (cards_status=="active"){
                form.append("cards_status","Inactive")
            }else{
                form.append("cards_status","active")
            }
            const response = await axios.put(
                API_URLS.itinerary.Editcardstatus(slug, id),form,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 200 || response.status === 204) {
                console.log("Status change successfully ✅");

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
            <div className="relative w-80 m-auto mb-2 rounded-xl overflow-hidden shadow-md bg-white group">
                {/* Image */}
                <div className="relative">
                    <img
                        src="https://storage.justwravel.com/package/images/banner/listing_desktop/cropped/spiti-backpacking-trip-JustWravel-1707757256-SPITI-BKP-3.jpg.webp"
                        alt={name_of_trip}
                        className="w-full h-full object-cover transition-transform tripDuration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>

                    {/* Tags */}
                    <div className="absolute top-2  flex flex-col gap-2">
                        {cards_Tag && (
                            <span className="bg-orange-600 text-white text-xs px-3 py-1 rounded-r-lg font-medium">
                                {cards_Tag}
                            </span>
                        )}

                        <span className="bg-green-400 text-black text-xs px-3 py-1 rounded-r-lg font-medium">
                            {type_of_trip}
                        </span>

                    </div>

                    {/* itinerarycreationDate */}

                    <div className="absolute top-2 right-0 flex items-center">
                        <span className="bg-green-400 text-black text-[10px] px-1 py-[2px] rounded-l-sm font-semibold">
                            Upto
                        </span>
                        <span className="bg-orange-600 text-white text-xs px-2 py-1 rounded-r-md font-bold">
                            {discount}
                        </span>
                    </div>

                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 text-white px-3 py-3">
                    <h3 className="font-semibold text-base line-clamp-2">{name_of_trip
                    }</h3>

                    {/* city */}
                    <div className="mt-1 inline-flex items-center gap-1 text-xs bg-white/20 px-3 py-[2px] rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="14" fill="white" viewBox="0 0 10 14">
                            <path d="M5 6.666a1.667 1.667 0 110-3.333 1.667 1.667 0 010 3.333zM5 .333A4.667 4.667 0 00.335 5c0 3.5 4.667 8.666 4.667 8.666S9.667 8.5 9.667 5A4.667 4.667 0 005.001.333z"></path>
                        </svg>
                        {state} , {country}
                    </div>

                    <hr className="my-2 border-white/30" />

                    {/* tripDuration + Date */}
                    <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 18 18">
                                <path d="M17.333 9A8.333 8.333 0 11.667 9a8.333 8.333 0 0116.666 0zM9 4a.833.833 0 00-.833.833v5c0 .46.373.834.833.834h4.167a.833.833 0 100-1.667H9.833V4.833A.833.833 0 009 4z"></path>
                            </svg>
                            {duration}
                        </div>
                        <div className="h-4 w-[1px] bg-white"></div>
                        <div className="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 20 18">
                                <path d="M15 14a1 1 0 100-2 1 1 0 000 2z"></path>
                                <path d="M4 1a1 1 0 012 0v1h8V1a1 1 0 112 0v1h1a3 3 0 013 3v10a3 3 0 01-3 3H3a3 3 0 01-3-3V5a3 3 0 013-3h1V1zM2 15V8h16v7a1 1 0 01-1 1H3a1 1 0 01-1-1z"></path>
                            </svg>
                            {seasonoftrip}
                        </div>
                    </div>

                    {/* Price + Rating */}
                    <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center gap-2">
                            <p className="line-through text-gray-300 text-sm">5000</p>
                            <p className="text-lg font-bold">
                                ₹ {price_of_trip}</p>
                        </div>

                        <div className="flex items-center text-yellow-400 text-sm cursor-pointer">

                            <span className="ml-1 text-xs text-orange-600 font-medium bg-white px-2 p-1 rounded-full" onClick={()=>{changestatus(itinerary_cards_id)}}> {cards_status} </span>
                            <span className="ml-1 text-lg text-orange-600 font-medium bg-white p-1 rounded-full " onClick={() => { openModal() }}><PencilIcon /> </span>
                            <span className="ml-1 text-lg text-orange-600 font-medium bg-white p-1 rounded-full " onClick={() => { handleDelete(itinerary_cards_id) }}><TrashBinIcon /></span>
                        </div>

                    </div>
                </div>
            </div> <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
                <Editcardmodal cardData={{
                    itinerary_cards_id,
                    itinerary_id,
                    name_of_trip,
                    duration,
                    price_of_trip,
                    discount,
                    type_of_trip,
                    country,
                    state,
                    cards_Tag,
                    cards_Tag2,
                    cards_Image,
                    cards_status,
                    is_event,
                    Nameofevent,
                    seasonoftrip,
                    create_by,
                    creation_time,
                
                }} />

            </Modal>
        </>
    );
};

export default Itinerarycardinfo;
