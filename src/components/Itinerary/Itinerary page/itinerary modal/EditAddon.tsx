import ReactQuill from "react-quill-new";
import Input from "../../../form/input/InputField";
import Label from "../../../form/Label";
import Button from "../../../ui/button/Button";
import DOMPurify from "dompurify";
import { useRef, useState } from "react";
import axios from "axios";
import { API_URLS } from "../../../../config/config";
import { useParams } from "react-router";

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
    itinerary_addOns_title: string;
    itinerary_addOns_description: string;
    itinerary_addOns_id: number;
    itinerary_addOns_amount:number;
    itinerary_id: number;
    itinerary_addOns_creation: string;
  };
}

const EditAddon: React.FC<Props> = ({ data }) => {
  const token = localStorage.getItem("token");
const { slug } = useParams();
  const [content, setContent] = useState(data.itinerary_addOns_description);

  const [editdata, setEdit] = useState({
    title: data.itinerary_addOns_title,
    price:data.itinerary_addOns_amount,
    description: data.itinerary_addOns_description,
  });

  const editorRef = useRef<any>(null);

  const handleTitleChange = (e: any) => {
    let name=e.target.name
    setEdit({ ...editdata, [name]: e.target.value });
  };

  // Save changes API
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const cleanHTML = DOMPurify.sanitize(content, {
        ALLOWED_TAGS: [
          "h1","h2","h3","h4","h5","h6",
          "p","strong","em","u","s","span","sub","sup",
          "ul","ol","li",
          "blockquote","pre","code","div",
          "a","img","video","iframe",
          "br","hr",
          "table","thead","tbody","tr","th","td"
        ],
        ALLOWED_ATTR: [
          "href","src","alt","title","style","class",
          "width","height","frameborder","allow","allowfullscreen",
          "colspan","rowspan"
        ],
      });

      const payload = {        
        itinerary_addOns_amount: editdata.price,
        itinerary_addOns_title: editdata.title,
        itinerary_addOns_description: cleanHTML,
      };

      const response = await axios.put(
        API_URLS.itinerary.Editaddon(slug,data.itinerary_addOns_id), // <-- tumhare config me update wala API hona chahiye
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("activites updated successfully ✅", response.data);
      }
    } catch (error) {
      console.error("Error updating day ❌", error);
    }
  };

  return (
    <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
      <div className="px-2 pr-14">
        <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
          Edit Activites
        </h4>
        <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
          Update the title and description of Activites
        </p>
      </div>

      <form className="flex flex-col" onSubmit={handleSubmit}>
        <div className="px-2 overflow-y-auto custom-scrollbar">
          <div className="mb-4">
            <Label>Name of Activite</Label>
            <Input
              type="text"
              name="title"
              placeholder="We will explore monastery today"
              value={editdata.title}
              onChange={handleTitleChange}
            />
          </div>

          <Label>Price of activite</Label>
            <Input
              type="number"
              name="price"
              placeholder="We will explore monastery today"
              value={editdata.price}
              onChange={handleTitleChange}
            />

          <ReactQuill
            ref={editorRef}
            theme="snow"
            value={content}
            onChange={setContent}
            modules={modules}
            className="m-4"
          />

          <p className="text-xs mt-2">
            Created - {data.itinerary_addOns_creation}
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

export default EditAddon;
