import React from "react";
import { Typography } from "@material-ui/core";

const ThankYouPage: React.FC = () => {
  
  const personalDetails = JSON.parse(
    localStorage.getItem("personalDetails") || "{}"
  );
  const slotBooking = JSON.parse(
    localStorage.getItem("slotBooking") || "{}"
  );


  const personalName = personalDetails.name;
  const bookingDate = slotBooking.bookingDate
    ? new Date(slotBooking.bookingDate).toLocaleDateString()
    : "No dates Available";
  const slot = slotBooking.slot;

  return (
    <div className="thankyou">
      <Typography variant="h4">Thank You, {personalName}!</Typography>
      <Typography>
        Your slot has been booked on {bookingDate} in the {slot} slot.
      </Typography>
    </div>
  );
};

export default ThankYouPage;
