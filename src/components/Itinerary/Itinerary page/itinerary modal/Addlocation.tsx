import React, { useState } from "react";
import Input from "../../../form/input/InputField";
import Label from "../../../form/Label";
import Button from "../../../ui/button/Button";
import axios from "axios";
import { API_URLS } from "../../../../config/config";
import { useParams } from "react-router";
import Radio from "../../../form/input/Radio";




const Addlocation = () => {
    const token = localStorage.getItem("token");
    const Editorname = localStorage.getItem("username");
    const { slug } = useParams()
    const [formData, setFormData] = useState({
        Type: "",
        Location: "",
        Price:""
    });

    // handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    const handleRadioChange = (value: string) => {
    setFormData((prev) => ({ ...prev, "Type": value }))
  };

    // handle form submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const payload = {
                itinerary_id: slug,   // param id bhejna
                otherlocation_type: formData.Type,
                otherlocation_name: formData.Location,
                otherlocation_price:formData.Price,
                otherlocation_creation_by: Editorname
            };

            const response = await axios.post(
                API_URLS.itinerary.Addnewlocation,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );
            if (response.status === 200) {
                console.log("✅ Location updated successfully", response.data);
            }
        } catch (error) {
            console.error("❌ Error updating exclusion:", error);
        }
    };

    return (
        <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
            <div className="px-2 pr-14">
                <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                    Add {formData.Type} Location
                </h4>
            </div>

            {/* Form */}
            <form className="flex flex-col mt-2" onSubmit={handleSubmit}>
                <div className="px-2 overflow-y-auto custom-scrollbar">


                    <div className="mb-4">
                        <Label>{formData.Type} Location Name</Label>
                        <Input
                            type="text"
                            name="Location"
                            placeholder="Ratlam"
                            value={formData.Location}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-4">
                        <Label>Ticket Price</Label>
                        <Input
                            type="number"
                            name="Price"
                            placeholder="500"
                            value={formData.Price}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="flex flex-wrap items-center gap-8">
          <Radio
            id="radio1"
            name="group1"
            value="Pickup"
            checked={formData.Type === "Pickup"}
            onChange={handleRadioChange}
            label="Add Pickup Location"
          />
          <Radio
            id="radio2"
            name="group1"
            label="Add Drop Location"
            value="Drop"
            checked={formData.Type=== "Drop"}
            onChange={handleRadioChange}
          />

        </div>

                <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                    <Button size="sm" >
                        Save Changes
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default Addlocation;