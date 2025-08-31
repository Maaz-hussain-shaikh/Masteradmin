import React, { useState } from "react";
import FileInput from "../../../form/input/FileInput";
import Input from "../../../form/input/InputField";
import Label from "../../../form/Label";
import Button from "../../../ui/button/Button";
import axios from "axios";
import { API_URLS } from "../../../../config/config";
import { useParams } from "react-router";

type InclusionType = {
    thingstoget_id: number;
    thingstoget_name: string;
    thingstoget_title: string;
    thingstoget_description: string;
    image?: string; // optional
};

type Props = {
    data: InclusionType;
};

const Editthingstotake: React.FC<Props> = ({ data }) => {
    const token = localStorage.getItem("token");
    const { slug } = useParams()
    const [formData, setFormData] = useState({
        title: data.thingstoget_title || "",
        description: data.thingstoget_description || "",
        file: null as File | null,
    });

    // handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // handle file upload
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData((prev) => ({ ...prev, file: e.target.files![0] }));
        }
    };

    // handle form submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try { 
            const form = new FormData();
            form.append("thingstoget_name", "name");
            form.append("thingstoget_title", formData.title);
            form.append("thingstoget_description", formData.description);

            if (formData.file) {
                form.append("image", formData.file);
            }

            const res = await axios.put(API_URLS.itinerary.Updatethingstotake(slug, data.thingstoget_id), form, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            if (res.status === 200) {
                console.log("✅ Things to take updated successfully", res.data);
            }
        } catch (error) {
            console.error("❌ Error updating inclusion:", error);
        }
    };

    return (
        <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
            <div className="px-2 pr-14">
                <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                    Edit Things To Take
                </h4>
            </div>

            {/* Form */}
            <form className="flex flex-col mt-2" onSubmit={handleSubmit}>
                <div className="px-2 overflow-y-auto custom-scrollbar">
                    <div className="mb-4">
                        <Label>Icon</Label>
                        <FileInput
                            className="custom-class"
                            onChange={handleFileChange}
                        />
                    </div>

                    <div className="mb-4">
                        <Label>Name</Label>
                        <Input
                            type="text"
                            name="title"
                            placeholder="Meals"
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-4">
                        <Label>Description</Label>
                        <Input
                            type="text"
                            name="description"
                            placeholder="Meal is not included in this"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>
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

export default Editthingstotake;
