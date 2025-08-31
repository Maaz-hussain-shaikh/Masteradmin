// ItineraryFormContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

interface ItineraryFormData {
  itineraryTitle: string;
  metadis:string;
  nameOfTrip: string;
  tripDuration: string;
  isSpecialEvent: string;
  EventName:string;
  eventOffer: string;
   MainPrice:number;
   offer:number;
  quadPrice: number;
  doublePrice: number;
  triplePrice: number;
  itineraryType: string;
  country: {
    countryCode:string;
    name:string
  };
  state: {
    stateID:number;
    stateName:string
  };
  city: {
    cityID:number;
    cityName:string;
  };
  itineraryDescription: string;
  itineraryNote: string;
}

interface ItineraryFormContextType {
  formData: ItineraryFormData;
  updateForm: (field: keyof ItineraryFormData, value: any) => void;
  resetForm: () => void;
}

const defaultFormData: ItineraryFormData = {
  itineraryTitle: "",
  metadis:"",
  nameOfTrip: "",
  tripDuration: "",
  isSpecialEvent: "Normal trip",
  EventName:"",
  eventOffer: "",
  MainPrice:0,
  offer:0,
  quadPrice: 0,
  doublePrice: 0,
  triplePrice: 0,
  itineraryType: "",
  country: {
    countryCode:"",
    name:""
  },
  state: {
    stateID:0,
    stateName:""
  },
  city: {
    cityID:0,
    cityName:""
  },
  itineraryDescription: "",
  itineraryNote: "",
};

const ItineraryFormContext = createContext<ItineraryFormContextType | undefined>(undefined);

export const ItineraryFormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<ItineraryFormData>(defaultFormData);

  const updateForm = (field: keyof ItineraryFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData(defaultFormData);
  };

  return (
    <ItineraryFormContext.Provider value={{ formData, updateForm, resetForm }}>
      {children}
    </ItineraryFormContext.Provider>
  );
};

export const useItineraryForm = (): ItineraryFormContextType => {
  const context = useContext(ItineraryFormContext);
  if (!context) {
    throw new Error("useItineraryForm must be used within an ItineraryFormProvider");
  }
  return context;
};
