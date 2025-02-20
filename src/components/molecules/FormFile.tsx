import React, { useRef, useState } from "react";
import { FormGroup, Label, Input } from "reactstrap";
import Typography from "../atom/Typography";
import ImageCloud from "../../assets/cloud-upload.png";
import Space from "../atom/Space";

type FormInputProps = {
  id?: string;
  name?: string;
  label?: string;
  placeholder?: string;
  type?: "text" | "email" | "password" | "number" | "tel" | "url" | "search" | "textarea";
};

const FormFile: React.FC<FormInputProps> = ({ id, name, label, placeholder, type = "text" }) => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const onClickSurfaceHandler = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  const onDragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeaveHandler = () => {
    setIsDragging(false);
  };

  const onDropHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    // if (onFileUpload) {
    //   onFileUpload(files); // Pass the files to the parent handler
    // }
  };

  const onFileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    // if (onFileUpload) {
    //   onFileUpload(e.target.files); // Handle file upload through input
    // }
  };
  return (
    <FormGroup className="my-5">
      <div
        onClick={onClickSurfaceHandler}
        className="p-2 border-3 border-dashed border-gray-300 bg-surface h-64 rounded-lg flex flex-col justify-center items-center gap-2 cursor-pointer"
      >
        <Space style="w-16">
          <img src={ImageCloud} className="" />
        </Space>
        <Typography style="font-bold" tag="h3">
          Browse Files
        </Typography>
        <input
          type="file"
          id={id}
          name={name}
          onDragOver={onDragOverHandler}
          onDragLeave={onDragLeaveHandler}
          onDrop={onDropHandler}
          placeholder={placeholder}
          ref={inputFileRef}
          onClick={(e) => e.stopPropagation()}
          onChange={onFileChangeHandler}
          className="absolute top-0 left-0 opacity-0 cursor-pointer z-0"
        />
        <Typography style="font-light text-sm" tag="h4">
          Drag and Drop files here
        </Typography>
      </div>
    </FormGroup>
  );
};

export default FormFile;
