import styled from "styled-components";
import { useGetUser } from "./api/useGetUser";

const Avatar = () => {
  const { user } = useGetUser();
  // TODO introduce a type
  const { fullName, avatar } = user?.user_metadata;

  return (
    <AvatarContainer>
      <AvatarImg
        src={avatar || "default-user.jpg"}
        alt={`Avatar of ${fullName}`}
      />
      <span>{fullName}</span>
    </AvatarContainer>
  );
};

export default Avatar;

const AvatarContainer = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);
`;

const AvatarImg = styled.img`
  display: block;
  width: 4rem;
  width: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;
