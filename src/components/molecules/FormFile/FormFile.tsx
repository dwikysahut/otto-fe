/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useRef, useState } from "react";
import { FormGroup } from "reactstrap";
import Typography from "../../atom/Typography";
import ImageCloud from "../../../assets/cloud-upload.png";
import Space from "../../atom/Space";
import { FieldErrors, FieldValues, UseFormClearErrors, UseFormRegister } from "react-hook-form";

type FormInputProps = {
  id?: string;
  name: string;
  label?: string;
  placeholder?: string;
  register: UseFormRegister<any>;
  clearErrors: UseFormClearErrors<any>;
  errors: FieldErrors<FieldValues>;

  fileUrl?: string | null;
  type?: "text" | "email" | "password" | "number" | "tel" | "url" | "search" | "textarea";
  onFileDrop: (file: File) => void;
};

const FormFile: React.FC<FormInputProps> = ({ id, name, placeholder, errors, onFileDrop, fileUrl, clearErrors }) => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(fileUrl ? fileUrl : null);

  const onClickSurfaceHandler = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  const onDropHandler = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      const files = event.dataTransfer.files;

      if (files.length > 0) {
        const newSelectedFile = files[0];
        if (newSelectedFile && (newSelectedFile.type === "image/jpeg" || newSelectedFile.type === "image/png")) {
          const objectURL = URL.createObjectURL(newSelectedFile);
          setSelectedFile(newSelectedFile);
          setFilePreview(objectURL);
          onFileDrop(newSelectedFile);
          clearErrors(name);
        }
      }
    },
    [clearErrors, name, onFileDrop]
  );

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSelectedFile = event.target.files && event.target.files[0];

    if (newSelectedFile) {
      const objectURL = URL.createObjectURL(newSelectedFile);
      setSelectedFile(newSelectedFile);
      setFilePreview(objectURL);
      onFileDrop(newSelectedFile);
    }
  };
  const onDragOverHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };
  console.log(errors);
  return (
    <FormGroup className="my-5">
      {filePreview && (
        <Space style="w-full flex justify-center items-center self-center mb-4">
          <img src={filePreview} className="" />
        </Space>
      )}
      <div
        onClick={onClickSurfaceHandler}
        onDragOver={onDragOverHandler}
        onDrop={onDropHandler}
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
          placeholder={placeholder}
          ref={(e) => {
            // register(name, { required: "File is required" }).ref(e);
            inputFileRef.current = e;
          }}
          onClick={(e) => e.stopPropagation()}
          onChange={handleFileInputChange}
          className="absolute top-0 left-0 opacity-0 cursor-pointer z-0"
        />
        <Typography style="font-light text-sm" tag="h4">
          Drag and Drop files here
        </Typography>
      </div>
      {!filePreview && (
        <Typography tag="p" style="text-red-600 text-sm mt-2">
          File Required
        </Typography>
      )}
    </FormGroup>
  );
};

export default FormFile;
