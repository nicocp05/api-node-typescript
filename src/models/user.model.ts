import { Schema, model } from 'mongoose';
import { User } from '../interfaces/User.interface';

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE',
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    status: {
        type: Boolean,
        default: true,
        required: [true, 'Name is required']
    },
    google: {
        type: Boolean,
        default: false
    }
});

export const UserModel = model<User>('User', UserSchema);