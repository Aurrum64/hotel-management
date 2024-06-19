import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar";
import Header from "../header";
import styled from "styled-components";
import MainNav from "../main-nav";
import Logo from "../logo";

const AppLayout = () => (
  <StyledAppLayout>
    <Sidebar>
      <Logo />
      <MainNav />
    </Sidebar>
    <Header />
    <StyledMain>
      <Outlet />
    </StyledMain>
  </StyledAppLayout>
);

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100dvh;
`;

const StyledMain = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow-y: scroll;
`;

export default AppLayout;
