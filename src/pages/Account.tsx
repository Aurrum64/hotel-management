import Heading from "../ui/heading";
import Row from "../ui/row";
import Table from "../ui/table";

function Account() {
  return (
    <>
      <Heading>Update your account</Heading>

      <Row>
        <Heading>Update user data</Heading>
        <p>Update user data form</p>
      </Row>

      <Row>
        <Heading>Update password</Heading>
        <p>Update user password form</p>
      </Row>
      <Table />
    </>
  );
}

export default Account;
