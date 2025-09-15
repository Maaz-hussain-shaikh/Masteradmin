import ComponentCard from "../../common/ComponentCard";
import Label from "../../form/Label";
import Input from "../../form/input/InputField";
import TextArea from "../../form/input/TextArea";
import { UserCircleIcon } from "../../../icons";
import { useItineraryForm } from "../ItineraryContext";
import ReactQuill from "react-quill-new";
import { useEffect, useRef, useState } from "react";
import DOMPurify from "dompurify";

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

export default function Itiform() {
  const { formData, updateForm } = useItineraryForm();
  const [content, setContent] = useState('');
  const [Note, setNote] = useState('');
const editorRef = useRef<any>(null);
  

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
    
    updateForm("itineraryDescription",JSON.stringify(payload.html));
  
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
    
    updateForm("itineraryNote",JSON.stringify(payload.html));
    
  
},[Note])



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
          <ReactQuill
                      ref={editorRef}
                      theme="snow"
                      value={content}
                      onChange={setContent}
                      modules={modules}
                      className=""
                    />
        </div>
        
       <div>
        <Label>Itinerary Note</Label>
        <ReactQuill
                      ref={editorRef}
                      theme="snow"
                      value={Note}
                      onChange={setNote}
                      modules={modules}
                      className=""
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