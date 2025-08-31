import React from "react";
import { useNavigate } from "react-router";

type CardProps = {

    itinerary_id: number;
    country:string;
    state:string;
    itinerary_title: string;
    city: string;
    tripDuration: number;
    oldPrice: string;
    quadPrice: number;
    eventoffer?: string;
    itineraryType?: string;
    itinerarycreationDate: string;
    itineraryStatus?: string;
};

const ItineraryCard: React.FC<CardProps> = ({
    itinerary_title,
    itinerary_id,
    city,
    country,
    state,
    tripDuration,
    oldPrice,
    quadPrice,
    eventoffer,
    itineraryType,
    itinerarycreationDate,
    itineraryStatus
    ,
}) => {
    const location=useNavigate()
     const [date,time]=itinerarycreationDate.split("T")
    return (
       
        <div className="relative w-full rounded-xl overflow-hidden shadow-md bg-white group" onClick={()=>{location(`ItineraryPage/${itinerary_id}`)}}>
            {/* Image */}
            <div className="relative">
                <img
                    src="https://storage.justwravel.com/package/images/banner/listing_desktop/cropped/spiti-backpacking-trip-JustWravel-1707757256-SPITI-BKP-3.jpg.webp"
                    alt={itinerary_title
                    }
                    className="w-full h-full object-cover transition-transform tripDuration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>

                {/* Tags */}
                <div className="absolute top-2  flex flex-col gap-2">
                    {itineraryType && (
                        <span className="bg-orange-600 text-white text-xs px-3 py-1 rounded-r-lg font-medium">
                            {itineraryType}
                        </span>
                    )}
                    
                        <span className="bg-green-400 text-black text-xs px-3 py-1 rounded-r-lg font-medium">
                            {itineraryStatus}
                        </span>
                   
                </div>

                {/* itinerarycreationDate */}
                
                    <div className="absolute top-2 right-0 flex items-center">
                        <span className="bg-green-400 text-black text-[10px] px-1 py-[2px] rounded-l-sm font-semibold">
                            Upto
                        </span>
                        <span className="bg-orange-600 text-white text-xs px-2 py-1 rounded-r-md font-bold">
                            {eventoffer}
                        </span>
                    </div>
              
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 text-white px-3 py-3">
                <h3 className="font-semibold text-base line-clamp-2">{itinerary_title
                }</h3>

                {/* city */}
                <div className="mt-1 inline-flex items-center gap-1 text-xs bg-white/20 px-3 py-[2px] rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="14" fill="white" viewBox="0 0 10 14">
                        <path d="M5 6.666a1.667 1.667 0 110-3.333 1.667 1.667 0 010 3.333zM5 .333A4.667 4.667 0 00.335 5c0 3.5 4.667 8.666 4.667 8.666S9.667 8.5 9.667 5A4.667 4.667 0 005.001.333z"></path>
                    </svg>
                    {city} , {state} , {country}
                </div>

                <hr className="my-2 border-white/30" />

                {/* tripDuration + Date */}
                <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 18 18">
                            <path d="M17.333 9A8.333 8.333 0 11.667 9a8.333 8.333 0 0116.666 0zM9 4a.833.833 0 00-.833.833v5c0 .46.373.834.833.834h4.167a.833.833 0 100-1.667H9.833V4.833A.833.833 0 009 4z"></path>
                        </svg>
                        {tripDuration-1}N/{tripDuration}D
                    </div>
                    <div className="h-4 w-[1px] bg-white"></div>
                    <div className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 20 18">
                            <path d="M15 14a1 1 0 100-2 1 1 0 000 2z"></path>
                            <path d="M4 1a1 1 0 012 0v1h8V1a1 1 0 112 0v1h1a3 3 0 013 3v10a3 3 0 01-3 3H3a3 3 0 01-3-3V5a3 3 0 013-3h1V1zM2 15V8h16v7a1 1 0 01-1 1H3a1 1 0 01-1-1z"></path>
                        </svg>
                        {date}
                    </div>
                </div>

                {/* Price + Rating */}
                <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center gap-2">
                        <p className="line-through text-gray-300 text-sm">{oldPrice}</p>
                        <p className="text-lg font-bold">
                        ₹ {
                            quadPrice}</p>
                    </div>
                 
                        <div className="flex items-center text-yellow-400 text-sm">
                            
                            <span className="ml-1 text-xs text-white">{time.split(".")[0]
                            }</span>
                        </div>
                 
                </div>
            </div>
        </div>
    );
};

export default ItineraryCard;
