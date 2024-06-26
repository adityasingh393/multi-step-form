import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import {
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";

interface SlotBookingFormData {
  bookingDate: Date; // Adjusted type to Date
  slot: string;
}

interface SlotBookingFormProps {
  onSubmit: (data: SlotBookingFormData) => void;
}

const schema = yup.object().shape({
  bookingDate: yup
    .date()
    .required("Booking Date is required")
    .min(new Date(), "Booking Date must be a future date"),
  slot: yup.string().required("Slot is required"),
});

const slotOptions = [
  { value: "morning", label: "9am-11am" },
  { value: "afternoon", label: "11am-1pm" },
  { value: "evening", label: "1pm-3pm" },
];

const SlotBookingForm: React.FC<SlotBookingFormProps> = ({ onSubmit }) => {
  const {
    control, // Use control instead of register
    handleSubmit,
    formState: { errors },
  } = useForm<SlotBookingFormData>({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const onNextClick: SubmitHandler<SlotBookingFormData> = (data) => {
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
        <Controller
          name="bookingDate"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              id="bookingDate"
              label="Booking Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              error={!!errors.bookingDate}
              helperText={errors.bookingDate && errors.bookingDate.message}
              fullWidth
            />
          )}
        />
        <Controller
          name="slot"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Select
              {...field}
              id="slot"
              error={!!errors.slot}
              fullWidth
            >
              {slotOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          )}
        />
        {errors.slot && (
          <Typography color="error">{errors.slot.message}</Typography>
        )}
        <Button type="submit" variant="contained" color="secondary">
          Next
        </Button>
      </form>
    </div>
  );
};

export default SlotBookingForm;
