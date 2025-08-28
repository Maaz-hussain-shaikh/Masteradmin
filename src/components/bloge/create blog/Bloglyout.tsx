import PageBreadcrumb from "../../common/PageBreadCrumb";
import PageMeta from "../../common/PageMeta";
import Createblog from "./Createbloge";
import Uploader from "./Uploader";
import Blogcontent from "./Blogcontent";
import { useBlog } from "./BlogContext";
import Alert from "../../ui/alert/Alert";

export default function Bloglayout() {

    const { message } = useBlog()
    return (
        <>
            {message && (
                <div className="  mb-4">
                    {message == "success" ? <>
                        <Alert
                            variant="success"
                            title="Success Message"
                            message="Be cautious when performing this action."
                            showLink={false}
                        />
                    </> : <>
                    {message == "Datafill" ?<>
                    
                    </>:<>
                    <Alert
                            variant="warning"
                            title="Warning Message"
                            message={message}
                            showLink={true}
                            linkHref="/"
                            linkText="Learn more"
                        /></>}
                        
                    </>}

                </div>
            )}


            {
                message == "Datafill" ? <>
                    <Blogcontent />

                </> : <>

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
                    </div>
                </>
            }


        </>
    );
}
