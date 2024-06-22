import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button, { ButtonVariant } from "../../ui/button";
import Input from "../../ui/input";
import { useUpdateUser } from "./api/useUpdateUser";
import styled from "styled-components";

function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;

  const { updateUser, isPending } = useUpdateUser();

  const onSubmit: SubmitHandler<FieldValues> = ({ password }) => {
    updateUser({ password }, { onSuccess: reset });
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Label htmlFor="password">Password (min 8 characters)</Label>
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          disabled={isPending}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
        {errors?.password?.message && (
          <Error>{errors.password.message as string}</Error>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="passwordConfirm">Confirm password</Label>
        <Input
          type="password"
          autoComplete="new-password"
          id="passwordConfirm"
          disabled={isPending}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              getValues().password === value || "Passwords need to match",
          })}
        />
        {errors?.passwordConfirm?.message && (
          <Error>{errors.passwordConfirm.message as string}</Error>
        )}
      </FormRow>
      <FormRow>
        <Button onClick={reset} type="reset" variant={ButtonVariant.Secondary}>
          Cancel
        </Button>
        <Button type="submit" disabled={isPending}>
          Update password
        </Button>
      </FormRow>
    </StyledForm>
  );
}

export default UpdatePasswordForm;

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
