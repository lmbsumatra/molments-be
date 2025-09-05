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

export async function getMoments(data: string) {
    const moments = await MomentModel.find({ authorId: data });
    return moments;
}
export async function getMoment(id: string, userId: string) {
    return await MomentModel.findOne({ _id: id, authorId: userId });
}

export async function updateMoment(id: string, data: Partial<momentInput>, userId: string) {
    return await MomentModel.findOneAndUpdate(
        { _id: id, authorId: userId },
        data,
        { new: true }
    );
}

export async function deleteMoment(id: string, userId: string) {
    return await MomentModel.findOneAndDelete({ _id: id, authorId: userId });
}
