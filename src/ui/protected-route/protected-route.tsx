import { PropsWithChildren, useEffect } from "react";
import styled from "styled-components";
import { useGetUser } from "../../features/authentication/api/useGetUser";
import Spinner from "../Spinner";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();

  const { isAuthenticated, isFetching } = useGetUser();

  useEffect(() => {
    !isFetching && !isAuthenticated && navigate("/login");
  }, [isAuthenticated, isFetching, navigate]);

  if (isFetching) {
    return (
      <FullPageOverlay>
        <Spinner />
      </FullPageOverlay>
    );
  }

  return isAuthenticated ? children : null;
};

export default ProtectedRoute;

const FullPageOverlay = styled.div`
  height: 100dvh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;
