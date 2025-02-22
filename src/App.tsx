import "./App.css";
import Space from "./components/atom/Space";
import Card from "./components/molecules/Card/Card";
import Typography from "./components/atom/Typography";
import { useForm } from "react-hook-form";
import { Button } from "./components/ui/button";
import Divider from "./components/atom/Divider";
import FormInput from "./components/molecules/Form/Form";
import FormFile from "./components/molecules/FormFile/FormFile";
import { useState } from "react";
import Canvas from "./components/molecules/Canvas/Canvas";

type SubmitProps = {
  to: string;
  message: string;
  from: string;
  file: File;
};
function App() {
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    trigger,
    formState: { errors },
  } = useForm<SubmitProps>();

  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [submittedData, setSubmittedData] = useState<SubmitProps | null>(null);
  const [fileImage, setfileImage] = useState<File | null>(null);

  const onSubmit = (formState: SubmitProps) => {
    if (fileImage) {
      setIsSubmit(true);
      setSubmittedData(formState);
    }
  };
  const handleFileDrop = (file: File) => {
    setValue("file", file, { shouldValidate: true });
    trigger("file");
    setfileImage(file);
  };

  return (
    <Space style="p-12 bg-surface h-full flex justify-center">
      <Card style="p-5 bg-white w-[80%]">
        <Typography tag="h1" style="text-4xl font-bold">
          Gift Card
        </Typography>
        <Divider style="my-12" />
        <form className="flex flex-col gap-12" onSubmit={handleSubmit(onSubmit)}>
          <FormFile
            id="file"
            name="file"
            label="Dear"
            errors={errors}
            onFileDrop={handleFileDrop}
            clearErrors={clearErrors}
            register={register}
          />
          <FormInput
            id="to"
            name="to"
            label="Dear"
            type="text"
            register={register("to", { required: "This field is required" })}
            errors={errors}
            clearErrors={clearErrors}
            trigger={trigger}
          />
          <FormInput
            id="message"
            name="message"
            label="Message"
            type="textarea"
            register={register("message", { required: "This field is required" })}
            errors={errors}
            clearErrors={clearErrors}
            trigger={trigger}
          />
          <FormInput
            id="from"
            name="from"
            label="From"
            type="text"
            register={register("from", { required: "This field is required" })}
            errors={errors}
            clearErrors={clearErrors}
            trigger={trigger}
          />

          <Button className="bg-green-600 text-center w-44 justify-center self-center" type="submit">
            Submit
          </Button>
        </form>
        <Space style="mt-4">
          {isSubmit && (
            <Canvas
              cardData={{
                image: submittedData?.file ? URL.createObjectURL(submittedData.file) : undefined,
                from: { text: submittedData?.from as string, coordinates: { x: 460, y: 420 } },
                to: { text: submittedData?.to as string, coordinates: { x: 500, y: 220 } },
                message: { text: submittedData?.message as string, coordinates: { x: 330, y: 290 } },
              }}
            />
          )}
        </Space>
      </Card>
    </Space>
  );
}

export default App;
