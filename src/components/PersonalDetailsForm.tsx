import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Typography } from "@material-ui/core";
import "../App.css";

interface PersonalDetailsFormData {
  name: string;
  age: number;
  phoneNumber: string;
}

interface PersonalDetailsFormProps {
  onSubmit: (data: PersonalDetailsFormData) => void;
}

const PersonalDetailsForm: React.FC<PersonalDetailsFormProps> = ({
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalDetailsFormData>();
  const navigate = useNavigate();

  const onNextClick = (data: PersonalDetailsFormData) => {
    onSubmit(data);
    localStorage.setItem("personalDetails", JSON.stringify(data));
    navigate("/service-info");
  };

  return (
    <div className="personal">
      <Typography variant="h4" gutterBottom>
        Personal Details
      </Typography>
      <form onSubmit={handleSubmit(onNextClick)}>
        <TextField
          id="name"
          label="Name"
          {...register("name", { required: "Name is required" })}
          error={!!errors.name}
          helperText={errors.name && errors.name.message}
          fullWidth
        />
        <TextField
          id="age"
          label="Age"
          type="number"
          {...register("age", {
            required: "Age is required",
            valueAsNumber: true,
          })}
          error={!!errors.age}
          helperText={errors.age && errors.age.message}
          fullWidth
        />
        <TextField
          id="phoneNumber"
          label="Phone Number"
          {...register("phoneNumber", { required: "Phone Number is required" })}
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber && errors.phoneNumber.message}
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary">
          Next
        </Button>
      </form>
    </div>
  );
};

export default PersonalDetailsForm;
