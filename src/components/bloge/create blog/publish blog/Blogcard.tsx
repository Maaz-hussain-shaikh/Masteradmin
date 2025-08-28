import { useState } from "react";

interface BlogProps {
  blog: {
    slug: string;
    title: string;
    author: string;
    banner: string;
    readTime: string;
  };}
  
export default function Blogcard({ blog }: BlogProps) {
    const [isActive, setIsActive] = useState(true);
    return(<>

     <div className="w-full max-w-sm mx-auto border rounded-2xl overflow-hidden shadow-md bg-white dark:bg-dark-800">
      
      {/* Toggle Button */}
      

      {/* Blog Card */}
      <a
        href="/blog/travel-guide-in-gokarna"
        rel="noopener noreferrer"
        className="flex flex-col w-full cursor-pointer"
      >
        {/* Image + Time */}
        <div className="relative w-full h-48">
          <img
            src={blog.banner}
            className="object-cover object-center w-full h-full"
          />
          <div className="absolute bottom-0 left-0 p-1 m-2 text-xs font-medium text-white bg-black/50 rounded-md">
            <span>{blog.readTime}</span>
          </div>
        </div>

        {/* Title + Author */}
        <div className="flex flex-col w-full px-4 pt-4">
          <h2 className="text-base font-semibold leading-tight mb-2 line-clamp-2">
           {blog.title}
          </h2>
          <span className="text-sm font-normal text-gray-500">
            {blog.author}
          </span>
        </div>
      </a>
      <div className="flex justify-end p-3">
        <button
          onClick={() => setIsActive(!isActive)}
          className={`px-3 py-1 text-sm rounded-full font-medium transition ${
            isActive
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {isActive ? "Active" : "Draft"}
        </button>
      </div>
    </div>
    </>)
}