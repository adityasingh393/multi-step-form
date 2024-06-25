import React from "react";
import { Typography } from "@material-ui/core";

const ThankYouPage: React.FC = () => {
  const personalDetails = JSON.parse(
    localStorage.getItem("personalDetails") || "{}"
  );

  // const serviceInfo = JSON.parse(localStorage.getItem("serviceInfo") || "{}");

  const slotBooking = JSON.parse(localStorage.getItem("slotBooking") || "{}");

  return (
    <div className="thankyou">
      <Typography variant="h4">Thank You, {personalDetails.name}!</Typography>
      <Typography>
        Your slot has been booked on {slotBooking.bookingDate} in the{" "}
        {slotBooking.slot} slot.
      </Typography>
    </div>
  );
};

export default ThankYouPage;
