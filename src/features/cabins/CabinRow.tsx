import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { useMutation } from "@tanstack/react-query";
import deleteCabins from "../../services/deleteCabins";
import { useQueryClient } from "@tanstack/react-query";

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

const CabinTableRow = ({
  id,
  name,
  max_capacity: maxCapacity,
  regular_price: regularPrice,
  discount,
}: CabinProps) => {
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: deleteCabins,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cabins"] }),
  });

  return (
    <TableRow>
      <Img src="https://ldgkibmeadawgotmcrwh.supabase.co/storage/v1/object/public/cabin-images/cabin-007.jpg" />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      <Discount>{formatCurrency(discount)}</Discount>
      <button onClick={() => mutate(id)}>Delete</button>
    </TableRow>
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
