import Input from "../../../form/input/InputField";
import Label from "../../../form/Label";
import Button from "../../../ui/button/Button";
import { useState } from "react";
import axios from "axios";
import { API_URLS } from "../../../../config/config";
import { useParams } from "react-router";


interface Props {
    data: {
        itinerary_Faq_answer: string;
        itinerary_Faq_question: string;
        itinerary_Faq_id: number;
        itinerary_Faq_creation: string;
        itinerary_id: number;
    };
}

const Editfaqmodal: React.FC<Props> = ({ data }) => {
    const token = localStorage.getItem("token");
    const { slug } = useParams();


    const [editdata, setEdit] = useState({
        answer: data.itinerary_Faq_answer,
        Question: data.itinerary_Faq_question,
    });


    const handleanswerChange = (e: any) => {
        let name = e.target.name
        setEdit({ ...editdata, [name]: e.target.value });
    };

    // Save changes API
    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {


            const payload = {
                itinerary_Faq_question: editdata.Question,
                itinerary_Faq_answer: editdata.answer,

            };

            const response = await axios.put(
                API_URLS.itinerary.Editfaq(slug, data.itinerary_Faq_id), // <-- tumhare config me update wala API hona chahiye
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 200) {
                console.log("Frequently asked questions updated successfully ✅", response.data);
            }
        } catch (error) {
            console.error("Error updating day ❌", error);
        }
    };

    return (
        <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
            <div className="px-2 pr-14">
                <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                    Edit Frequently asked questions
                </h4>
                <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
                    Update the Frequently asked questions
                </p>
            </div>

            <form className="flex flex-col" onSubmit={handleSubmit}>
                <div className="px-2 overflow-y-auto custom-scrollbar">
                    <div className="mb-4">
                        <Label>Question</Label>
                        <Input
                            type="text"
                            name="Question"
                            placeholder="We will explore monastery today"
                            value={editdata.Question}
                            onChange={handleanswerChange}
                        />

                    </div>
                    <Label>Answer</Label>
                    <Input
                        type="text"
                        name="answer"
                        placeholder="We will explore monastery today"
                        value={editdata.answer}
                        onChange={handleanswerChange}
                    />

                    <p className="text-xs mt-2">
                        Created - {data.itinerary_Faq_creation}
                    </p>
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

export default Editfaqmodal;
