import { useSearchParams } from "react-router-dom";
import RadioButton, { RadioButtonOption } from "../../../ui/radio-button";

export const DISCOUNT_FILTERING_QUERY_PARAM = "discount";

const options: RadioButtonOption[] = [
  { label: "All", value: "all" },
  { label: "No Discount", value: "no-discount" },
  { label: "With discount", value: "with-discount" },
];

export const useRadioButtonForFiltering = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const onClick = (value: string) => {
    searchParams.set(DISCOUNT_FILTERING_QUERY_PARAM, value);
    setSearchParams(searchParams);
  };

  const activeCondition = (value: string) =>
    searchParams.get(DISCOUNT_FILTERING_QUERY_PARAM) === value;

  return (
    <RadioButton
      onOptionClick={onClick}
      activeOptionCondition={activeCondition}
      options={options}
    />
  );
};
