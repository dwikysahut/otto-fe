import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Space from "./components/atom/Space";
import Card from "./components/molecules/Card";
import Typography from "./components/atom/Typography";
import { useForm } from "react-hook-form";
import { Button } from "./components/ui/button";
import { Form, FormGroup, Input, Label } from "reactstrap";
import Divider from "./components/atom/Divider";
import FormInput from "./components/molecules/Form";
import FormFile from "./components/molecules/FormFile";

function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {};
  return (
    <Space style="p-12 bg-surface h-full flex justify-center">
      <Card style="p-5 bg-white w-[80%]">
        <Typography tag="h1" style="text-4xl font-bold">
          Gift Card
        </Typography>
        <Divider style="my-12" />
        <form className="flex flex-col gap-12" onSubmit={handleSubmit(onSubmit)}>
          <Form>
            <FormFile id="to" name="to" label="Dear" type="text" />
            <FormInput id="to" name="to" label="Dear" type="text" />
            <FormInput id="message" name="message" label="Message" type="textarea" />
            <FormInput id="from" name="from" label="From" type="text" />
          </Form>

          <Button className="bg-green-600 text-center w-44 justify-center self-center">Submit</Button>
        </form>
      </Card>
    </Space>
  );
}

export default App;
