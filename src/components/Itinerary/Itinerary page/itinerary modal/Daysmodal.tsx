import ReactQuill from "react-quill-new";
import Input from "../../../form/input/InputField";
import Label from "../../../form/Label";
import Button from "../../../ui/button/Button";
import { useRef, useState } from "react";

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

export default function Daysmodal() {
    const [content, setContent] = useState("");
    const editorRef = useRef<any>(null);
    return (<>
        <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">


            <div className="px-2 pr-14">
                <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                    Add Days Schedule
                </h4>
                <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
                    Please add meta discription as well
                </p>
            </div>
            <form className="flex flex-col">
                <div className="px-2 overflow-y-auto custom-scrollbar">
                   
                        <div className="mb-4">
                            <Label>Heading of the Day</Label>
                            <Input type="text" placeholder="We will explore monestry today"
                                value='' />
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

    </>)
}