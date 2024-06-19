import Heading from "../ui/Heading";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import Button, { ButtonSize } from "../ui/button";
import ModalCompound from "../ui/ModalCompound";
import Modal from "../ui/modal/index";
import Table from "../ui/table";
import { ColDef, ICellRendererParams } from "@ag-grid-community/core";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useDeleteCabin } from "../features/cabins/api/useDeleteCabin";
import { useCreateCabin } from "../features/cabins/useCreateCabin";

function Cabins() {
  const { deleteCabinMutation } = useDeleteCabin();
  const { createCabinMutation } = useCreateCabin();

  const colDefs: ColDef[] = [
    /* { field: "created_at", flex: 1 }, */
    { field: "name", flex: 2, minWidth: 200 },
    { field: "description", flex: 2, minWidth: 200 },
    { field: "discount", flex: 1, minWidth: 100 },
    /* { field: "id", flex: 1 }, */
    /* { field: "image", flex: 1 }, */
    { field: "max_capacity", flex: 1, minWidth: 100 },
    { field: "regular_price", flex: 1, minWidth: 100 },
    {
      field: "",
      flex: 0.5,
      minWidth: 100,
      // TODO Change it to an array of React Elements
      cellRenderer: ({ data }: ICellRendererParams) => (
        <>
          <button
            onClick={() => {
              let cabinCopy = {
                ...data,
                name: `Copy of ${data.name}`,
              };
              delete cabinCopy.id;
              delete cabinCopy.created_at;
              createCabinMutation(cabinCopy);
            }}
          >
            <HiSquare2Stack />
          </button>
          <Modal
            visibilityButton={
              <button>
                <HiPencil />
              </button>
            }
          >
            <CreateCabinForm cabinToEdit={data} />
          </Modal>
          <button onClick={() => deleteCabinMutation(data.id)}>
            <HiTrash />
          </button>
        </>
      ),
    },
  ];

  return (
    <Table
      tableName="cabins"
      columns={colDefs}
      leftToolbarItems={[<Heading>All Cabins</Heading>]}
      rightToolbarItems={[
        <ModalCompound key="createCabin">
          <ModalCompound.Open>
            <Button size={ButtonSize.Small}>Create Cabin</Button>
          </ModalCompound.Open>
          <ModalCompound.Window>
            <CreateCabinForm />
          </ModalCompound.Window>
        </ModalCompound>,
      ]}
    />
  );
}

export default Cabins;
