import { Router } from "express";
import { registerSchema } from "../validations/user.schema";
import { createUser, deleteUser, getUser, getUsers, updateUser } from "../controller/user.controller";
import { validate } from "../middlewares/validate.middleware";

const router = Router()

router.post('/', validate(registerSchema), createUser);
router.get('/', getUsers);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router
