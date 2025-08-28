
import { BlogProvider } from "../../components/bloge/create blog/BlogContext";
import Bloglayout from "../../components/bloge/create blog/Bloglyout";
export default function Blogpage() {

    return (
        <BlogProvider>
           <Bloglayout/>
        </BlogProvider>
    );
}
