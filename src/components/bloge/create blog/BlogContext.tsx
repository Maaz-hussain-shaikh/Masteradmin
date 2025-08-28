// BlogContext.tsx
import React, { createContext, useContext, useState } from "react";

type BlogData = {
  name: string;
  title: string;
  type: string;
  destinationName: string;
  state: string;
  country: string;
  specialname: string;
  region: string;
  seotag: string[];
  tag:string;
  banner: File | null;
  youtubelink: string[];
  userprofile: File | null;
  metadiscription:string;
  content:string;
};

type ErrorState = Record<string, boolean>;

type BlogContextType = {
  blogdata: BlogData;
  setData: React.Dispatch<React.SetStateAction<BlogData>>;
  errors: ErrorState;
  setErrors: React.Dispatch<React.SetStateAction<ErrorState>>;
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;

};

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const BlogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [blogdata, setData] = useState<BlogData>({
    name: "",
    title: "",
    type: "",
    destinationName: "",
    state: "",
    country: "",
    specialname: "",
    region: "India",
    tag:"",
    seotag: [],
    banner: null,
    youtubelink: [],
    userprofile: null,
    metadiscription:"",
    content:""
  });

  const [errors, setErrors] = useState<ErrorState>({});
const [message, setMessage] = useState("");
  return (
    <BlogContext.Provider value={{ blogdata, setData, errors, setErrors,message, setMessage }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error("useBlog must be used within BlogProvider");
  }
  return context;
};
