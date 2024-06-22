import styled from "styled-components";
import { useState } from "react";
import Button, { ButtonVariant } from "../../ui/button";
import FileInput from "../../ui/FileInput";
import Input from "../../ui/input";
import { useGetUser } from "./api/useGetUser";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useUpdateUser } from "./api/useUpdateUser";

function UpdateUserDataForm() {
  const {
    user: {
      email,
      user_metadata: { fullName: currentFullName },
    },
  } = useGetUser();

  const { updateUser } = useUpdateUser();

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(null);

  const handleSubmit: SubmitHandler<FieldValues> = (e) => {
    e.preventDefault();
    if (!fullName) return;
    console.log("here");
    updateUser({ fullName, avatar });
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <FormRow>
        <Label htmlFor="email">Email address</Label>
        <Input value={email} id="email" disabled />
      </FormRow>
      <FormRow>
        <Label htmlFor="fullName">Full name</Label>
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
        />
      </FormRow>
      <FormRow>
        <Label htmlFor="avatar">Avatar image</Label>
        <FileInput
          id="avatar"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
        />
      </FormRow>
      <FormRow>
        <Button type="reset" variant={ButtonVariant.Secondary}>
          Cancel
        </Button>
        <Button type="submit">Update account</Button>
      </FormRow>
    </StyledForm>
  );
}

export default UpdateUserDataForm;

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
