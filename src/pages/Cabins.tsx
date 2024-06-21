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
import {
  DISCOUNT_FILTERING_QUERY_PARAM,
  useRadioButtonForFiltering,
} from "../features/cabins/hooks/useRadioButtonForFiltering";
import { Filter } from "../ui/table/types/types";

function Cabins() {
  const { deleteCabinMutation } = useDeleteCabin();
  const { createCabinMutation } = useCreateCabin();
  const filteringRadioButton = useRadioButtonForFiltering();

  const colDefs: ColDef[] = [
    { field: "name", flex: 2, minWidth: 200 },
    { field: "description", flex: 2, minWidth: 200 },
    { field: "discount", flex: 1, minWidth: 100 },
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
      filter={{
        queryParamName: DISCOUNT_FILTERING_QUERY_PARAM,
        transformTemplate: (fieldValue: string) => {
          const filter: Filter = {
            fieldName: DISCOUNT_FILTERING_QUERY_PARAM,
            fieldValue: "0",
            type: "eq",
          };
          switch (fieldValue) {
            case "no-discount":
              return filter;
            case "with-discount":
              return {
                ...filter,
                type: "gt",
              };
            default:
              return undefined;
          }
        },
      }}
      leftToolbarItems={[<Heading>All Cabins</Heading>]}
      rightToolbarItems={[
        filteringRadioButton,
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
