import React from "react";
import { FormGroup, Label, Input } from "reactstrap";

type FormInputProps = {
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  type?: "text" | "email" | "password" | "number" | "tel" | "url" | "search" | "textarea";
};

const FormInput: React.FC<FormInputProps> = ({ id, name, label, placeholder, type = "text" }) => {
  return (
    <FormGroup className="my-5">
      <Label className="text-sm" for={id}>
        {label}
      </Label>
      <Input id={id} name={name} placeholder={placeholder} type={type} />
    </FormGroup>
  );
};

export default FormInput;
