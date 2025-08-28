import Label from "../../form/Label";
import Button from "../../ui/button/Button";
import Input from "../../form/input/InputField";
import { useEffect, useState } from "react";
import axios from "axios";
import { useBlog } from "./BlogContext";
import { uploadImageAndGetUrl } from "./ImageUploader";
import { API_URLS } from "../../../config/config";

export default function Authmodel() {
  const [process, setProcess] = useState<string>("");
  const [isloading, setloading] = useState(false)
  const { blogdata, setMessage } = useBlog();
  const [approve, setaprove] = useState(false)
  const [apdata, setapdata] = useState({
    name: "",
    password: ""
  });

  const saveToken = (token: string) => {
    const expiryTime = new Date().getTime() + 24 * 60 * 60 * 1000; // abhi ka time + 24 hr
    const tokenData = { value: token, expiry: expiryTime };
    sessionStorage.setItem("aprovekey", JSON.stringify(tokenData));
  };

  const submitblog = async (token: any, banner: string | null, userimg: string | null) => {
    try {
      const response = await axios.post(
        `${API_URLS.Blog.Createblog}`,
        {
          "title": blogdata.title,
          "metaDescription": blogdata.metadiscription,
          "seoTags": blogdata.seotag,
          "banner": banner,
          "profile": userimg,
          "author": blogdata.name,
          "country": blogdata.country,
          "state": blogdata.state,
          "region": blogdata.region,
          "destinationname": blogdata.destinationName,
          "specialname": blogdata.specialname,
          "tag": "hatana hai",
          "typeoftrip": blogdata.type,
          "link": blogdata.youtubelink,
          "content": blogdata.content
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // token pass karna
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        return response.data
      } else {
        alert("something is wrong")
      }
    } catch (error) {
      return error
    }
  }
  const getapprovalkey = async (e: any) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(`${API_URLS.Approve}`, {
        email: apdata.name,
        password: apdata.password
      });

      // Agar success ho
      if (response.data.success) {
        const { token } = response.data
        setapdata((prev) => ({ ...prev, name: "", password: "" }))

        saveToken(token);
        setaprove(true)
      } else {
        alert("kuch gadbad hai bro")
      }
    } catch (error) {
      console.error('Login error:', error);

    }
  };

  const uploadblog = async (): Promise<void> => {
    const token = sessionStorage.getItem("aprovekey");
    setloading(true)
    if (!token) {
      console.error("No token found in session storage.");
      return;
    }

    // Step state track karne ke liye
    setProcess("Starting blog upload...");

    let bannerUrl: string | null = "";
    let profileUrl: string | null = "";

    // Step 1: Banner upload
    if (blogdata.banner) {
      setProcess("Uploading banner image...");
      bannerUrl = await uploadImageAndGetUrl(
        blogdata.banner,
        blogdata.destinationName,
        token
      );
      setProcess("Banner uploaded successfully ✅");
    }

    // Step 2: Profile upload
    if (blogdata.userprofile) {
      setProcess("Uploading profile image...");
      profileUrl = await uploadImageAndGetUrl(
        blogdata.userprofile,
        "BlogProfile",
        token
      );
      setProcess("Profile uploaded successfully ✅");
    }

    // Step 3: Submit blog
    setProcess("Submitting blog...");
    const message = await submitblog(token, bannerUrl, profileUrl);

    if (message.success) {
      setProcess("Blog submitted successfully");
      setTimeout(() => {
        setloading(false)

        setMessage("");
      }, 2000);
    } else {
      setProcess("Failed to submit blog Please Try on New Tab ❌");
    }
  };
  const getToken = (): string | null => {
    const tokenString = sessionStorage.getItem("aprovekey");
    if (!tokenString) return null;

    const tokenData = JSON.parse(tokenString);
    const now = new Date().getTime();

    if (now > tokenData.expiry) {
      // Token expired
      sessionStorage.removeItem("aprovekey");
      return null;
    }
    return tokenData.value;
  };
  useEffect(() => {
    const token = getToken();
    if (!token) {
      setaprove(false)
    } else {
      setaprove(true)
    }

  }, [])
  return (
    <>

      <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
        {approve ? <>
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Your request is approve
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Now You can Upload your blog
            </p>
            {isloading ? <>

              <div className="flex items-center justify-center ">
                <div className="flex items-center gap-3 bg-white  px-6 py-4 rounded-xl">
                  <p className="text-lg font-medium text-gray-700">{process} </p>
                  <div className="w-5 h-5 border-2 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
              </div>
            </> : <>
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                    Author Name
                  </p>
                  <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                    {blogdata.name}
                  </p>
                </div>

                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                    Blog Title
                  </p>
                  <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                    {blogdata.title}

                  </p>
                </div>

                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                    Type of blog
                  </p>
                  <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                    {blogdata.type}
                  </p>
                </div>

                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                    Destination name
                  </p>
                  <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                    {blogdata.destinationName}
                  </p>
                </div>

                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                    Special keyword
                  </p>
                  <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                    {blogdata.specialname}
                  </p>
                </div>
              </div>
            </>}


          </div>

          <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
            <Button size="sm" onClick={uploadblog}>
              Upload Blog
            </Button>
          </div>
        </> : <>
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Access Verification
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Update your details to keep your profile up-to-date.
            </p>
          </div>
          <form className="flex flex-col" onSubmit={getapprovalkey}>
            <div className="px-2 overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                <div>
                  <Label>Approval key</Label>
                  <Input type="text" placeholder="Approval key"
                    value={apdata.name} onChange={(e) => { setapdata((prev) => ({ ...prev, name: e.target.value })) }} />
                </div>
                <div>
                  <Label>Password</Label>
                  <Input type="Password" placeholder="Password" value={apdata.password} onChange={(e) => { setapdata((prev) => ({ ...prev, password: e.target.value })) }} />
                </div>


              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" >
                Get Approval
              </Button>
            </div>
          </form>
        </>}
      </div>


    </>
  );
}
