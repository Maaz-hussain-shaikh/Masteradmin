import ComponentCard from "../../common/ComponentCard";
import Label from "../../form/Label";
import Input from "../../form/input/InputField";
import TextArea from "../../form/input/TextArea";
import { UserCircleIcon } from "../../../icons";
import { useItineraryForm } from "../ItineraryContext";



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
        <Label>Itinerary Note</Label>
        <TextArea
          value={formData.itineraryNote}
          onChange={(val) => updateForm("itineraryNote", val)}
          rows={3}
        />
      </div>  
          
        <div>
          <Label>Meta Discription</Label>
          <TextArea
            value={formData.metadis}
            rows={3}
            onChange={(val) => updateForm("metadis", val)}
          />
        </div>
      </div>
    </ComponentCard>

  </>)
}