import { Schema, model } from 'mongoose';
import { Role } from '../interfaces/Role.interface';

const RoleSchema = new Schema({
    role: {
        type: String,
        required: [true, 'Role is required.']
    }
});

export const RoleModel = model<Role>('Role', RoleSchema); 