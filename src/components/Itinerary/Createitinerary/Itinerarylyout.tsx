import Itiform from "./Itiform";
import PageBreadcrumb from "../../common/PageBreadCrumb";
import PageMeta from "../../common/PageMeta";
import Formright from "./Fromright";
import { ItineraryFormProvider } from "../ItineraryContext";

export default function CreateItlayout() {
    return (
        <>
        <ItineraryFormProvider>
            <PageMeta
                title="Itinerary Create"
                description="Create Itinerary"
            />
            <PageBreadcrumb pageTitle="Create Itinerary" />
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                <Itiform />
                <div className="space-y-6">
                    <Formright />
                </div>
            </div>

        </ItineraryFormProvider>
            

        </>
    )
}