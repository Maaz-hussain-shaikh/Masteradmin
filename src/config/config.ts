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
    getAll: `${BASE_URL}/TravelTech/itinerary/getall`,
  },
  franchise: {
    list: `${BASE_URL}/franchise`,
    details: (id: any) => `${BASE_URL}/franchise/${id}`,
  }
};
