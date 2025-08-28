import ComponentCard from "../../common/ComponentCard";
import Label from "../../form/Label";
import Input from "../../form/input/InputField";
import TextArea from "../../form/input/TextArea";
import { UserCircleIcon } from "../../../icons";
import Select from "../../form/Select";
import { useItineraryForm } from "../ItineraryContext";


const options = [
  { value: "Personal trip", label: "Personal tripg" },
  { value: "Group trip", label: "Group trip" },
  { value: "Honeymoon Trip", label: "Honeymoon Trip" },
  { value: "One Day Treks", label: "One Day Treks" },
  { value: "International Trip", label: "International Trip" },
];



export default function Itiform() {
  const { formData, updateForm } = useItineraryForm();

  
  return (<>

    <ComponentCard title="Itinerary Details">
      <div className="space-y-6">
        <div>
          <Label>Trip Name</Label>
          <div className="relative">
            <Input

              type="text"
              placeholder="Name of Trip"
              value={formData.nameOfTrip}
              onChange={(e) => updateForm("nameOfTrip", e.target.value)}
              className="pl-[62px]"
            />
            <span className="absolute left-0 top-1/2 -translate-y-1/2 border-r border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
              <UserCircleIcon className="size-6" />

            </span>
          </div>
        </div>
        <div>
          <Label>Tital of Itinerary</Label>
          <TextArea
            placeholder="Itinerary Title"
            value={formData.itineraryTitle}
            onChange={(val) => updateForm("itineraryTitle", val)}
            rows={3}
          />
        </div>
        <div>
          <Label>Trip Discription</Label>
          <TextArea
            value={formData.itineraryDescription}
            rows={3}
            onChange={(val) => updateForm("itineraryDescription", val)}
          />
        </div>
        <div>
          <Label>Meta Discription</Label>
          <TextArea
            value=""
            rows={3}
          />
        </div>
        <div>
          <Label>Type of Trip</Label>
          <Select
            options={options}
            placeholder="Type of Trip"
            className="dark:bg-dark-900"
             value={formData.itineraryType}
              onChange={(val) => updateForm("itineraryType",val)}
          />
        </div>
        <div>
          <Label>Destination Name & Duration</Label>
          <div className="flex gap-3">
            <Input
              type="text"
              placeholder="Name of Trip"
              value={formData.nameOfTrip}
              onChange={(e) => updateForm("nameOfTrip", e.target.value)}

            />
            <Input
              name="state"
              type="text"
              placeholder="Duration of trip"
              value={formData.tripDuration}
              onChange={(e) => updateForm("tripDuration", e.target.value)}
            />
          </div>

        </div>
       
        
      </div>
    </ComponentCard>

  </>)
}