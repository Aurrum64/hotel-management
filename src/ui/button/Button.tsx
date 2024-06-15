import { ComponentPropsWithoutRef, forwardRef } from "react";
import styled from "styled-components";
import { sizes, variants } from "./config";

export enum ButtonVariant {
  Primary = "primary",
  Secondary = "secondary",
  Danger = "danger",
}

export enum ButtonSize {
  Small = "small",
  Medium = "medium",
  Large = "large",
}

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = ButtonVariant.Primary,
      size = ButtonSize.Medium,
      children,
      ...props
    },
    ref
  ) => (
    <StyledButton
      $variant={variant}
      $size={size}
      type="button"
      ref={ref}
      {...props}
    >
      {children}
    </StyledButton>
  )
);

const StyledButton = styled.button<{
  $variant: ButtonVariant;
  $size: ButtonSize;
}>`
  border: none;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  ${(props) => variants[props.$variant]}
  ${(props) => sizes[props.$size]}
`;

export default Button;
