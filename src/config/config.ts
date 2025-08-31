// src/config/api.js

const BASE_URL = "https://aaliyaenterprises.com";  // ek hi jagah base url
const BASE_URL_Dynamic = "https://traveltechbackend.vercel.app";

export const API_URLS = {
  login: `${BASE_URL}/TravelTech/LoginPannels`,
  addimage: `${BASE_URL_Dynamic}/traveltech/api/addimgs`,
  Approve: `${BASE_URL_Dynamic}/traveltech/api/login`,
  Blog: {
    Createblog: `${BASE_URL_Dynamic}/traveltech/api/CreateBlog`,
    Getblog: `${BASE_URL_Dynamic}/traveltech/api/blogcard`,
    blogcontent: (id: any) => `${BASE_URL_Dynamic}/traveltech/api/content/${id}`,
    editblog: (id: any) => `${BASE_URL_Dynamic}/traveltech/api/editblog/${id}`,
  },
  trips: {
    create: `${BASE_URL}/trips/create`,
    getAll: `${BASE_URL}/trips`,
    getById: (id: any) => `${BASE_URL}/TravelTech/itinerary/getone/${id}`,  // dynamic url
  },
  itinerary: {
    create: `${BASE_URL}/itinerary/create`,
    fetchcountry: `${BASE_URL}/TravelTech/countrycity/countries`,
    fetchstate: `${BASE_URL}/TravelTech/countrycity/states`,
    fetchcity: `${BASE_URL}/TravelTech/countrycity/cities`,
    getAll: `${BASE_URL}/TravelTech/itinerary/getall`,
    Additinerarydays:`${BASE_URL}/TravelTech/itinerary/addItineraryDay`,
    Edititinerarydays:(id: any,day :any) =>`${BASE_URL}/TravelTech/itinerary/updateItineraryDay/${id}/${day}`,
    Editaddon:(id: any,day :any) =>`${BASE_URL}/TravelTech/itinerary/updateItineraryAddOn/${id}/${day}`,
    Deleteitinerarydays:(id: any,day :any) =>`${BASE_URL}/TravelTech/itinerary/deleteItineraryDay/${id}/${day}`,
    Deletepolicies:(id: any,day :any,name:any) =>`${BASE_URL}/TravelTech/itinerary/${name}/${id}/${day}`,
    Deleteinclusion:(id: any,num :number,name:string) =>`${BASE_URL}/TravelTech/itinerary/${name}/${id}/${num}`,
    Addinclusion:(name:string) =>`${BASE_URL}/TravelTech/itinerary/${name}`,
    Updateinclusion:(id: any,num :number) =>`${BASE_URL}/TravelTech/itinerary/updateInclusion/${id}/${num}`,
    Updateexclusion:(id: any,num :number) =>`${BASE_URL}/TravelTech/itinerary/updateExclusion/${id}/${num}`,
    Updatethingstotake:(id: any,num :number) =>`${BASE_URL}/TravelTech/itinerary/updateItineraryThingsToGet/${id}/${num}`,
    Addnewpolicies:`${BASE_URL}/TravelTech/itinerary/addItineraryBookingTerm`,
    Addnewfaq:`${BASE_URL}/TravelTech/itinerary/addItineraryFaq`,
    Addnewlocation:`${BASE_URL}/TravelTech/itinerary/addItineraryOtherLocation`,
    addItineraryAddOn:`${BASE_URL}/TravelTech/itinerary/addItineraryAddOn`,
    Editpolicies:(id: any,num :number) =>`${BASE_URL}/TravelTech/itinerary/updateItineraryBookingTerm/${id}/${num}`,
    Editlocation:(id: any,num :number) =>`${BASE_URL}/TravelTech/itinerary/updateItineraryOtherLocation/${id}/${num}`,
    Deleteaddon:(id: any,num :number) =>`${BASE_URL}/TravelTech/itinerary/deleteItineraryAddOn/${id}/${num}`,
    Deletelocation:(id: any,num :number) =>`${BASE_URL}/TravelTech/itinerary/deleteItineraryOtherLocation/${id}/${num}`,
  },
  franchise: {
    list: `${BASE_URL}/franchise`,
    details: (id: any) => `${BASE_URL}/franchise/${id}`,
  }
};
