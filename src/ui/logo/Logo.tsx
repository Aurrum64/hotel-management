import styled from "styled-components";
import { useDarkModeContext } from "../../context/dark-mode-context";

const Logo = () => {
  const { isDarkMode } = useDarkModeContext();

  return (
    <StyledLogo>
      <Img src={isDarkMode ? "/logo-dark.png" : "/logo-light.png"} alt="Logo" />
    </StyledLogo>
  );
};

export default Logo;

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;
