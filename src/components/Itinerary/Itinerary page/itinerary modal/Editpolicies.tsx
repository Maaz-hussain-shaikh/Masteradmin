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
      ["link"],
      ["clean"],
    ],
  },
};

interface Props {
  data: {
    itinerary_bookings_terms_title: string;
    itinerary_bookings_terms_desc: string;
    itinerary_bookings_terms_id: number;
    itinerary_id: number;
    itinerary_bookings_terms_creation: string;
  };
}

const Editpolicies: React.FC<Props> = ({ data }) => {
  const token = localStorage.getItem("token");
const { slug } = useParams();
  const [content, setContent] = useState(data.itinerary_bookings_terms_desc);
  const [editdata, setEdit] = useState({
    title: data.itinerary_bookings_terms_title,
    description: data.itinerary_bookings_terms_desc,
  });

  const editorRef = useRef<any>(null);

  const handleTitleChange = (e: any) => {
    setEdit({ ...editdata, title: e.target.value });
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
        itinerary_bookings_terms_title: editdata.title,
        itinerary_bookings_terms_desc: cleanHTML,
      };

      const response = await axios.put(
        API_URLS.itinerary.Editpolicies(slug,data.itinerary_bookings_terms_id), // <-- tumhare config me update wala API hona chahiye
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("Policies updated successfully ✅", response.data);
      }
    } catch (error) {
      console.error("Error updating Policies ❌", error);
    }
  };

  return (
    <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
      <div className="px-2 pr-14">
        <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
          Edit Policies
        </h4>
        <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
          Update the Booking or cancelation Policies
        </p>
      </div>

      <form className="flex flex-col" onSubmit={handleSubmit}>
        <div className="px-2 overflow-y-auto custom-scrollbar">
          <div className="mb-4">
            <Label>Policie name</Label>
            <Input
              type="text"
              placeholder="Booking Policy"
              value={editdata.title}
              onChange={handleTitleChange}
            />
          </div>

          <ReactQuill
            ref={editorRef}
            theme="snow"
            value={content}
            onChange={setContent}
            modules={modules}
            className=""
          />

          <p className="text-xs mt-2">
            Created - {data.itinerary_bookings_terms_creation}
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

export default Editpolicies;
