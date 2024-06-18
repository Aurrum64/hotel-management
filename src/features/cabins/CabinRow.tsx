import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCreateCabin } from "./useCreateCabin";
import { useDeleteCabin } from "./api/useDeleteCabin";

type CabinProps = {
  id: number;
  name: string;
  created_at: string;
  max_capacity: number;
  regular_price: number;
  discount: number;
  description: string;
  image: string;
};

const CabinTableRow = (cabin: CabinProps) => {
  const {
    id,
    name,
    max_capacity: maxCapacity,
    regular_price: regularPrice,
    discount,
    image,
  } = cabin;

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { createCabinMutation } = useCreateCabin();
  const { deleteCabinMutation } = useDeleteCabin();

  return (
    <>
      <TableRow>
        <Img src={image} alt="cabin depiction" />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        <Discount>{formatCurrency(discount)}</Discount>
        <div>
          <button
            onClick={() => {
              let cabinCopy = {
                ...cabin,
                name: `Copy of ${cabin.name}`,
              };
              delete cabinCopy.id;
              delete cabinCopy.created_at;
              createCabinMutation(cabinCopy);
            }}
          >
            <HiSquare2Stack />
          </button>
          <button onClick={() => setIsOpen((isOpen) => !isOpen)}>
            <HiPencil />
          </button>
          <button onClick={() => deleteCabinMutation(id)}>
            <HiTrash />
          </button>
        </div>
      </TableRow>
      {isOpen && <CreateCabinForm cabinToEdit={cabin} />}
    </>
  );
};

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

export default CabinTableRow;
