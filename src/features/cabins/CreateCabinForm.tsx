import styled from "styled-components";

import Input from "../../ui/input";
import Form from "../../ui/Form";
import Button from "../../ui/button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import createCabin from "../../services/createCabin";
import toast from "react-hot-toast";

function CreateCabinForm() {
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset, formState, getValues } = useForm();
  const { errors } = formState;

  const { mutate: createCabinMutation } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("Succesfully created.");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset();
    },
    onError: () => toast.error("The cabin cannot be created."),
  });

  // TODO Remove any
  const onFormSubmit = (data: any) => {
    createCabinMutation({ ...data, image: data.image[0] });
  };

  return (
    <Form onSubmit={handleSubmit(onFormSubmit)}>
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <Input
          type="text"
          id="name"
          {...register("name", { required: "This field is required" })}
        />
        {errors?.name?.message && <Error>{errors.name.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="max_capacity">Maximum capacity</Label>
        <Input
          type="number"
          id="max_capacity"
          min={1}
          {...register("max_capacity", {
            required: "This field is required",
            max: 8,
          })}
        />
        {errors?.max_capacity?.message && (
          <Error>{errors.max_capacity.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="regular_price">Regular price</Label>
        <Input
          type="number"
          id="regular_price"
          min={1}
          {...register("regular_price", { required: "This field is required" })}
        />
        {errors?.regular_price?.message && (
          <Error>{errors.regular_price.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          min={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value: number) =>
              Number(value) < Number(getValues().regular_price) ||
              "Discount cannot be greater than Regular Price",
          })}
        />
        {errors?.discount?.message && <Error>{errors.discount.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description for website</Label>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", { required: "This field is required" })}
        />
        {errors?.description?.message && (
          <Error>{errors.description.message}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image" /* { required: "This field is required" } */)}
        />
      </FormRow>

      <FormRow>
        <Button type="reset">Cancel</Button>
        <Button type="submit">Add cabin</Button>
      </FormRow>
    </Form>
  );
}

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

export default CreateCabinForm;
