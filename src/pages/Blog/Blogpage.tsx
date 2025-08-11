
import { BlogProvider } from "../../components/bloge/BlogContext";
import Bloglayout from "../../components/bloge/Bloglyout";
export default function Blogpage() {

    return (
        <BlogProvider>
           <Bloglayout/>
        </BlogProvider>
    );
}
