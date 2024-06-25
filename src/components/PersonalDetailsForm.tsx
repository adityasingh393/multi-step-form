import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Typography } from "@material-ui/core";


interface PersonalDetailsFormData {
  name: string;
  age: number;
  email: string;
}

interface PersonalDetailsFormProps {
  onSubmit: (data: PersonalDetailsFormData) => void;
}

const schema = yup.object({
  name: yup.string().required("Name is required"),
  age: yup
    .number()
    .required("Age is required")
    .positive("Age must be a positive number")
    .integer("Age must be an integer"),
  email: yup
    .string()
    .required("Email is required")
    .email("Email must be a valid email address")
    .matches(/@/, "Email must contain '@'"),
}).required();

const PersonalDetailsForm: React.FC<PersonalDetailsFormProps> = ({ onSubmit }) => {
  const { control, handleSubmit, formState: { errors } } = useForm<PersonalDetailsFormData>({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const onNextClick: SubmitHandler<PersonalDetailsFormData> = (data) => {
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
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              id="name"
              label="Name"
              error={!!errors.name}
              helperText={errors.name ? errors.name.message : ''}
              fullWidth
            />
          )}
        />
        <Controller
          name="age"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              id="age"
              label="Age"
              type="number"
              error={!!errors.age}
              helperText={errors.age ? errors.age.message : ''}
              fullWidth
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              id="email"
              label="Email"
              type="email"
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ''}
              fullWidth
            />
          )}
        />
        <Button type="submit" variant="contained" color="primary">
          Next
        </Button>
      </form>
    </div>
  );
};

export default PersonalDetailsForm;
