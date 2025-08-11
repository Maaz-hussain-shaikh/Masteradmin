import PageBreadcrumb from "../common/PageBreadCrumb";
import PageMeta from "../common/PageMeta";
import { useState, useRef } from 'react';
import ReactQuill,{ Quill } from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';



// --------- register custom sizes/colors safely ----------
const Size = Quill.import("formats/size") as any;
Size.whitelist = ["small", "medium", "large"];

const Color = Quill.import("formats/color") as any;
Color.whitelist = ["#000000", "#1E3A8A", "#D97706", "#047857"];

// Register by passing an object (matches the TypeScript overload)
Quill.register(
  {
    "formats/size": Size,
    "formats/color": Color,
  },
  true
);


function imageHandler(this: any) {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.click();
  input.onchange = async () => {
    const file = input.files?.[0];
    if (!file) return;
    const form = new FormData();
    form.append('file', file);
    form.append('upload_preset', 'travelltechblog');

    try {
      const res = await fetch('https://api.cloudinary.com/v1_1/dukwedd9l/image/upload', { method: 'POST', body: form });
      const data = await res.json();
      const quill = this.quill;
      const range = quill.getSelection();
      quill.insertEmbed(range.index, 'image', data.secure_url);
    } catch (err) {
      console.error('Upload failed:', err);
    }
  };
}

const modules = {
  toolbar: {
    container: [
      [{ header: [1, 2, 3, false] }],
      [{ size: ['small', 'medium', 'large'] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ align: [] }],
      [{ color: ['#000000', '#1E3A8A', '#D97706', '#047857'] }],
      ['link', 'image', 'code-block'],
      ['clean'],
    ],
    handlers: { image: imageHandler },
  },
};
interface BlogData {
  html: string;
  timestamp: number;
}

export default function Blogcontent() {
    const [content, setContent] = useState('');
  const [jsonData, setJsonData] = useState<BlogData | undefined>(undefined);
  const editorRef = useRef<any>(null);

  const handleSave = () => {
    const html = content;
    const payload = {
      html,
      timestamp: Date.now(),
    };
    setJsonData(payload);
    console.log(payload);
  };
    return (
        <div>
            <PageMeta
                title="React.js Blank Dashboard | TailAdmin - Next.js Admin Dashboard Template"
                description="This is React.js Blank Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
            />
            <PageBreadcrumb pageTitle="Create Bloge Content" />
            <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-md shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Write Your Blog</h1>
        <ReactQuill
          ref={editorRef}
          theme="snow"
          value={content}
          onChange={setContent}
          modules={modules}
          className="min-h-[400px] mb-6"
        />
        <button onClick={handleSave} className="px-5 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Save JSON
        </button>
      </div>
      {jsonData && (
        <pre className="max-w-4xl mx-auto mt-6 p-4 bg-gray-50 rounded-md overflow-x-auto">
          {JSON.stringify(jsonData, null, 2)}
        </pre>
      )}
    </div>
    </div>
        </div>
    );
}
