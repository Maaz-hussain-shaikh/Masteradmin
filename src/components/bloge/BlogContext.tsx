import React, { createContext, useContext, useState, ReactNode } from "react";

type BlogData = {
  name: string;
  title: string;
  type: string;
  destinationName: string;
  state: string;
  country: string;
  time: string;
  region: string;
  seotag: string[];
  banner: string;
  youtubelink: string;
  userprofile: string;
};

type BlogContextType = {
  blogdata: BlogData;
  setData: React.Dispatch<React.SetStateAction<BlogData>>;
};

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const BlogProvider = ({ children }: { children: ReactNode }) => {
  const [blogdata, setData] = useState<BlogData>({
    name: "",
    title: "",
    type: "",
    destinationName: "",
    state: "",
    country: "",
    time: "",
    region: "India",
    seotag: [],
    banner: "",
    youtubelink: "",
    userprofile: "",
  });

  return (
    <BlogContext.Provider value={{ blogdata, setData }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error("useBlog must be used within a BlogProvider");
  }
  return context;
};