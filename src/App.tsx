import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import PersonalDetailsForm from "./components/PersonalDetailsForm";
import ServiceInfoForm from "./components/ServiceInfoForm";
import SlotBookingForm from "./components/SlotBookingForm";
import ThankYouPage from "./components/ThankYouPage";
import "./App.css";

const App: React.FC = () => {
  const [personalDetailsCompleted, setPersonalDetailsCompleted] = useState(false);
  const [serviceInfoCompleted, setServiceInfoCompleted] = useState(false);
  const [slotBookingCompleted, setSlotBookingCompleted] = useState(false);

// to disallow navigation using browser navigation buttons

  const handlePersonalDetailsSubmit = (data: any) => {
    console.log("Submitted personal details:", data);
    localStorage.setItem("personalDetails", JSON.stringify(data));
    setPersonalDetailsCompleted(true);  //only allow navigation to next page when this is set true
  };

  const handleServiceInfoSubmit = (data: any) => {
    console.log("Submitted service info:", data);
    localStorage.setItem("serviceInfo", JSON.stringify(data));  
    setServiceInfoCompleted(true);
  };

  const handleSlotBookingSubmit = (data: any) => {
    console.log("Submitted slot booking:", data);
    localStorage.setItem("slotBooking", JSON.stringify(data));
    setSlotBookingCompleted(true);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/personal-details"
          element={
            personalDetailsCompleted ? ( //only render the next page when this page is compleye
              <Navigate to="/service-info" />
            ) : (
              <PersonalDetailsForm onSubmit={handlePersonalDetailsSubmit} />
            )
          }
        />
        <Route
          path="/service-info"
          element={
            personalDetailsCompleted && serviceInfoCompleted ? ( // smae goes with this conditional rendering if the previous form is not filled you cannot move to next form 
              <Navigate to="/slot-booking" />
            ) : (
              <ServiceInfoForm onSubmit={handleServiceInfoSubmit} />
            )
          }
        />
        <Route
          path="/slot-booking"
          element={
            personalDetailsCompleted && serviceInfoCompleted && slotBookingCompleted ? (
              <Navigate to="/thank-you" />
            ) : (
              <SlotBookingForm onSubmit={handleSlotBookingSubmit} />
            )
          }
        />
        <Route
          path="/thank-you"
          element={
            personalDetailsCompleted && serviceInfoCompleted && slotBookingCompleted ? (
              <ThankYouPage />
            ) : (
              <Navigate to="/personal-details" />
            )
          }
        />
        <Route
          path="/"
          element={<PersonalDetailsForm onSubmit={handlePersonalDetailsSubmit} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
