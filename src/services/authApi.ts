import supabase, { SUPABASE_URL } from "../supabase";

export const login = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error("Authentication failed.");

  return { data, error };
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
};

export const signUp = async (
  fullName: string,
  email: string,
  password: string
) => {
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { fullName, avatar: "" } },
  });

  if (error) throw new Error(error.message);
};

export const getCurrentUser = async () => {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
};

export const updateUserNameAndAvatar = async (fullName?: string, avatar?: File) => {
  // TODO add type
  let userInfo;
  console.log('here');
  if (fullName && !avatar) {
    userInfo = { data: { fullName } };
  }

  const { data, error } = await supabase.auth.updateUser(userInfo);

  if (error) throw new Error(error.message);
  if (!avatar) return data.user;

  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);

  const { data: updatedUser, error: userUpdateError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${SUPABASE_URL}/storage/v1/object/public/avatars/${fileName}`,
      },
    });

    if (userUpdateError) throw new Error(userUpdateError.message);

    return updatedUser.user;
};

export const updateUserPassword = async (password: string) => {
  const { data, error } = await supabase.auth.updateUser({ password });

  if (error) throw new Error(error.message);

  return data?.user;
};
