/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { FieldErrors, FieldValues, UseFormClearErrors, UseFormRegisterReturn } from "react-hook-form";
import { FormGroup, Label } from "reactstrap";

type FormInputProps = {
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  type?: "text" | "email" | "password" | "number" | "tel" | "url" | "search" | "textarea";
  register: UseFormRegisterReturn;
  trigger: any;
  clearErrors: UseFormClearErrors<any>;

  errors: FieldErrors<FieldValues> | Record<string, { message: string } | undefined>;
};

const FormInput: React.FC<FormInputProps> = ({
  id,
  name,
  label,
  placeholder,
  type = "text",
  register,
  clearErrors,
  errors,
  trigger,
}) => {
  return (
    <FormGroup className="my-5">
      <Label className="text-sm" for={id}>
        {label}
      </Label>
      <input
        // invalid={!!errors[name]}
        id={id}
        {...register}
        name={name}
        placeholder={placeholder}
        type={type}
        className={`block w-full px-3 py-2 text-base rounded-md border 
          ${errors[name] ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"} 
          focus:outline-none focus:ring-1`}
        onChange={(e) => {
          clearErrors(name); // Clear the specific error
          register.onChange(e);
          trigger(name);
        }}
      />
      {errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name]?.message as string}</p>}
    </FormGroup>
  );
};

export default FormInput;
