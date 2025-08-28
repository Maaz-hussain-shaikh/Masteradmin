import { useParams } from "react-router";
import Faq from "./Faq";
import Itinerarydays from "./Itinerarydays";
import Itineraryintro from "./Itineraryintro";
import Pageheader from "./Pageheader";
import Pricebar from "./Pricebar";
import Thingstoknow from "./Thingstoknow";
import { useEffect } from "react";
import axios from "axios";
import { API_URLS } from "../../../config/config";

export default function ItinerarypageLayout(){
  const id=useParams()
  const token=localStorage.getItem("token")


  useEffect(()=>{
    const fetchitinerarydata= async ()=>{
try {
   const responce= await axios.get(API_URLS.trips.getById(id.slug),{
    headers:{
      Authorization:`Bearer ${token}`,
      "Content-Type": "application/json",
    }
   })
   if(responce.status==200){
    console.log(responce.data)
   }
   console.log("bhai yaha tk to aaya me ")
  
} catch (error) {
  console.log(error)
}

    }
fetchitinerarydata()
  },[])
    return(
        <>
        <Pageheader/>
        <div className="max-w-screen-xl w-full mx-auto sm:px-0">
        <div className="flex relative flex-col  sm:flex-row">
          {/* Left Section */}
          <div className="flex-shrink-0 w-full sm:w-2/3  sm:mb-4">
          
        <Itineraryintro/>
        <Itinerarydays/>
        <Thingstoknow/>
        <Faq/>
         </div>
          {/*  mobile Section */}
          
          <Pricebar/>


        </div>
      </div>
        </>
    )
}