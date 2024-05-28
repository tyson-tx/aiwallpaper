import { findUserByEmail, insertUser } from "@/models/users";

import { User } from "@/types/user";

export async function saveUser(user: User) {
  try {
    const existUser = await findUserByEmail(user.email);
    if (!existUser) {
      await insertUser(user);
    }
  } catch (e) {
    console.log("save user failed: ", e);
  }
}