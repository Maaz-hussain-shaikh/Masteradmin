import ComponentCard from "../../common/ComponentCard";
import Select from "../../form/Select";
import Label from "../../form/Label";
import TextArea from "../../form/input/TextArea";
import Input from "../../form/input/InputField";
import { useItineraryForm } from "../ItineraryContext";
import Radio from "../../form/input/Radio";

const options = [
  { value: "Personal trip", label: "Personal tripg" },
  { value: "Group trip", label: "Group trip" },
  { value: "Honeymoon Trip", label: "Honeymoon Trip" },
  { value: "One Day Treks", label: "One Day Treks" },
  { value: "International Trip", label: "International Trip" },
];

// import Dropzone from "react-dropzone";

const Formright: React.FC = () => {

  const { formData, updateForm } = useItineraryForm()

  const handleRadioChange = (value: string) => {
    updateForm("isSpecialEvent", value)
  };


  return (
    <ComponentCard title="Upload Banner and note">
      <div>
        <Label>Itinerary Note</Label>
        <TextArea
          value={formData.itineraryNote}
          onChange={(val) => updateForm("itineraryNote", val)}
          rows={3}
        />
      </div>
      <div>

        <div className="flex gap-3">
          <div>
            <Label>Main Price </Label>
            <Input
              type="number"
              name="Main price"
              placeholder="Main Price"
              value={formData.MainPrice}
              onChange={(e) => updateForm("MainPrice", e.target.value)}
            />
          </div>

          {formData.itineraryType == "Honeymoon Trip" ? <>

          </> : <>
            <div>
              <Label>Double Price </Label>
              <Input
                name="Double Price"
                type="number"
                placeholder="Double Price"
                value={formData.doublePrice}
                onChange={(e) => updateForm("doublePrice", e.target.value)}
              />
            </div>

          </>}

        </div>

      </div>
      {formData.itineraryType == "Honeymoon Trip" ? <></> : <>
        <div>
          <div className="flex gap-3">
            <div>
              <Label>Triple Price </Label>
              <Input
                type="number"
                name="Triple Price"
                placeholder="Triple Price"
                value={formData.triplePrice}
                onChange={(e) => updateForm("triplePrice", e.target.value)}

              />
            </div>

            <div>
              <Label>Quad Price </Label>
              <Input
                name="Quad price"
                type="number"
                placeholder="Quad Price"
                value={formData.quadPrice}
                onChange={(e) => updateForm("quadPrice", e.target.value)}
              />
            </div>

          </div>

        </div>
      </>}


      <div>
        <Label>Offer Price</Label>
        <Input
          type="number"
          name="Offer"
          placeholder="Offer Price"
          value={formData.offer}
          onChange={(e) => updateForm("offer", e.target.value)}

        />
      </div>
      <div>
        <div className="flex flex-wrap items-center gap-8">
          <Radio
            id="radio1"
            name="group1"
            value="Special event"
            checked={formData.isSpecialEvent === "Special event"}
            onChange={handleRadioChange}
            label="Special event"
          />
          <Radio
            id="radio2"
            name="group1"
            label="Normal trip"
            value="Normal trip"
            checked={formData.isSpecialEvent === "Normal trip"}
            onChange={handleRadioChange}
          />

        </div>
        </div>
        {
          formData.isSpecialEvent == "Special event" ? <>
            <div>
              <Label>Special event Name & Offer</Label>
              <div className="flex gap-3">
                <Select
                  options={options}
                  placeholder="Special event"
                  className="dark:bg-dark-900"
                  value={formData.EventName}
                  onChange={(val) => updateForm("EventName", val)}
                />
                <Input
                  type="Text"
                  name="Event Offer"
                  placeholder="Event Offer"
                  value={formData.eventOffer}
                  onChange={(e) => updateForm("eventOffer", e.target.value)}
                />
              </div>
            </div>
          </> : <></>
        }
        
        <div>
          <Label>Country & State </Label>
          <div className="flex gap-3">

            <Select
              options={options}
              placeholder="Country"
              className="dark:bg-dark-900"
              value={formData.country}
              onChange={(val) => updateForm("country", val)}
            />
            <Input
              type="Text"
              name="State"
              placeholder="State"
              value={formData.state}
              onChange={(e) => updateForm("state", e.target.value)}
            />
          </div>

        </div>
      
      <div>
        <Label>City</Label>
        <Input
          type="Text"
          name="City"
          value={formData.city}
          onChange={(e) => updateForm("city", e.target.value)}
          placeholder="City"
        />

      </div>
<div className="flex justify-end">
<button className="bg-orange-600 text-white ring-1 ring-inset ring-gray-300  dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300 inline-flex items-center justify-center gap-2 rounded-lg transition w-50 h-10" >
        Create Card
      </button>
</div>
      
    </ComponentCard>

  );
};

export default Formright;
