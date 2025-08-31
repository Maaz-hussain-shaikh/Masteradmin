import ComponentCard from "../../common/ComponentCard";
import Select from "../../form/Select";
import Label from "../../form/Label";
import Input from "../../form/input/InputField";
import { useItineraryForm } from "../ItineraryContext";
import Radio from "../../form/input/Radio";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URLS } from "../../../config/config";

const options = [
  { value: "Personal trip", label: "Personal tripg" },
  { value: "Group trip", label: "Group trip" },
  { value: "Honeymoon Trip", label: "Honeymoon Trip" },
  { value: "One Day Treks", label: "One Day Treks" },
  { value: "International Trip", label: "International Trip" },
];


// import Dropzone from "react-dropzone";

const Formright: React.FC = () => {
  const [country, setcountry] = useState([]);
  const token = localStorage.getItem("token")
  const [state, setstate] = useState([]);
  const [city, setcity] = useState([]);
  const { formData, updateForm } = useItineraryForm()

  const handleRadioChange = (value: string) => {
    updateForm("isSpecialEvent", value)
  };

  useEffect(() => {
    const fetchcountry = async () => {

      try {
        const res = await axios.get(API_URLS.itinerary.fetchcountry, {
          headers: {
            Authorization: `Bearer ${token}`, // token pass karna
            "Content-Type": "application/json",
          },
        });

        if (res.status === 200) {
          setcountry(res.data.data);


        } else {
          console.log("Something is not good");
        }
      } catch (err: any) {
        alert(err.message || "Something went wrong");
      }
    };

    fetchcountry();

  }, []);

  useEffect(() => {
    const fetchstate = async () => {

      try {
        const res = await axios.post(API_URLS.itinerary.fetchstate, {
          "countryID": formData.country.countryCode
        }, {
          headers: {
            Authorization: `Bearer ${token}`, // token pass karna
            "Content-Type": "application/json",
          },
        });

        if (res.status === 200) {
          setstate(res.data.data);


        } else {
          console.log("Something is not good");
        }
      } catch (err: any) {
        alert(err.message || "Something went wrong");
      }
    };

    fetchstate();

  }, [formData.country]);

  useEffect(() => {
    const fetchstate = async () => {

      try {
        const res = await axios.post(API_URLS.itinerary.fetchcity, {
          "countryID": formData.country.countryCode,
          "stateID": formData.state.stateID
        }, {
          headers: {
            Authorization: `Bearer ${token}`, // token pass karna
            "Content-Type": "application/json",
          },
        });

        if (res.status === 200) {
          setcity(res.data.data);


        } else {
          console.log("Something is not good");
        }
      } catch (err: any) {
        alert(err.message || "Something went wrong");
      }
    };

    fetchstate();

  }, [formData.state]);

  return (
    <ComponentCard title="Upload Banner and note">

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
          <div>
            <Label>Duration</Label>
            <div className="flex gap-3">
              <Input
                name="state"
                type="text"
                placeholder="Duration of trip"
                value={formData.tripDuration}
                onChange={(e) => updateForm("tripDuration", e.target.value)}
              />
            </div>
          </div>
          <div>
            <Label>Type of Trip</Label>
            <Select
              options={country}
              placeholder="Type of Trip"
              valueKey="value"
              labelKey="label"
              className="dark:bg-dark-900"
              value={formData.itineraryType}
              onChange={(val) => updateForm("itineraryType", val)}
            />

          </div>
        </div>

      </div>
      {formData.itineraryType == "Honeymoon Trip" ? <></> : <>
        <div>
          <div className="flex gap-3">
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
                valueKey="value"
                labelKey="label"
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
        <div className="flex gap-3 ">
          <div className="relative" style={{ width: "-webkit-fill-available" }}>
            <Select
              options={country}           // [{ countryCode: "IN", name: "India" }, ...]
              valueKey="countryCode"
              labelKey="name"
              className="pl-[60px]"
              value={formData.country?.name}
              onChange={(val) => {
                const selectedObj = country.find((c: any) => c.countryCode === val);
                updateForm("country", selectedObj); // { countryCode: "IN", name: "India" }
              }}
            />
            <span className="absolute left-0 top-1/2 -translate-y-1/2 border-r border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
              {formData.country.countryCode?<>{formData.country.countryCode}</>:<>IND</>}

            </span>

          </div>


          <Select
            options={state}
            placeholder="State"
            className="dark:bg-dark-900"
            valueKey="stateID"
            labelKey="stateName"
            value={formData.state?.stateName?? ""}
            onChange={(val) => {
              const selectedObj = state.find((s: any) => s.stateID == val);
              updateForm("state", selectedObj);
            }}
          />
        </div>

      </div>
      <Select
        options={city}
        placeholder="City"
        className="dark:bg-dark-900"
        valueKey="cityID"
        labelKey="cityName"
        value={formData.city?.cityName}
        onChange={(val) => {
              const selectedObj = city.find((s: any) => s.cityID == val);
              updateForm("city", selectedObj);
            }}
      />

      <div className="flex justify-end">
        <button className="bg-orange-600 text-white ring-1 ring-inset ring-gray-300  dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300 inline-flex items-center justify-center gap-2 rounded-lg transition w-50 h-10" onClick={() => { console.log(formData) }} >
          Create Card
        </button>
      </div>

    </ComponentCard>

  );
};

export default Formright;
