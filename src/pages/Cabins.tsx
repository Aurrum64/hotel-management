import { useQuery } from "@tanstack/react-query";
import getCabins from "../services/getCabins";
import CabinTable from "../features/cabins/CabinTable";
import Row from "../ui/Row";
import { RowOrientation } from "../ui/Row/row";
import Heading from "../ui/Heading";
import { useState } from "react";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import Button, { ButtonSize, ButtonVariant } from "../ui/button";
import Modal from "../ui/Modal";
import ModalCompound from "../ui/ModalCompound";

function Cabins() {
  // const [isVisible, setIsVisible] = useState<boolean>(false);

  const { data: cabins, isPending: cabinsAreLoading } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  return cabins ? (
    <>
      <Row orientation={RowOrientation.Horizontal}>
        <Heading>All Cabins</Heading>
        <p>Filter / Sort</p>
      </Row>
      <Row>
        <CabinTable data={cabins} />
      </Row>
      {/* <Button
        variant={ButtonVariant.Primary}
        size={ButtonSize.Medium}
        onClick={() => setIsVisible(true)}
      >
        Toggle Form
      </Button>
      {isVisible && (
        <Modal onClose={() => setIsVisible(false)}>
          <CreateCabinForm onClose={() => setIsVisible(false)} />
        </Modal>
      )} */}
      <ModalCompound>
        <ModalCompound.Open>
          <Button>Toggle Form</Button>
        </ModalCompound.Open>
        <ModalCompound.Window>
          <CreateCabinForm />
        </ModalCompound.Window>
      </ModalCompound>
    </>
  ) : null;
}

export default Cabins;
