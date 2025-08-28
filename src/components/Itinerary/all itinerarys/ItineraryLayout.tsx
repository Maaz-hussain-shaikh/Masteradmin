import React, { useEffect, useState } from "react";
import ItineraryCard from "./ItineraryCard";
import { API_URLS } from "../../../config/config";
import axios from "axios";
import Loader from "../../common/Loader";

type Trip = {

    itinerary_id: number;
    itinerary_title: string;
    image: string;
    city: string;
    state:string;
    tripDuration: number;
   
    oldPrice: string;
    quadPrice: number;
    eventoffer?: string;
    itineraryType?: string;
    itinerarycreationDate: string;
    country:string;
    itineraryStatus?: string;
};

const ItineraryLayout: React.FC = () => {
    const [trips, setTrips] = useState<Trip[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("token")
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const url = API_URLS.itinerary.getAll;
                const res = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`, // token pass karna
                        "Content-Type": "application/json",
                    },
                });

                if (res.status === 200) {
                    console.log(res.data)
                    setTrips(res.data.data);
                } else {
                    setError("Something is not good");
                }
            } catch (err: any) {
                setError(err.message || "Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <Loader loading={loading} error={error} />

            {!loading && !error && (
                <>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
                        {trips.map((trip) => (
                            <ItineraryCard key={trip.
                                itinerary_id} {...trip} />
                        ))}
                    </div>

                </>
            )}
        </>

    );
};

export default ItineraryLayout;
