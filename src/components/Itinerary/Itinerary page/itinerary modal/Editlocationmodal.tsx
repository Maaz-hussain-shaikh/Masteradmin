import Input from "../../../form/input/InputField";
import Label from "../../../form/Label";
import Button from "../../../ui/button/Button";
import { useState } from "react";
import axios from "axios";
import { API_URLS } from "../../../../config/config";
import { useParams } from "react-router";
import Radio from "../../../form/input/Radio";
import { TrashBinIcon } from "../../../../icons";



interface Props {
  data: {
    otherlocation_name: string;
    otherlocation_type: string;
    itinerary_pickup_drop_otherlocation_id: number;
    otherlocation_price:number;
    itinerary_id: number;
  };
}

const Editlocationmodal: React.FC<Props> = ({ data }) => {
  const token = localStorage.getItem("token");
const { slug } = useParams();

  const [formData, setFormData] = useState({
    type: data.otherlocation_type,
    price:data.otherlocation_price,
    location: data.otherlocation_name,
  });

  const handleDelete = async (id: any) => {
        try {
            const response = await axios.delete(
                API_URLS.itinerary.Deletelocation(slug, id),
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 200 || response.status === 204) {
                console.log(" deleted successfully ✅");
                // yaha tu state update kar de (days list se delete karna)
            } else {
                console.warn("Unexpected response:", response);
            }
        } catch (error: any) {
            console.error("Error deleting day ❌", error?.response?.data || error.message);
        }
    };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const { name, value } = e.target;
          setFormData((prev) => ({ ...prev, [name]: value }));
      };
      const handleRadioChange = (value: string) => {
      setFormData((prev) => ({ ...prev, "type": value }))
    };

  // Save changes API
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      

      const payload = {        
        otherlocation_price: formData.price,
        otherlocation_name: formData.location,
        otherlocation_type: formData.type,
      };

      const response = await axios.put(
        API_URLS.itinerary.Editlocation(slug,data.itinerary_pickup_drop_otherlocation_id), // <-- tumhare config me update wala API hona chahiye
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("Location updated successfully ✅", response.data);
      }
    } catch (error) {
      console.error("Error updating day ❌", error);
    }
  };

  return (
    <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
            <div className="px-2 pr-14">
                <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                    Add {formData.type} Location
                </h4>
            </div>

            {/* Form */}
            <form className="flex flex-col mt-2" onSubmit={handleSubmit}>
                <div className="px-2 overflow-y-auto custom-scrollbar">


                    <div className="mb-4">
                        <Label>{formData.type} Location Name</Label>
                        <Input
                            type="text"
                            name="Location"
                            placeholder="Ratlam"
                            value={formData.location}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-4">
                        <Label>Ticket Price</Label>
                        <Input
                            type="number"
                            name="Price"
                            placeholder="500"
                            value={formData.price}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="flex flex-wrap items-center gap-8">
          <Radio
            id="radio1"
            name="group1"
            value="pickup"
            checked={formData.type === "pickup" }
            onChange={handleRadioChange}
            label="Add Pickup Location"
          />
          <Radio
            id="radio2"
            name="group1"
            label="Add Drop Location"
            value="drop"
            checked={formData.type=== "drop"}
            onChange={handleRadioChange}
          />

        </div>

                <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                    <Button size="sm" >
                        Save Changes
                    </Button>
                    <div className="hidden rounded-full bg-blue-100 px-2 py-2 text-xl lg:block" onClick={()=>{handleDelete(data.itinerary_pickup_drop_otherlocation_id)}}>
                      <TrashBinIcon/>
                    </div>
                </div>
            </form>
        </div>
  );
};

export default Editlocationmodal;
