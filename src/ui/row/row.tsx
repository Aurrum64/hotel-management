import { ComponentPropsWithoutRef } from "react";

const Row = ({ children }: ComponentPropsWithoutRef<"div">) => (
  <div>{children}</div>
);

export default Row;
