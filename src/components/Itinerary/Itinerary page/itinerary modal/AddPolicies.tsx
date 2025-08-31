import ReactQuill from "react-quill-new";
import Input from "../../../form/input/InputField";
import Label from "../../../form/Label";
import Button from "../../../ui/button/Button";
import DOMPurify from "dompurify";
import { useRef, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { API_URLS } from "../../../../config/config";

const modules = {
  toolbar: {
    container: [
      [{ header: [1, 2, 3, false] }],
      [{ size: ["small", "medium", "large"] }],
      ["bold", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      [{ color: ["#e5e7eb", "#D97706", "#71717e"] }],
      ["link"],
      ["clean"],
    ],
  },
};

const AddPolicies = () => {
  const { slug } = useParams(); // yaha tumhare route ke param ka naam check kar lo
  const token = localStorage.getItem("token");
  const Editorname = localStorage.getItem("username");
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const editorRef = useRef<any>(null);

  // Submit handler
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      // Sanitize HTML before sending
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
        ]
      });

      const payload = {
        itinerary_id: slug,   // param id bhejna
        itinerary_bookings_terms_title: title,
        itinerary_bookings_terms_desc: cleanHTML,
        itinerary_bookings_terms_by: Editorname
      };

      const response = await axios.post(
        API_URLS.itinerary.Addnewpolicies,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      if (response.status === 200 || response.status === 201) {
        console.log("Day added successfully ✅", response.data);
      }

    } catch (error) {
      console.error("Error while creating day ❌", error);
    }
  };

  return (
    <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
      <div className="px-2 pr-14">
        <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
          Create Policies of the Itinerary
        </h4>
        <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
          Please add meta description as well
        </p>
      </div>

      <form className="flex flex-col" onSubmit={handleSubmit}>
        <div className="px-2 overflow-y-auto custom-scrollbar">
          <div className="mb-4">
            <Label>Heading of the Day</Label>
            <Input
              type="text"
              placeholder="Booking Policies"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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

export default AddPolicies;
