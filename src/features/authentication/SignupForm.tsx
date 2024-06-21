import styled from "styled-components";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import Button, { ButtonVariant } from "../../ui/button";
import Input from "../../ui/input";
import { useSignUp } from "./api/useSignUp";

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
  } = useForm();

  const { signUp, isPending } = useSignUp();

  const onSubmit: SubmitHandler<FieldValues> = ({
    fullName,
    email,
    password,
  }) => {
    signUp({ fullName, email, password }, { onSettled: () => reset() });
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Label htmlFor="fullName">Full Name</Label>
        <Input
          type="text"
          id="fullName"
          {...register("fullName", { required: "This field is required" })}
        />
        {errors?.["fullName"]?.message && (
          <Error>{errors["fullName"].message as string}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please enter a valid email address",
            },
          })}
        />
        {errors?.["email"]?.message && (
          <Error>{errors["email"].message as string}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="password">Password (min 8 characters)</Label>
        <Input
          type="password"
          id="password"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "The password should contain at least 8 symbols",
            },
          })}
        />
        {errors?.["password"]?.message && (
          <Error>{errors["password"].message as string}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="passwordConfirm">Repeat password</Label>
        <Input
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value: string) =>
              value === getValues()["password"] || "Passwords do not match",
          })}
        />
        {errors?.["passwordConfirm"]?.message && (
          <Error>{errors["passwordConfirm"].message as string}</Error>
        )}
      </FormRow>

      <FormRow>
        <Button variant={ButtonVariant.Secondary} type="reset">
          Cancel
        </Button>
        <Button type="submit">Create new user</Button>
      </FormRow>
    </StyledForm>
  );
};

export default SignUpForm;

const StyledForm = styled.form`
  padding: 2.4rem 4rem;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
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
