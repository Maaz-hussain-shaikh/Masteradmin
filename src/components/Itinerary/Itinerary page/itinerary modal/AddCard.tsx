
import Input from "../../../form/input/InputField";
import Label from "../../../form/Label";
import Button from "../../../ui/button/Button";
import { useState } from "react";
import axios from "axios";
import { API_URLS } from "../../../../config/config";
import { useParams } from "react-router";

import Select from "../../../form/Select";
import Radio from "../../../form/input/Radio";
import FileInput from "../../../form/input/FileInput";

const options = [
    { value: "Group", label: "Group Trip" },
    { value: "Honeymoon", label: "Honeymoon Trip" },
    { value: "Backpacking", label: "Backpacking Trip" },
    { value: "Customise", label: "Customise Trip" },
    { value: "School", label: "School Trip" },
    { value: "College", label: "College Trip" },
    { value: "Treak", label: "Trek" },
    { value: "One-Day-Trip", label: "One Day Trip" },
    { value: "One-Day-Treak", label: "One Day Treak" },
];




interface Props {
    data: {
        itinerary_id: number;
        tripDuration: number;
        nameoftrip: string;
        eventoffer: string;
        quadPrice: number;

        itineraryType: string;
        country: string;
        state: string;
        city: string;
        itineraryDescription: string;
        isSpecialevent: string;
        status: string;
    };
}

const AddCard: React.FC<Props> = ({ data }) => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("username");
    const { slug } = useParams();

    const [editdata, setEdit] = useState({
        tripname: data.nameoftrip,
        tripduration: data.tripDuration,
        offer: data.eventoffer,
        mainprice: data.quadPrice,
        tag: "",
        tag2: "",
        type: data.itineraryType,
        country: data.country,
        state: data.state,
        city: data.city,
        isSpecialevent: data.isSpecialevent,
        seasonoftrip: '',
        nameofevent: '',
        status: false,
        file: null as File | null

    });



    const handleTitleChange = (e: any) => {
        setEdit({ ...editdata, [e.target.name]: e.target.value });
    };
    const handleRadioChange = (field: string, value: boolean) => {
        setEdit({
            ...editdata,
            [field]: value,   // field ko dynamically update karo
        });
    };
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setEdit((prev) => ({ ...prev, file: e.target.files![0] }));
        }
    };

    // Save changes API
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const form = new FormData();
            form.append("itinerary_id", slug ?? "");
            form.append("name_of_trip", editdata.tripname);
            form.append("duration", editdata.tripduration.toString());
            form.append("price_of_trip", editdata.mainprice.toString());
            form.append("discount", editdata.offer);
            form.append("type_of_trip", editdata.type);
            form.append("country", editdata.country);
            form.append("state", editdata.state);
            form.append("cards_Tag", editdata.tag);
            form.append("cards_Tag2", editdata.tag2);
            form.append("cards_status", editdata.status.toString());
            form.append("is_event", editdata.isSpecialevent);
            form.append("Nameofevent", editdata.nameofevent);
            form.append("seasonoftrip", editdata.seasonoftrip);
            form.append("create_by", user ?? "");
            if (editdata.file) {
                form.append("image", editdata.file);
            }
            console.log(form)
            const responce = await axios.post(API_URLS.itinerary.Addcard,

                form
                , {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    }
                })
            if (responce.status == 200) {
                alert("itinerary update sucsess")
            }
        } catch (error) {
            alert(error)

        }
    };

    return (
        <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900">
            <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white  dark:bg-gray-900 lg:p-11">
                <div className="px-2 pr-14">
                    <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                        Add Card
                    </h4>
                    <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
                        Update your details to keep your profile up-to-date.
                    </p>
                </div>
                <form className="flex flex-col" onSubmit={handleSubmit}>
                    <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
                        <div>
                            <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                                Card Information
                            </h5>

                            <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                                <div>

                                    <Label>Trip name</Label>
                                    <Input
                                        type="text"
                                        name="tripname"
                                        placeholder="Trip Name"
                                        value={editdata.tripname}
                                        onChange={handleTitleChange}
                                    />

                                </div>



                                <div>
                                    <Label>Main Price</Label>
                                    <Input
                                        type="number"
                                        name="mainprice"
                                        placeholder="Please set only number digit"
                                        value={editdata.mainprice}
                                        onChange={handleTitleChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-4">


                            <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                                <div className="col-span-2 lg:col-span-1">
                                    <Label>Duration of Trip</Label>
                                    <Input
                                        type="number"
                                        name="tripduration"
                                        placeholder="Please set only number digit"
                                        value={editdata.tripduration}
                                        onChange={handleTitleChange}
                                    />
                                </div>

                                <div className="col-span-2 lg:col-span-1">
                                    <Label>Itinerary Type</Label>
                                    <Select
                                        options={options}
                                        placeholder="Type of Trip"
                                        valueKey="value"
                                        labelKey="label"

                                        className="dark:bg-dark-900"
                                        value={editdata.type}
                                        onChange={(val) => setEdit({ ...editdata, "type": val })}
                                    />

                                </div>

                                <div className="col-span-2 lg:col-span-1">
                                    <Label>Tag 1</Label>
                                    <Input
                                        type="text"
                                        placeholder="Best seller"
                                        name="tag"
                                        value={editdata.tag}
                                        onChange={handleTitleChange}
                                    />
                                </div>

                                <div className="col-span-2 lg:col-span-1">
                                    <Label>Tag 2</Label>
                                    <Input
                                        type="text"
                                        name="tag2"
                                        placeholder="Trakking"
                                        value={editdata.tag2}
                                        onChange={handleTitleChange}
                                    />
                                </div>
                                <div className="col-span-2 lg:col-span-1">
                                    <Label>Season of trip</Label>
                                    <Input
                                        type="text"
                                        name="seasonoftrip"
                                        placeholder="sept - dec"
                                        value={editdata.seasonoftrip}
                                        onChange={handleTitleChange}
                                    />
                                </div>
                                <div className="col-span-2 lg:col-span-1">
                                    <Label>Offer Price</Label>
                                    <Input
                                        type="text"
                                        name="offer"
                                        placeholder="Please set only number digit"
                                        value={editdata.offer}
                                        onChange={handleTitleChange}
                                    />
                                </div>

                                {/* Status radios */}
                                <div className="flex flex-wrap items-center gap-8 mb-4">
                                    <Radio
                                        id="radio3"
                                        name="group2"
                                        value={true}
                                        checked={editdata.status === true}
                                        onChange={() => handleRadioChange("status", true)}
                                        label="Active"
                                    />
                                    <Radio
                                        id="radio4"
                                        name="group2"
                                        value={false}
                                        checked={editdata.status === false}
                                        onChange={() => handleRadioChange("status", false)}
                                        label="Inactive"
                                    />
                                </div>

                                {/* Special event radios */}
                                <div className="flex flex-wrap items-center gap-8 mb-4">
                                    <Radio
                                        id="radio1"
                                        name="group1"
                                        value={true}
                                        checked={editdata.isSpecialevent === true}
                                        onChange={() => handleRadioChange("isSpecialevent", true)}
                                        label="Special event"
                                    />
                                    <Radio
                                        id="radio2"
                                        name="group1"
                                        value={false}
                                        checked={editdata.isSpecialevent === false}
                                        onChange={() => handleRadioChange("isSpecialevent", false)}
                                        label="Normal trip"
                                    />
                                </div>

                            </div>
                            {
                                editdata.isSpecialevent ? <>
                                    <div>
                                        <Label>Special event Name</Label>
                                        <div className="flex gap-3">
                                            <Select
                                                options={options}
                                                placeholder="Special event"
                                                className="dark:bg-dark-900"
                                                valueKey="value"
                                                labelKey="label"
                                                value={editdata.type}
                                                onChange={handleTitleChange}
                                            />

                                        </div>
                                    </div>
                                </> : <></>
                            }

                            <Label>Icon</Label>
                            <FileInput
                                className="custom-class"
                                onChange={handleFileChange}
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



        </div>
    );
};

export default AddCard;
