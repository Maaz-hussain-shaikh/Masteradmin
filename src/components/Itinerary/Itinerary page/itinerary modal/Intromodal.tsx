import ReactQuill from "react-quill-new";
import Input from "../../../form/input/InputField";
import Label from "../../../form/Label";
import Button from "../../../ui/button/Button";
import DOMPurify from "dompurify";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { API_URLS } from "../../../../config/config";
import { useParams } from "react-router";
import TextArea from "../../../form/input/TextArea";
import Select from "../../../form/Select";
import Radio from "../../../form/input/Radio";

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

const modules = {
    toolbar: {
        container: [
            [{ header: [1, 2, 3, false] }],
            [{ size: ["small", "medium", "large"] }],
            ["bold", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ align: [] }],
            [{ color: ["#000000", "#1E3A8A", "#D97706", "#047857"] }],

            ["clean"],
        ],
    },
};



interface Props {
    data: {
        itinerary_title: string;
        itinerarynote: string;
        itinerary_id: number;
        tripDuration: number;
        nameoftrip: string;
        eventoffer: string;
        quadPrice: number;
        tripalsharingPrice: number;
        doublesharingPrice: number;
        itineraryType: string;
        country: string;
        state: string;
        city: string;
        itineraryDescription: string;
        isSpecialevent: string;
    };
}

const Intromodal: React.FC<Props> = ({ data }) => {
    const token = localStorage.getItem("token");
    const { slug } = useParams();
    const [content, setContent] = useState(data.itineraryDescription);
  const [Note, setNote] = useState(data.itinerarynote);
    const [editdata, setEdit] = useState({
        tripname: data.nameoftrip,
        tripduration: data.tripDuration,
        offer: data.eventoffer,
        quadprice: data.quadPrice,
        tripleprice: data.tripalsharingPrice,
        doubleprice: data.doublesharingPrice,
        title: data.itinerary_title,
        type: data.itineraryType,
        country: data.country,
        state: data.state,
        city: data.city,
        isSpecialevent: data.isSpecialevent,
        note:'',
        discription:''

    });

    const editorRef = useRef<any>(null);

    const handleTitleChange = (e: any) => {
        setEdit({ ...editdata, [e.target.name]: e.target.value });
    };
    const handleRadioChange = (value: string) => {
        setEdit({ ...editdata, isSpecialevent: value })
    };

    useEffect(()=>{
const html = content;
    const clean = DOMPurify.sanitize(html, {
      ALLOWED_TAGS: [
        // Headings
        "h1", "h2", "h3", "h4", "h5", "h6",

        // Text formatting
        "p", "strong", "em", "u", "s", "span", "sub", "sup",

        // Lists
        "ul", "ol", "li",

        // Block elements
        "blockquote", "pre", "code", "div",

        // Links & media
        "a", "img", "video", "iframe",

        // Line breaks & rules
        "br", "hr",

        // Tables (optional)
        "table", "thead", "tbody", "tr", "th", "td"
      ],

      ALLOWED_ATTR: [
        // Common
        "href", "src", "alt", "title", "style", "class",

        // Media specific
        "width", "height", "frameborder", "allow", "allowfullscreen",

        // Table specific
        "colspan", "rowspan"
      ],
    });
    const payload = {
      html: clean,
    };
     setEdit({ ...editdata, "discription": JSON.stringify(payload.html) });
   
  
},[content]) 

useEffect(()=>{
const html = Note;
    const clean = DOMPurify.sanitize(html, {
      ALLOWED_TAGS: [
        // Headings
        "h1", "h2", "h3", "h4", "h5", "h6",

        // Text formatting
        "p", "strong", "em", "u", "s", "span", "sub", "sup",

        // Lists
        "ul", "ol", "li",

        // Block elements
        "blockquote", "pre", "code", "div",

        // Links & media
        "a", "img", "video", "iframe",

        // Line breaks & rules
        "br", "hr",

        // Tables (optional)
        "table", "thead", "tbody", "tr", "th", "td"
      ],

      ALLOWED_ATTR: [
        // Common
        "href", "src", "alt", "title", "style", "class",

        // Media specific
        "width", "height", "frameborder", "allow", "allowfullscreen",

        // Table specific
        "colspan", "rowspan"
      ],
    });
    const payload = {
      html: clean,
    };
    
    setEdit({ ...editdata, "note": JSON.stringify(payload.html) });
    
  
},[Note])
    // Save changes API
    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
      const responce = await axios.put(API_URLS.itinerary.Edititnerary(slug),
        {
          "itinerary_title": editdata.title,
          "nameoftrip": editdata.tripname,
          "tripDuration": editdata.tripduration,
          "isSpecialevent": editdata.isSpecialevent,
          "quadPrice": editdata.quadprice,
          "tripalsharingPrice": editdata.tripleprice,
          "doublesharingPrice": editdata.doubleprice,
          "itineraryType": editdata.type,
          "itineraryDescription": editdata.discription,
          "itinerarynote": editdata.note,
        }, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
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
                        Edit Personal Information
                    </h4>
                    <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
                        Update your details to keep your profile up-to-date.
                    </p>
                </div>
                <form className="flex flex-col" onSubmit={handleSubmit}>
                    <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
                        <div>
                            <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                                Social Links
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
                                        name="quadprice"
                                        placeholder="Main price"
                                        value={editdata.quadprice}
                                        
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mt-2">
                            <Label>Title of itinerary</Label>
                            <TextArea
                                placeholder="Itinerary Title"
                                
                                value={editdata.title}
                                onChange={(val)=>{ setEdit({ ...editdata, "title": val });}}
                                rows={2}
                            />
                        </div>
                        <div className="mt-2">
                            <Label>Meta discription for SEO</Label>
                            <TextArea
                                placeholder="Itinerary Title"
                                value='need to add ion backend'
                                
                                rows={2}
                            />
                        </div>
                        <div className="mt-4">
                            <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-4">
                                Discription & Note
                            </h5>
                            <div className="col-span-2 mb-2">
                                <Label>Discription</Label>
                                <ReactQuill
                                    ref={editorRef}
                                    theme="snow"
                                    value={content}
                                    onChange={setContent}
                                    modules={modules}
                                    className=""
                                />
                            </div>
                            <div className="col-span-2 mb-2">
                                <Label>Note</Label>
                                <ReactQuill
                                    ref={editorRef}
                                    theme="snow"
                                    value={Note}
                                    onChange={setNote}
                                    modules={modules}
                                    className=""
                                />
                            </div>
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
                                        onChange={(val) => setEdit({...editdata,"type": val})}
                                    />

                                </div>

                                <div className="col-span-2 lg:col-span-1">
                                    <Label>Double Sharing</Label>
                                    <Input
                                        type="number"
                                        placeholder="Please set only number digit"
                                        name="doubleprice"
                                        value={editdata.doubleprice}
                                        onChange={handleTitleChange}
                                    />
                                </div>

                                <div className="col-span-2 lg:col-span-1">
                                    <Label>Triple Sharing</Label>
                                    <Input
                                        type="number"
                                        name="tripleprice"
                                        placeholder="Please set only number digit"
                                        value={editdata.tripleprice}
                                        onChange={handleTitleChange}
                                    />
                                </div>
                                <div className="col-span-2 lg:col-span-1">
                                    <Label>Quad Sharing</Label>
                                    <Input
                                        type="number"
                                        name="quadprice"
                                        placeholder="Please set only number digit"
                                        value={editdata.quadprice}
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

                                <div className="flex flex-wrap items-center gap-8 mb-4">
                                    <Radio
                                        id="radio1"
                                        name="group1"
                                        value={true}
                                        checked={editdata.isSpecialevent == "true"}
                                        onChange={handleRadioChange}
                                        label="Special event"
                                    />
                                    <Radio
                                        id="radio2"
                                        name="group1"
                                        label="Normal trip"
                                        value={false}
                                        checked={editdata.isSpecialevent == "false"}
                                        onChange={handleRadioChange}
                                    />

                                </div>
                            </div>
                            {
                                editdata.isSpecialevent ? <>
                                    <div>
                                        <Label>Special event Name & Offer</Label>
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
                                            <Input
                                                type="text"
                                                placeholder="Please set only number digit"
                                                value={editdata.offer}
                                                onChange={handleTitleChange}
                                            />
                                        </div>
                                    </div>
                                </> : <></>
                            }


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

export default Intromodal;
