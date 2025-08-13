import PageBreadcrumb from "../common/PageBreadCrumb";
import PageMeta from "../common/PageMeta";
import { useState, useRef } from "react";
import ReactQuill, { Quill } from "react-quill-new";
import DOMPurify from "dompurify";
import "react-quill-new/dist/quill.snow.css";
import "./BlogContent.css"; // <-- custom CSS file import
import { useBlog } from "./BlogContext";
import { Modal } from "../ui/modal";
import { useModal } from "../../hooks/useModal";
import Label from "../form/Label";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import axios from "axios";
// --------- register custom sizes/colors ----------
const Size = Quill.import("formats/size") as any;
Size.whitelist = ["small", "medium", "large"];

const Color = Quill.import("formats/color") as any;
Color.whitelist = ["#000000", "#1E3A8A", "#D97706", "#047857"];

Quill.register(
  {
    "formats/size": Size,
    "formats/color": Color,
  },
  true
);

function imageHandler(this: any) {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.click();
  input.onchange = async () => {
    const file = input.files?.[0];
    if (!file) return;
    const form = new FormData();
    form.append("file", file);
    form.append("upload_preset", "travelltechblog");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dukwedd9l/image/upload",
        { method: "POST", body: form }
      );
      const data = await res.json();
      const quill = this.quill;
      const range = quill.getSelection();
      quill.insertEmbed(range.index, "image", data.secure_url);
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };
}

const modules = {
  toolbar: {
    container: [
      [{ header: [1, 2, 3, false] }],
      [{ size: ["small", "medium", "large"] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      [{ color: ["#000000", "#1E3A8A", "#D97706", "#047857"] }],
      ["link", "image", "code-block"],
      ["clean"],
    ],
    handlers: { image: imageHandler },
  },
};

interface BlogData {
  html: string;
  timestamp: number;
}

export default function Blogcontent() {
  const { isOpen, openModal, closeModal } = useModal();
  const [content, setContent] = useState("");
  const [apdata, setapdata] = useState({
    name:"",
    password:""
  });
  const [jsonData, setJsonData] = useState<BlogData | undefined>(undefined);
  const editorRef = useRef<any>(null);
  const { setMessage } = useBlog();

  const handleSave = () => {
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
      timestamp: Date.now(),
    };
    setJsonData(payload);
    console.log(payload);
  };

  const handleSaveblog = async (e:any) => {
          e.preventDefault();
          const URL = "https://traveltechbackend.vercel.app/traveltech/api/login";
          try {
              const response = await axios.post(URL, {
                  email: apdata.name,
                  password: apdata.password
              });
  
              // Agar success ho
              if (response.data.success) {
                 const {token}= response.data
                 setapdata((prev)=>({...prev,name:"",password:""}))
                  console.log(token)
              } else {
                 alert("kuch gadbad hai bro")
              }
          } catch (error) {
              console.error('Login error:', error);
              
          }
      };
  return (
    <div>
      <PageMeta
        title="React.js Blank Dashboard | TailAdmin"
        description="This is React.js Blank Dashboard page"
      />
      <PageBreadcrumb pageTitle="Create Blog Content" />
      <div className="min-h-screen bg-gray-50">
        <div className="min-h-screen bg-gray-100">

          <div className="max-w-4xl mx-auto bg-white p-8 rounded-md shadow-lg">
            <div className="flex justify-between mb-4">
              <h1 className="text-3xl font-bold ">Write Your Blog </h1>
              <button
                onClick={openModal}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-orange-600 shadow-theme-xs hover:bg-gray-300 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-orange-600 dark:hover:bg-gray/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
              >Upload Blog</button>
            </div>


            <ReactQuill
              ref={editorRef}
              theme="snow"
              value={content}
              onChange={setContent}
              modules={modules}
              className="min-h-[400px] mb-6"
            />
            <button
              onClick={handleSave}
              className="px-5 py-3 bg-orange-600 text-white rounded-md hover:bg-gray-300 hover:text-orange-600"
            >
              Preview
            </button>
            <button
              onClick={() => { setMessage("") }}
              className="px-5 py-3 ml-4 bg-orange-600 text-white rounded-md hover:bg-gray-300 hover:text-orange-600"
            >
              Go back
            </button>
          </div>

          {jsonData && (
            <div className="ql-snow">
              <div
                className="ql-editor"
                dangerouslySetInnerHTML={{ __html: jsonData.html }}
              />

            </div>
          )}
        </div>

      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Access Verification
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Update your details to keep your profile up-to-date.
            </p>
          </div>
          <form className="flex flex-col" onSubmit={handleSaveblog}>
            <div className="px-2 overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                <div>
                  <Label>Approval key</Label>
                  <Input type="text" placeholder="Approval key"
                  value={apdata.name}  onChange={(e)=>{setapdata((prev)=>({...prev,name:e.target.value}))}}/>
                </div>
                <div>
                  <Label>Password</Label>
                  <Input type="Password" placeholder="Password" value={apdata.password}  onChange={(e)=>{setapdata((prev)=>({...prev,password:e.target.value}))}}/>
                </div>


              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModal}>
                Close
              </Button>
              <Button size="sm">
                Upload Blog
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
