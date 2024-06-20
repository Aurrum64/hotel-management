import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import {
  PAGINATION_QUERY_PARAM_NAME,
  ROWS_PER_PAGE,
} from "../constants/constants";
import { getCurrentPage, getTotalPages } from "../utils/helpers";

type PaginationProps = {
  count: number;
  rowsPerPage?: number;
};

export const Pagination = ({ count }: PaginationProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = getCurrentPage(searchParams);
  const pageCount = getTotalPages(count);

  if (pageCount < 2) return null;

  const nextPage = () => {
    const next = currentPage + 1;
    searchParams.set(PAGINATION_QUERY_PARAM_NAME, String(next));
    setSearchParams(searchParams);
  };

  const prevPage = () => {
    const prev = currentPage - 1;
    searchParams.set(PAGINATION_QUERY_PARAM_NAME, String(prev));
    setSearchParams(searchParams);
  };

  return (
    <PaginationContainer>
      <StyledP>
        Showing <span>{(currentPage - 1) * ROWS_PER_PAGE + 1}</span> to{" "}
        <span>
          {currentPage === pageCount ? count : currentPage * ROWS_PER_PAGE}
        </span>{" "}
        of <span>{count}</span>
      </StyledP>
      <Buttons>
        <PaginationButton onClick={prevPage} disabled={currentPage === 1}>
          <HiChevronLeft />
          <span>Previous</span>
        </PaginationButton>
        <PaginationButton
          onClick={nextPage}
          disabled={currentPage === pageCount}
        >
          <span>Next</span>
          <HiChevronRight />
        </PaginationButton>
      </Buttons>
    </PaginationContainer>
  );
};

const PaginationContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
`;

const StyledP = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button<{ active?: boolean }>`
  background-color: ${(props) =>
    props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;
