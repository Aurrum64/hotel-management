import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import ButtonIcon from "../ButtonIcon";
import { useDarkModeContext } from "../../context/dark-mode-context";

const DarkModeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useDarkModeContext();

  return (
    <ButtonIcon onClick={toggleDarkMode}>
      {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  );
};

export default DarkModeToggle;
