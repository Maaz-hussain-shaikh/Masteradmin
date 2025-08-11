import ComponentCard from "../common/ComponentCard";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import TextArea from "../form/input/TextArea";
import { UserCircleIcon } from "../../icons";
import Select from "../form/Select";
import MultiSelect from "../form/MultiSelect";
import Radio from "../form/input/Radio";
import { useBlog } from "./BlogContext";

export default function Createblog() {
 const { blogdata, setData } = useBlog();
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRadioChange = (value: string) => {
    setData((prev) => ({
      ...prev,
      region: value,
    }));
  };

  const options = [
    { value: "Personal trip", label: "Personal tripg" },
    { value: "Group trip", label: "Group trip" },
    { value: "Honeymoon Trip", label: "Honeymoon Trip" },
    { value: "One Day Treks", label: "One Day Treks" },
    { value: "International Trip", label: "International Trip" },
  ];
 
  return (
    <ComponentCard title="Blog Details">
      <div className="space-y-6">
        <div>
          <Label>Writer Name</Label>
          <div className="relative">
            <Input
              placeholder="Full Name"
              type="text"
              name="name"
              value={blogdata.name}
              onChange={handleChange}
              className="pl-[62px]"
            />
            <span className="absolute left-0 top-1/2 -translate-y-1/2 border-r border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
              <UserCircleIcon className="size-6" />

            </span>
          </div>
        </div>
        <div>
          <Label>Tital of Blog</Label>
          <TextArea
            value={blogdata.title}
            onChange={(val) => setData(prev => ({ ...prev, title: val }))}
            rows={3}
          />
        </div>
        <div>
          <Label>Type of Trip</Label>
          <Select
            options={options}
            value={blogdata.type}
            placeholder="Type of Trip"
            onChange={(val) => setData((prev) => ({ ...prev, type: val }))}
            className="dark:bg-dark-900"
          />
        </div>
        <div>
          <Label>Destination Name & Sate</Label>
          <div className="flex gap-3">
            <Input
              type="text"
              name="destinationName"
              value={blogdata.destinationName}
              placeholder="Destination"
              onChange={handleChange}
            />
            <Input
              name="state"
              type="text"
              value={blogdata.state}
              placeholder="State"
              onChange={handleChange}
            />
          </div>

        </div>
        <div>
          <Label>Country & Reading Time </Label>
          <div className="flex gap-3">

            <Select
              options={options}
              placeholder="Country"
              value={blogdata.country}
              onChange={(val) => setData((prev) => ({ ...prev, country: val }))}
              className="dark:bg-dark-900"
            />
            <Input
              type="Text"
              name="time"
              value={blogdata.time}
              onChange={handleChange}
              placeholder="5 min"
            />
          </div>

        </div>
        <div className="flex flex-wrap items-center gap-8">
          <Radio
            id="radio1"
            name="group1"
            value="International"
            checked={blogdata.region === "International"}
            onChange={handleRadioChange}
            label="International"
          />
          <Radio
            id="radio2"
            name="group1"
            value="India"
            checked={blogdata.region === "India"}
            onChange={handleRadioChange}
            label="India"
          />

        </div>
        <div>
          <MultiSelect
            value={blogdata.seotag}
            onChange={(tags) =>
              setData((prev) => ({
                ...prev,
                seotag: tags, // Directly blogdata.seotag में update
              }))
            }
          />

        </div>






      </div>
    </ComponentCard>



  );
}
