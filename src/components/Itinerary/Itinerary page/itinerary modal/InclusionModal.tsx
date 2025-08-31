import { useState } from "react";
import FileInput from "../../../form/input/FileInput";
import Input from "../../../form/input/InputField";
import Label from "../../../form/Label";
import Button from "../../../ui/button/Button";
import axios from "axios";
import { API_URLS } from "../../../../config/config";
import { useParams } from "react-router";

export default function InclusionModal() {
    const [activeTab, setActiveTab] = useState<"inclusion" | "exclusion" | "things_to_carry">("inclusion");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [icon, setIcon] = useState<File | null>(null);
const {slug}=useParams()
    const token = localStorage.getItem("token"); // ya jaha se tu token le raha hai
const Editorname = localStorage.getItem("username");
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();


        try {
            let post = '';
            const formData = new FormData();
            
            if (activeTab === "exclusion") {
                post = "addItineraryExclusions"
                formData.append("itinerary_id", slug ?? "");
                formData.append("exclusions_name", name);
                formData.append("exclusions_title", name);
                formData.append("exclusions_description", description);
                formData.append("exclusions_creationby", Editorname??"" );
                if (icon) formData.append("image", icon);

            } else if (activeTab === "inclusion") {
                post = "addItineraryInclusions"
                formData.append("itinerary_id", slug ?? "");
                formData.append("inclusions_name", name);
                formData.append("inclusions_title", name);
                formData.append("inclusions_description", description);
                formData.append("inclusions_creationby", Editorname??"" );
                if (icon) formData.append("image", icon);
            } else if(activeTab==="things_to_carry") {
                post = "addItineraryThingsToGet"
                formData.append("itinerary_id", slug ?? "");
                formData.append("thingstoget_name", name);
                formData.append("thingstoget_title", name);
                formData.append("thingstoget_description", description);
                formData.append("thingstoget_creationby", Editorname??"" );
                if (icon) formData.append("image", icon);
            }



            const response = await axios.post(API_URLS.itinerary.Addinclusion(post), formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.status === 200 || response.status===201 ) {
                console.log(`${activeTab} saved ✅`, response.data);
                // Reset form
                setName("");
                setDescription("");
                setIcon(null);
            }
        } catch (error: any) {
            console.error("Error saving:", error.response?.data || error.message);
        }
    };

    return (
        <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
            <div className="px-2 pr-14">
                <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                    Add New {activeTab === "inclusion" ? "Inclusion" : activeTab === "exclusion" ? "Exclusion" : "Things to Carry"}
                </h4>

                {/* Tab Buttons */}
                <div className="flex gap-2 mb-4">
                    <button
                        type="button"
                        onClick={() => setActiveTab("inclusion")}
                        className={`flex items-center justify-center px-3 py-2 text-xs font-medium rounded-xl border shadow-theme-xs 
              ${activeTab === "inclusion" ? "bg-orange-600 text-white" : "bg-white text-orange-600 border-gray-300"}`}
                    >
                        Inclusion
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab("exclusion")}
                        className={`flex items-center justify-center px-3 py-2 text-xs font-medium rounded-xl border shadow-theme-xs 
              ${activeTab === "exclusion" ? "bg-orange-600 text-white" : "bg-white text-orange-600 border-gray-300"}`}
                    >
                        Exclusion
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab("things_to_carry")}
                        className={`flex items-center justify-center px-3 py-2 text-xs font-medium rounded-xl border shadow-theme-xs 
              ${activeTab === "things_to_carry" ? "bg-orange-600 text-white" : "bg-white text-orange-600 border-gray-300"}`}
                    >
                        Things to Carry
                    </button>
                </div>
            </div>

            {/* Form */}
            <form className="flex flex-col mt-2" onSubmit={handleSubmit}>
                <div className="px-2 overflow-y-auto custom-scrollbar">
                    <div className="mb-4">
                        <Label>Icon</Label>
                        <FileInput
                            className="custom-class"
                            onChange={(e: any) => setIcon(e.target.files[0])}
                        />
                    </div>

                    <div className="mb-4">
                        <Label>Name</Label>
                        <Input
                            type="text"
                            placeholder="Meals"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <Label>Description</Label>
                        <Input
                            type="text"
                            placeholder="Meal is not included in this"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                    <Button size="sm">Save Changes</Button>
                </div>
            </form>
        </div>
    );
}
