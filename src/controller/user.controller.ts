import { UserModel } from '../models/user.model';
import type { registerInput } from '../validations/auth.schema';
import bcrypt from "bcrypt";

export async function createUser(data: registerInput) {
  const hashedPassword = await bcrypt.hash(data.password, 10)
  const user = await UserModel.create({ ...data, password: hashedPassword });
  return user;
}

export async function getUsers() {
  const users = await UserModel.find();
  return users;
}

export async function getUser(id: string) {
  const user = await UserModel.findById(id);
  return user;
}

export async function updateUser(id: string, data: Partial<registerInput>) {
  const user = await UserModel.findByIdAndUpdate(id, data, { new: true });
  return user;
}

export async function deleteUser(id: string) {
  const user = await UserModel.findByIdAndDelete(id);
  return user;
}
