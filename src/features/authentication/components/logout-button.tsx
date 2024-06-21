import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../../ui/ButtonIcon";
import { useLogout } from "../api/useLogout";
import SpinnerMini from "../../../ui/SpinnerMini";

const LogoutButton = () => {
  const { logout, isPending } = useLogout();

  return (
    <ButtonIcon onClick={() => logout()}>
      {isPending ? <SpinnerMini /> : <HiArrowRightOnRectangle />}
    </ButtonIcon>
  );
};

export default LogoutButton;
