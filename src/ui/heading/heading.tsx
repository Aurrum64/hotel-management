import { ComponentPropsWithoutRef } from "react";

const Heading = ({ children }: ComponentPropsWithoutRef<"h1">) => (
  <h1>{children}</h1>
);

export default Heading;
