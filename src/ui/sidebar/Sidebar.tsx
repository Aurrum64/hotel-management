import { ComponentPropsWithoutRef } from "react";
import styled from "styled-components";

const Sidebar = ({ children }: ComponentPropsWithoutRef<"aside">) => (
  <StyledAside>{children}</StyledAside>
);

const StyledAside = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border: 1px solid var(--color-grey-100);
  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

export default Sidebar;
