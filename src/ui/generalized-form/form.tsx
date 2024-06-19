import styled, { css } from "styled-components";
import { FocusEvent, ReactElement, useEffect } from "react";
import Input from "../input";
import { useForm, RegisterOptions } from "react-hook-form";
import Textarea from "../Textarea";
import FileInput from "../FileInput";
import Button from "../button";
import { SimpleMap } from "../../types/common-types";

export type FormControlProps = {
  id: string;
  label?: string;
  type?: FormControlType;
  required?: boolean;
  disabled?: boolean;
  validations?: Omit<RegisterOptions, "required">;
  // defaultValue?: string | number;
  onBlur?: <T>(e: FocusEvent<T, Element>) => void;
};

type FormProps = {
  controls: FormControlProps[];
  // Submition might occure on custom onBlur
  onFormSubmit?: (data: any) => void; // TODO Check any
  type?: "regular" | "modal";
  onOkText?: string;
  onClose?: () => void;
  defaultValues?: SimpleMap<string | number>;
  withFooterButtons?: boolean;
};

type FormControlType = "text" | "number" | "description" | "image";

const Form = ({
  controls,
  type = "regular",
  onFormSubmit,
  onOkText = "Submit",
  onClose,
  defaultValues,
  withFooterButtons = true,
}: FormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
    setValue,
  } = useForm();

  useEffect(() => {
    defaultValues &&
      Object.entries(defaultValues).forEach(([key, value]) =>
        setValue(key, value)
      );
  }, [getValues, setValue, defaultValues]);

  return (
    <StyledForm $type={type} onSubmit={handleSubmit(onFormSubmit)}>
      {controls.map(
        ({
          label,
          id,
          type = "text",
          required = true,
          validations,
          ...rest
        }) => {
          const options: RegisterOptions = {
            // ...validations,
            required: required ? "This field is required" : undefined,
          };

          const wrapIntoFormRow = (control: ReactElement) => (
            <FormRow key={id}>
              <Label htmlFor={id}>{label}</Label>
              {control}
              {errors?.[id]?.message && (
                <Error>{errors[id]?.message as string}</Error>
              )}
            </FormRow>
          );

          switch (type) {
            case "text":
            case "number":
              return wrapIntoFormRow(
                <Input
                  type={type}
                  id={id}
                  {...register(id, options)}
                  {...rest}
                />
              );
            case "description":
              return wrapIntoFormRow(
                <Textarea id={id} {...register(id, options)} {...rest} />
              );
            case "image":
              return wrapIntoFormRow(
                <FileInput
                  id={id}
                  accept="image/*"
                  {...register(id, options)}
                />
              );
            default:
              return null;
          }
        }
      )}
      {withFooterButtons && (
        <FormRow>
          <Button type="reset" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">{onOkText}</Button>
        </FormRow>
      )}
      {/* <FormRow>
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
      </FormRow> */}

      {/* <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput
          id="image"
          accept="image/*"
          {...register(
            "image",
            true ? {} : { required: "This field is required" }
          )}
        />
      </FormRow>
*/}
    </StyledForm>
  );
};

const StyledForm = styled.form<{ $type: "regular" | "modal" }>`
  ${(props) =>
    props.$type === "regular" &&
    css`
      padding: 2.4rem 4rem;
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);
    `}

  ${(props) =>
    props.$type === "modal" &&
    css`
      width: 80rem;
    `}
    
  overflow: hidden;
  font-size: 1.4rem;
`;

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

export default Form;
