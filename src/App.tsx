import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PersonalDetailsForm from "./components/PersonalDetailsForm";
import ServiceInfoForm from "./components/ServiceInfoForm";
import SlotBookingForm from "./components/SlotBookingForm";
import ThankYouPage from "./components/ThankYouPage";

const App: React.FC = () => {
  const handlePersonalDetailsSubmit = (data: any) => {
    console.log("Submitted personal details:", data);
    localStorage.setItem("personalDetails", JSON.stringify(data));
  };

  const handleServiceInfoSubmit = (data: any) => {
    console.log("Submitted service info:", data);
    localStorage.setItem("serviceInfo", JSON.stringify(data));
  };

  const handleSlotBookingSubmit = (data: any) => {
    console.log("Submitted slot booking:", data);
    localStorage.setItem("slotBooking", JSON.stringify(data));
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/personal-details"
          element={
            <PersonalDetailsForm onSubmit={handlePersonalDetailsSubmit} />
          }
        />
        <Route
          path="/service-info"
          element={<ServiceInfoForm onSubmit={handleServiceInfoSubmit} />}
        />
        <Route
          path="/slot-booking"
          element={<SlotBookingForm onSubmit={handleSlotBookingSubmit} />}
        />
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route
          path="/"
          element={
            <PersonalDetailsForm onSubmit={handlePersonalDetailsSubmit} />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
