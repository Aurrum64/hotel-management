import { ComponentPropsWithoutRef } from "react";
import styled, { css } from "styled-components";

export enum RowOrientation {
  Vertical = "vertical",
  Horizontal = "horizontal",
}

type RowProps = ComponentPropsWithoutRef<"div"> & {
  orientation?: RowOrientation;
};

const Row = ({ children, orientation = RowOrientation.Vertical }: RowProps) => (
  <StyledDiv $orientation={orientation}>{children}</StyledDiv>
);

const StyledDiv = styled.div<{ $orientation: RowOrientation }>`
  display: flex;

  ${(props) =>
    props.$orientation === RowOrientation.Horizontal &&
    css`
      justify-content: space-between;
      align-items: center;
    `}

  ${(props) =>
    props.$orientation === RowOrientation.Vertical &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}
`;

export default Row;
