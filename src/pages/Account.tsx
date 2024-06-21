import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";
import Heading from "../ui/heading";
import Row from "../ui/row";

function Account() {
  return (
    <>
      <Row>
        <Heading>Update user data</Heading>
        <UpdateUserDataForm />
      </Row>

      <Row>
        <Heading>Update password</Heading>
        <UpdatePasswordForm />
      </Row>
    </>
  );
}

export default Account;
