import Input from "../../../form/input/InputField";
import Label from "../../../form/Label";
import Button from "../../../ui/button/Button";
import { useState } from "react";
import axios from "axios";
import { API_URLS } from "../../../../config/config";



interface Props {
    batchid: number
    quadprice: number;
    doubleprice: number;
    tripleprice: number;
}

const EditBatchmodal: React.FC<Props> = ({ batchid, quadprice, doubleprice, tripleprice }) => {
    const token = localStorage.getItem("token");



    const [editdata, setEdit] = useState({
        quadprice: quadprice,
        doubleprice: doubleprice,
        tripleprice: tripleprice,
        roomcap: 4,
        availableroom: 0,
        room: 0,
        currentavailableseats: 0,
        totalseats: 0
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
                quart_sharing_rate: editdata.quadprice,
                tripal_sharing_rate: editdata.tripleprice,
                double_sharing_rate: editdata.doubleprice,
                trip_room_capicity: editdata.roomcap,
                trip_total_room_available: editdata.availableroom,
                trip_booking_sets_available: editdata.currentavailableseats,
                trip_booking_total_sets: editdata.totalseats,
                trip_total_room: editdata.room

            };

            const response = await axios.put(
                API_URLS.itinerary.Editseats(batchid), // <-- tumhare config me update wala API hona chahiye
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 200) {
                console.log("Seats updated successfully ✅", response.data);
            }
        } catch (error) {
            console.error("Error updating day ❌", error);
        }
    };

    return (
        <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
            <div className="px-2 pr-14">
                <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                    Add Batch Price
                </h4>
                <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
                    Update the Slot
                </p>
            </div>

            <form className="flex flex-col" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">

                    <div className="col-span-2 lg:col-span-1">
                        <Label>Quad Sharing</Label>
                        <Input
                            type="number"
                            name="quadprice"
                            placeholder="Please set only number digit"
                            value={editdata.quadprice}
                            onChange={handleanswerChange}
                        />
                    </div>
                    <div className="col-span-2 lg:col-span-1">
                        <Label>Triple Sharing</Label>
                        <Input
                            type="number"
                            name="tripleprice"
                            placeholder="Please set only number digit"
                            value={editdata.tripleprice}
                            onChange={handleanswerChange}
                        />
                    </div>


                    <div className="col-span-2 lg:col-span-1">
                        <Label>Double Sharing</Label>
                        <Input
                            type="number"
                            name="doubleprice"
                            placeholder="Please set only number digit"
                            value={editdata.doubleprice}
                            onChange={handleanswerChange}
                        />
                    </div>
                    <div className="col-span-2 lg:col-span-1">
                        <Label>Room Capicity</Label>
                        <Input
                            type="number"
                            name="roomcap"
                            placeholder="Please set only number digit"
                            value={editdata.roomcap}
                            onChange={handleanswerChange}
                        />
                    </div>

                    <div className="col-span-2 lg:col-span-1">
                        <Label>Total Rooms</Label>
                        <Input
                            type="number"
                            name="room"
                            placeholder="Please set only number digit"
                            value={editdata.room}
                            onChange={handleanswerChange}
                        />
                    </div>
                    <div className="col-span-2 lg:col-span-1">
                        <Label>Currently Available Room</Label>
                        <Input
                            type="number"
                            name="availableroom"
                            placeholder="Please set only number digit"
                            value={editdata.availableroom}
                            onChange={handleanswerChange}
                        />
                    </div>

                    <div className="col-span-2 lg:col-span-1">
                        <Label>Total Seats</Label>
                        <Input
                            type="number"
                            name="totalseats"
                            placeholder="Please set only number digit"
                            value={editdata.totalseats}
                            onChange={handleanswerChange}
                        />
                    </div>
                    <div className="col-span-2 lg:col-span-1">
                        <Label>Currently available seats</Label>
                        <Input
                            type="number"
                            name="currentavailableseats"
                            placeholder="Please set only number digit"
                            value={editdata.currentavailableseats}
                            onChange={handleanswerChange}
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

export default EditBatchmodal;
