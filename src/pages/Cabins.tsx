import { useQuery } from "@tanstack/react-query";
import getCabins from "../services/getCabins";
import CabinTable from "../features/cabins/CabinTable";
import Row from "../ui/Row";
import { RowOrientation } from "../ui/Row/row";
import Heading from "../ui/Heading";

function Cabins() {
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
    </>
  ) : null;
}

export default Cabins;
