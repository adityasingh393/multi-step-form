import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import {
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";

interface SlotBookingFormData {
  bookingDate: string;
  slot: string;
}

interface SlotBookingFormProps {
  onSubmit: (data: SlotBookingFormData) => void;
}

const SlotBookingForm: React.FC<SlotBookingFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<SlotBookingFormData>();
  const navigate = useNavigate();

  const onNextClick = (data: SlotBookingFormData) => {
    onSubmit(data);
    localStorage.setItem("slotBooking", JSON.stringify(data));
    navigate("/thank-you");
  };

  return (
    <div className="slot">
      <Typography variant="h4" gutterBottom>
        Slot Booking
      </Typography>
      <form onSubmit={handleSubmit(onNextClick)}>
        <TextField
          id="bookingDate"
          label="Booking Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          {...register("bookingDate", { required: "Booking Date is required" })}
          error={!!errors.bookingDate}
          helperText={errors.bookingDate && errors.bookingDate.message}
          fullWidth
        />
        <Select
          id="slot"
          {...register("slot", { required: "Slot is required" })}
          error={!!errors.slot}
          fullWidth
        >
          <MenuItem value="morning">9am-11am</MenuItem>
          <MenuItem value="afternoon">11am-1pm</MenuItem>
          <MenuItem value="evening">1pm-3pm</MenuItem>
        </Select>
        {errors.slot && (
          <Typography color="error">{errors.slot.message}</Typography>
        )}
        <Button type="submit" variant="contained" color="primary">
          Next
        </Button>
      </form>
    </div>
  );
};

export default SlotBookingForm;
