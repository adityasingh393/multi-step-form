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

interface ServiceInfoFormData {
  vehicleType: string;
  modelNumber: string;
}

interface ServiceInfoFormProps {
  onSubmit: (data: ServiceInfoFormData) => void;
}

const ServiceInfoForm: React.FC<ServiceInfoFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ServiceInfoFormData>();
  const navigate = useNavigate();

  const onNextClick = (data: ServiceInfoFormData) => {
    onSubmit(data);
    localStorage.setItem("serviceInfo", JSON.stringify(data));

    navigate("/slot-booking");
  };

  return (
    <div className="service">
      <Typography variant="h4" gutterBottom>
        Service Information
      </Typography>
      <form onSubmit={handleSubmit(onNextClick)}>
        <Select
          id="vehicleType"
          {...register("vehicleType", { required: "Vehicle Type is required" })}
          error={!!errors.vehicleType}
          fullWidth
        >
          <MenuItem value="motorcycle">Motorcycle</MenuItem>
          <MenuItem value="car">Car</MenuItem>
          <MenuItem value="truck">Truck</MenuItem>
          <MenuItem value="bus">Bus</MenuItem>
        </Select>
        {errors.vehicleType && (
          <Typography color="error">{errors.vehicleType.message}</Typography>
        )}
        <TextField
          id="modelNumber"
          label="Model Number"
          {...register("modelNumber", { required: "Model Number is required" })}
          error={!!errors.modelNumber}
          helperText={errors.modelNumber && errors.modelNumber.message}
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary">
          Next
        </Button>
      </form>
    </div>
  );
};

export default ServiceInfoForm;
