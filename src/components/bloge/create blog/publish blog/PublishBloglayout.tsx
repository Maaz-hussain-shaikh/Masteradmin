import { useEffect, useState } from "react";
import Blogcard from "./Blogcard";
import axios from "axios";
import { API_URLS } from "../../../../config/config";
import Loader from "../../../common/Loader";



// ---- Types define karein ----
interface Blog {
  slug: string;
  title: string;
  author: string;
  banner: string;
  readTime: string;
  [key: string]: any; // agar extra keys ho to bhi error na de
}

export default function PublishBloglayout() {
  const [data, setData] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const url = API_URLS.Blog.Getblog;
        const res = await axios.get(url);

        if (res.status === 200) {
          setData(res.data.blogs);
        } else {
          setError("Something is not good");
        }
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Loader loading={loading} error={error} />

      {!loading && !error && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((elm) => (
            <div key={elm.slug}>
              <Blogcard blog={elm} />  
            </div>
          ))}
        </div>
      )}
    </>
  );
}