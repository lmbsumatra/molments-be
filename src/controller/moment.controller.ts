import { MomentModel } from "../models/moment.model";
import { UserModel } from "../models/user.model";
import { momentInput } from "../validations/moment.schema";

export async function createMoment(data: momentInput) {
    const authorExists = await UserModel.exists({ _id: data.authorId });
    if (!authorExists) {
        throw new Error("Invalid authorId: no matching user found");
    }
    const moment = await MomentModel.create(data)
    return moment;
}