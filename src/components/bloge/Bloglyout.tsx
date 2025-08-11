import { useState } from "react";
import PageBreadcrumb from "../common/PageBreadCrumb";
import PageMeta from "../common/PageMeta";
import Createblog from "./Createbloge";
import Uploader from "./Uploader";
import Blogcontent from "./blogcontent";
import { BlogProvider } from "./BlogContext";

export default function Bloglayout() {
    const [isdatafill,setstatus]=useState(false)
    return (
        <BlogProvider>
            {
                isdatafill?<>
                <Blogcontent/>
                </>:<>
                <PageMeta
                title="Travel tech Dashboard"
                description="This is Travel tech Dashboard"
            />
            <PageBreadcrumb pageTitle="Create Blog" />
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                <Createblog />
                <div className="space-y-6">
                    <Uploader />
                </div>
            </div></>
            }
            

        </BlogProvider>
    );
}
