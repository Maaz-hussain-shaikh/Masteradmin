import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import Blogpage from "./pages/Blog/Blogpage";
import ProtectedRoute from "./components/auth/Authcheck";
import RoleGuard from "./components/auth/RoleGuard";
import CreateItlayout from "./components/Itinerary/Createitinerary/Itinerarylyout";
import PublishBloglayout from "./components/bloge/create blog/publish blog/PublishBloglayout";
import ItineraryLayout from "./components/Itinerary/all itinerarys/ItineraryLayout";
import ItinerarypageLayout from "./components/Itinerary/Itinerary page/ItinerarypageLayout";

export default function App() {

  const userRole = localStorage.getItem("role");

  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout with Protected Routes */}
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index path="/" element={<Home />} />

            {/* Bloge */}

            <Route path="/Create-blog" element={
              <RoleGuard allowedRoles={["admin"]} userRole={userRole}>
                <Blogpage />
              </RoleGuard>
            } />
            <Route path="/Blog" element={
              <RoleGuard allowedRoles={["admin"]} userRole={userRole}>
                <PublishBloglayout />
              </RoleGuard>
            } />

            {/* Itinerary */}
            <Route path="/Create-Itinerary" element={
              <RoleGuard allowedRoles={["admin"]} userRole={userRole}>
                <CreateItlayout />
              </RoleGuard>
            } />
            <Route path="/All-Itinerary" element={
              <RoleGuard allowedRoles={["admin"]} userRole={userRole}>
                <ItineraryLayout/>
              </RoleGuard>
            } />
            <Route path="All-Itinerary/ItineraryPage/:slug" element={
              <RoleGuard allowedRoles={["admin"]} userRole={userRole}>
                <ItinerarypageLayout/>
              </RoleGuard>
            } />


            {/* Others Page */}
            <Route path="/profile" element={<UserProfiles />} />


            <Route path="/calendar" element={
              <RoleGuard allowedRoles={['admin']} userRole={userRole}>
                <Calendar />
              </RoleGuard>
            } />

            <Route path="/blank" element={<Blank />} />

            {/* Forms */}
            <Route path="/form-elements" element={<FormElements />} />

            {/* Tables */}
            <Route path="/basic-tables" element={<BasicTables />} />

            {/* Ui Elements */}
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/badge" element={<Badges />} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/images" element={<Images />} />
            <Route path="/videos" element={<Videos />} />

            {/* Charts */}
            <Route path="/line-chart" element={<LineChart />} />
            <Route path="/bar-chart" element={<BarChart />} />
          </Route>

          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
