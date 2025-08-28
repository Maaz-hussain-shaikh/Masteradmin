import PageBreadcrumb from "../../common/PageBreadCrumb";
import PageMeta from "../../common/PageMeta";
import { useState, useRef, useEffect } from "react";
import ReactQuill, { Quill } from "react-quill-new";
import DOMPurify from "dompurify";
import "react-quill-new/dist/quill.snow.css";
import "./BlogContent.css"; // <-- custom CSS file import
import { useBlog } from "./BlogContext";
import { Modal } from "../../ui/modal";
import { useModal } from "../../../hooks/useModal";
import Authmodel from "./Authmodel";

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
}

export default function Blogcontent() {
  const { isOpen, openModal, closeModal } = useModal();
  const [content, setContent] = useState("");
  const [jsonData, setJsonData] = useState<BlogData | undefined>(undefined);
  const editorRef = useRef<any>(null);
  const { setMessage ,setData} = useBlog();
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
    setJsonData(payload);
    setData((prev)=>({...prev,content:JSON.stringify(payload.html)}))
    console.log(payload);
  
},[content])  
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
                dangerouslySetInnerHTML={{ __html:  jsonData.html }}
              />

            </div>
          )}
        </div>

      </div>
<Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
<Authmodel/>
</Modal>
     
    </div>
  );
}
