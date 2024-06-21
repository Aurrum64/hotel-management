import styled from "styled-components";
import LogoutButton from "../../features/authentication/components/logout-button";
import ButtonIcon from "../ButtonIcon";
import { useNavigate } from "react-router-dom";
import { HiOutlineUser } from "react-icons/hi2";
import Avatar from "../../features/authentication/UserAvatar";

const Header = () => {
  const navigate = useNavigate();

  return (
    <StyledHeader>
      <HeaderMenu>
        <li>
          <Avatar />
        </li>
        <li>
          <ButtonIcon onClick={() => navigate("/account")}>
            <HiOutlineUser />
          </ButtonIcon>
        </li>
        <li>
          <LogoutButton />
        </li>
      </HeaderMenu>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border: 1px solid var(--color-grey-100);
`;

const HeaderMenu = styled.ul`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
`;

export default Header;
