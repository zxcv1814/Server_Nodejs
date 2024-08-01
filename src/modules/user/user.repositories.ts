import { Model } from 'mongoose';
import { IUser, User } from '../../models/user.schema';
import * as bcrypt from 'bcryptjs';

export class UserRepository {


    private model: Model<IUser>;

    constructor(model: Model<IUser>) {
        this.model = model;
    }

    async create(userData: Partial<IUser>) {
        const hashedPassword = await bcrypt.hash(userData.password!, 10);
        const newUser = new User({
            username: userData.username,
            email: userData.email,
            password: hashedPassword,
            createdAt: new Date,
            updateAt: new Date
        });
        await newUser.save();
    }
    async findOne(email: string): Promise<IUser | null> {
        return this.model.findOne({ email }).exec();
    }
}
