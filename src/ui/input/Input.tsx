import { ComponentPropsWithoutRef, forwardRef } from "react";
import styled from "styled-components";

const Input = forwardRef<HTMLInputElement, ComponentPropsWithoutRef<"input">>(
  ({ children, ...props }, ref) => (
    <StyledInput {...props} ref={ref}>
      {children}
    </StyledInput>
  )
);

const StyledInput = styled.input`
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 0.8rem 1.2rem;
`;

export default Input;
