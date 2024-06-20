import styled, { css } from "styled-components";

type RadioButtonOption = {
  value: string;
  label?: string;
};

type RadioButtonProps = {
  options: RadioButtonOption[];
  onOptionClick: (value: string) => void;
  activeOptionCondition: (value: string) => boolean;
};

const RadioButton = ({
  options,
  onOptionClick,
  activeOptionCondition,
}: RadioButtonProps) => {
  return (
    <StyledFilter>
      {options.map(({ label, value }) => (
        <FilterButton
          onClick={() => onOptionClick(value)}
          $active={activeOptionCondition(value)}
        >
          {label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
};

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button<{ $active?: boolean }>`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.$active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
  &:focus {
    display: none;
  }
`;

export default RadioButton;
export type { RadioButtonOption };
