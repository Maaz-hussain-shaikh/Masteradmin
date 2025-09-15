import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URLS } from "../../../config/config";

import Faq from "./Faq";
import Itinerarydays from "./Itinerarydays";
import Itineraryintro from "./Itineraryintro";
import Pageheader from "./Pageheader";
import Pricebar from "./Pricebar";
import Thingstoknow from "./Thingstoknow";
import Loader from "../../common/Loader";
import Adddonactivity from "./Addonactivity";

// Types
interface Item {
  [key: string]: any;
}

interface Itinerary {
  status: boolean;
  mass: string;
  data: Record<string, any>;
}
interface cards {
  status: boolean;
  mass: string;
  data: Record<string, any>;
}

interface TripData {
  addOns: Item[];
  bookingTerms: Item[];
  days: Item[];
  exclusions: Item[];
  faq: Item[];
  inclusions: Item[];
  itinerary: Itinerary;
  otherLocations: Item[];
  thingsToGet: Item[];
  images:Item[];
  cards:cards;
}

const ItinerarypageLayout: React.FC = () => {
  const id = useParams();
  const token = localStorage.getItem("token");
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

  const [tripData, setTripData] = useState<TripData | null>(null);

  useEffect(() => {
    const fetchitinerarydata = async () => {
      try {
        const response = await axios.get(API_URLS.trips.getById(id.slug), {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          console.log("API Response:", response.data);
          setTripData(response.data.data); // <-- directly data set karna
          
        }
      } catch (err: any) {
                setError(err.message || "Something went wrong");
            } finally {
                setLoading(false);
            }
    };

    fetchitinerarydata();
  }, [id, token]);

  if (!tripData) return <Loader loading={loading} error={error} />;

  return (
    <>
      <Pageheader data={tripData.images}/>
      <div className="max-w-screen-xl w-full mx-auto sm:px-0">
        <div className="flex relative flex-col sm:flex-row">
          {/* Left Section */}
          <div className="flex-shrink-0 w-full sm:w-2/3 sm:mb-4">
            {/* Itinerary intro */}
            <Itineraryintro  itinerarydata={tripData.itinerary.data}/>

            {/* Days */}
            <Itinerarydays days={tripData.days} />

            {/* Inclusions / Exclusions / Things to get */}
            <Thingstoknow
              inclusions={tripData.inclusions}
              exclusions={tripData.exclusions}
              thingsToGet={tripData.thingsToGet}
            />
            <Adddonactivity addOns={tripData.addOns}/>

            {/* FAQ */}
            <Faq faq={tripData.faq} bookingTerms={tripData.bookingTerms} />
          </div>

          {/* Right Section */}
          <Pricebar            
            otherLocations={tripData.otherLocations} 
            itinerarydata={tripData.itinerary.data}
            cards={tripData.cards.data}
          />
        </div>
      </div>
    </>
  );
};

export default ItinerarypageLayout;
