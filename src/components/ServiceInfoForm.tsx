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

interface ServiceInfoFormData {
  vehicleType: string;
  modelNumber: string;
}

interface ServiceInfoFormProps {
  onSubmit: (data: ServiceInfoFormData) => void;
}

const schema = yup.object().shape({
  vehicleType: yup.string().required("Vehicle Type is required"),
  modelNumber: yup
    .string()
    .required("Model Number is required")
    .matches(/^[a-zA-Z][a-zA-Z0-9]{1,5}$/, "Invalid Model Number format, It must start with a letter")
    .max(6, "Model Number must not exceed 6 characters"),
});

const vehicleTypes = [
  { id: "motorcycle", label: "Motorcycle" },
  { id: "car", label: "Car" },
  { id: "truck", label: "Truck" },
  { id: "bus", label: "Bus" },
];

const ServiceInfoForm: React.FC<ServiceInfoFormProps> = ({ onSubmit }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ServiceInfoFormData>({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const onNextClick: SubmitHandler<ServiceInfoFormData> = (data) => {
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
        <Controller
          name="vehicleType"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Select
              {...field}
              error={!!errors.vehicleType}
              fullWidth
            >
              {vehicleTypes.map((type) => (
                <MenuItem key={type.id} value={type.id}>
                  {type.label}
                </MenuItem>
              ))}
            </Select>
          )}
        />
        {errors.vehicleType && (
          <Typography color="error">{errors.vehicleType.message}</Typography>
        )}
        <Controller
          name="modelNumber"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Model Number"
              error={!!errors.modelNumber}
              helperText={errors.modelNumber && errors.modelNumber.message}
              fullWidth
            />
          )}
        />
        <Button type="submit" variant="contained" color="secondary">
          Next
        </Button>
      </form>
    </div>
  );
};

export default ServiceInfoForm;
