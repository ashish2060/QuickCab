import { currentUser } from "@clerk/nextjs/server";

export const getUserId = async () => {
  const user = await currentUser();
  return user.id;
};
