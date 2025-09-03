// src/controllers/user.controller.ts
import { UserModel } from '../models/user.model';
import type { registerInput } from '../validations/user.schema';

// Pure logic functions (no req/res)
export async function createUserLogic(data: registerInput) {
  const user = await UserModel.create(data);
  return user;
}

export async function getUsersLogic() {
  const users = await UserModel.find();
  return users;
}

export async function getUserLogic(id: string) {
  const user = await UserModel.findById(id);
  return user;
}

export async function updateUserLogic(id: string, data: Partial<registerInput>) {
  const user = await UserModel.findByIdAndUpdate(id, data, { new: true });
  return user;
}

export async function deleteUserLogic(id: string) {
  const user = await UserModel.findByIdAndDelete(id);
  return user;
}
