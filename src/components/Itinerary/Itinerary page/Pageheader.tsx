import axios from "axios";
import { useDropzone } from "react-dropzone";
import { API_URLS } from "../../../config/config";
import { useParams } from "react-router";
import { PencilIcon, TrashBinIcon } from "../../../icons";
import { Modal } from "../../ui/modal";
import { useModal } from "../../../hooks/useModal";
import { useState } from "react";
import Editimagemodal from "./itinerary modal/Editimagemodal";

interface Props {
  data: any[];
}

const Pageheader: React.FC<Props> = ({ data }) => {
  const { slug } = useParams()
  const [edit, setedit] = useState<any | null>(null);
  const [form, setform] = useState("Add")
  const { isOpen, openModal, closeModal } = useModal();
  const username = localStorage.getItem("username")
  const token = localStorage.getItem("token")
  // ek hi handler banaya, section name pass karenge
  const handleDrop = async (acceptedFiles: File[], section: string) => {

    const file = acceptedFiles[0];

    let formData = new FormData()
    formData.append("itinerary_id", slug ?? "");
    formData.append("itinerary_Images_parameter", section);
    formData.append("itinerary_Images_discription", "");
    formData.append("itinerary_Images_title", section);
    formData.append("image", file);
    formData.append("itinerary_Images_createdby", username ?? "");
    try {
      const responce = await axios.post(API_URLS.itinerary.additineraryimg, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      if (responce.status == 201) {
        console.log(responce)
      }
    } catch (error) {

    }

    console.log("Uploaded file for:", section, file);
    // yaha api call bhi kar sakte ho with `section` info
  };

  // Header1 ke liye dropzone
  const dropzoneHeader1 = useDropzone({
    onDrop: (files) => handleDrop(files, "headerImg1"),
    accept: {
      "image/png": [],
      "image/jpeg": [],
      "image/webp": [],
      "image/svg+xml": [],
    },
  });

  // Header2 ke liye dropzone
  const dropzoneHeader2 = useDropzone({
    onDrop: (files) => handleDrop(files, "headerImg2"),
    accept: {
      "image/png": [],
      "image/jpeg": [],
      "image/webp": [],
      "image/svg+xml": [],
    },
  });

  // Header3 ke liye dropzone
  const dropzoneHeader3 = useDropzone({
    onDrop: (files) => handleDrop(files, "headerImg3"),
    accept: {
      "image/png": [],
      "image/jpeg": [],
      "image/webp": [],
      "image/svg+xml": [],
    },
  });

  const Header1 = data.find((elm) => elm.itinerary_Images_parameter === "headerImg1");
  const Header2 = data.find((elm) => elm.itinerary_Images_parameter === "headerImg2");
  const Header3 = data.find((elm) => elm.itinerary_Images_parameter === "headerImg3");

  const handleDelete = async (id: any) => {
        try {
            const response = await axios.delete(
                API_URLS.itinerary.Deleteimage(slug, id),
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 200 || response.status === 204) {
                console.log("image deleted successfully ✅");
                // yaha tu state update kar de (days list se delete karna)
            } else {
                console.warn("Unexpected response:", response);
            }
        } catch (error: any) {
            console.error("Error deleting day ❌", error?.response?.data || error.message);
        }
    };

  return (<>
  
    <div className="sm:block relative w-full aspect-[2.3/1]">
      <div className="absolute inset-0 grid grid-cols-3 gap-2">
        {/* ---------- Left Top Image ---------- */}
        <div className="relative col-span-1 row-span-1">
          {Header1 ? (
            <>
              <div className="relative">
                <div className="absolute  right-3 top-2 flex gap-3"><div className="text-xl p-2 rounded-full bg-white text-orange-600 coursor-pointer" onClick={()=>{handleDelete(Header1.itinerary_Images_id)}}>
                  <TrashBinIcon />
                  </div><div className="text-xl p-2 rounded-full bg-gray-300 bg-white text-orange-600" onClick={()=>{setedit(Header1); openModal(); setform("Edit")}}>
                    <PencilIcon/>
                    </div> </div>
                <img
                  src={Header1.itinerary_Images}
                  alt="Left Bottom"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

            </>

          ) : (
            <form {...dropzoneHeader1.getRootProps()} className="flex items-center justify-center w-full h-full border-2 border-dashed rounded-lg text-gray-400">
              <div className="dz-message flex flex-col items-center m-0!">
                {/* Icon Container */}

                <div className="flex h-[58px] w-[58px]  items-center justify-center rounded-full bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-400">
                  <svg
                    className="fill-current"
                    width="29"
                    height="28"
                    viewBox="0 0 29 28"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M14.5019 3.91699C14.2852 3.91699 14.0899 4.00891 13.953 4.15589L8.57363 9.53186C8.28065 9.82466 8.2805 10.2995 8.5733 10.5925C8.8661 10.8855 9.34097 10.8857 9.63396 10.5929L13.7519 6.47752V18.667C13.7519 19.0812 14.0877 19.417 14.5019 19.417C14.9161 19.417 15.2519 19.0812 15.2519 18.667V6.48234L19.3653 10.5929C19.6583 10.8857 20.1332 10.8855 20.426 10.5925C20.7188 10.2995 20.7186 9.82463 20.4256 9.53184L15.0838 4.19378C14.9463 4.02488 14.7367 3.91699 14.5019 3.91699ZM5.91626 18.667C5.91626 18.2528 5.58047 17.917 5.16626 17.917C4.75205 17.917 4.41626 18.2528 4.41626 18.667V21.8337C4.41626 23.0763 5.42362 24.0837 6.66626 24.0837H22.3339C23.5766 24.0837 24.5839 23.0763 24.5839 21.8337V18.667C24.5839 18.2528 24.2482 17.917 23.8339 17.917C23.4197 17.917 23.0839 18.2528 23.0839 18.667V21.8337C23.0839 22.2479 22.7482 22.5837 22.3339 22.5837H6.66626C6.25205 22.5837 5.91626 22.2479 5.91626 21.8337V18.667Z"
                    />
                  </svg>
                </div>
              </div>

              {/* Text Content */}
              <h4 className="ml-4 font-semibold text-orange-600 text-theme-xl dark:text-white/90 ">
                Drag & Drop Files Here
              </h4>
              <input {...dropzoneHeader1.getInputProps()} />
            </form>
          )}
        </div>

        {/* ---------- Left Bottom Image ---------- */}
        <div className="relative col-span-1 row-span-1">
          {Header2 ? (
            <>
              <div className="relative">
                <div className="absolute  right-3 top-2 flex gap-3"><div className="text-xl p-2 rounded-full bg-white text-orange-600" onClick={()=>{handleDelete(Header2.itinerary_Images_id)}}>
                  <TrashBinIcon />
                  </div><div className="text-xl p-2 rounded-full bg-gray-300 bg-white text-orange-600" onClick={()=>{setedit(Header2); openModal(); setform("Edit")}}>
                    <PencilIcon/>
                    </div> </div>
                <img
                  src={Header2.itinerary_Images}
                  alt="Left Bottom"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

            </>

          ) : (
            <form {...dropzoneHeader2.getRootProps()} className="flex items-center justify-center w-full h-full border-2 border-dashed rounded-lg text-gray-400">
              <div className="dz-message flex flex-col items-center m-0!">
                {/* Icon Container */}

                <div className="flex h-[58px] w-[58px]  items-center justify-center rounded-full bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-400">
                  <svg
                    className="fill-current"
                    width="29"
                    height="28"
                    viewBox="0 0 29 28"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M14.5019 3.91699C14.2852 3.91699 14.0899 4.00891 13.953 4.15589L8.57363 9.53186C8.28065 9.82466 8.2805 10.2995 8.5733 10.5925C8.8661 10.8855 9.34097 10.8857 9.63396 10.5929L13.7519 6.47752V18.667C13.7519 19.0812 14.0877 19.417 14.5019 19.417C14.9161 19.417 15.2519 19.0812 15.2519 18.667V6.48234L19.3653 10.5929C19.6583 10.8857 20.1332 10.8855 20.426 10.5925C20.7188 10.2995 20.7186 9.82463 20.4256 9.53184L15.0838 4.19378C14.9463 4.02488 14.7367 3.91699 14.5019 3.91699ZM5.91626 18.667C5.91626 18.2528 5.58047 17.917 5.16626 17.917C4.75205 17.917 4.41626 18.2528 4.41626 18.667V21.8337C4.41626 23.0763 5.42362 24.0837 6.66626 24.0837H22.3339C23.5766 24.0837 24.5839 23.0763 24.5839 21.8337V18.667C24.5839 18.2528 24.2482 17.917 23.8339 17.917C23.4197 17.917 23.0839 18.2528 23.0839 18.667V21.8337C23.0839 22.2479 22.7482 22.5837 22.3339 22.5837H6.66626C6.25205 22.5837 5.91626 22.2479 5.91626 21.8337V18.667Z"
                    />
                  </svg>
                </div>
              </div>

              {/* Text Content */}
              <h4 className="ml-4 font-semibold text-orange-600 text-theme-xl dark:text-white/90 ">
                Drag & Drop Files Here
              </h4>
              <input {...dropzoneHeader2.getInputProps()} />
            </form>
          )}
        </div>

        {/* ---------- Right Side Main Image ---------- */}
        <div className="relative col-span-2 row-span-2 row-start-1">
          {Header3 ? (
            <>
              <div className="relative">
                <div className="absolute  right-3 top-2 flex gap-3"><div className="text-xl p-2 rounded-full bg-white text-orange-600" onClick={()=>{handleDelete(Header3.itinerary_Images_id)}}>
                  <TrashBinIcon />
                  </div><div className="text-xl p-2 rounded-full bg-gray-300 bg-white text-orange-600" onClick={()=>{setedit(Header3); openModal(); setform("Edit")}}>
                    <PencilIcon/>
                    </div> </div>
                <img
                  src={Header3.itinerary_Images}
                  alt="Left Bottom"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

            </>
          ) : (
            <form {...dropzoneHeader3.getRootProps()} className="flex items-center justify-center w-full h-full border-2 border-dashed rounded-lg text-gray-400">
              <div className="dz-message flex flex-col items-center m-0!">
                {/* Icon Container */}

                <div className="flex h-[58px] w-[58px]  items-center justify-center rounded-full bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-400">
                  <svg
                    className="fill-current"
                    width="29"
                    height="28"
                    viewBox="0 0 29 28"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M14.5019 3.91699C14.2852 3.91699 14.0899 4.00891 13.953 4.15589L8.57363 9.53186C8.28065 9.82466 8.2805 10.2995 8.5733 10.5925C8.8661 10.8855 9.34097 10.8857 9.63396 10.5929L13.7519 6.47752V18.667C13.7519 19.0812 14.0877 19.417 14.5019 19.417C14.9161 19.417 15.2519 19.0812 15.2519 18.667V6.48234L19.3653 10.5929C19.6583 10.8857 20.1332 10.8855 20.426 10.5925C20.7188 10.2995 20.7186 9.82463 20.4256 9.53184L15.0838 4.19378C14.9463 4.02488 14.7367 3.91699 14.5019 3.91699ZM5.91626 18.667C5.91626 18.2528 5.58047 17.917 5.16626 17.917C4.75205 17.917 4.41626 18.2528 4.41626 18.667V21.8337C4.41626 23.0763 5.42362 24.0837 6.66626 24.0837H22.3339C23.5766 24.0837 24.5839 23.0763 24.5839 21.8337V18.667C24.5839 18.2528 24.2482 17.917 23.8339 17.917C23.4197 17.917 23.0839 18.2528 23.0839 18.667V21.8337C23.0839 22.2479 22.7482 22.5837 22.3339 22.5837H6.66626C6.25205 22.5837 5.91626 22.2479 5.91626 21.8337V18.667Z"
                    />
                  </svg>
                </div>
              </div>

              {/* Text Content */}
              <h4 className="ml-4 font-semibold text-orange-600 text-theme-xl dark:text-white/90 ">
                Drag & Drop Files Here
              </h4>
              <input {...dropzoneHeader3.getInputProps()} />
            </form>
          )}
        </div>
      </div>
    </div>
    <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
               {form==="Add"?<></>:<Editimagemodal data={edit}/>}

            </Modal>
    </>
  );
};

export default Pageheader;
