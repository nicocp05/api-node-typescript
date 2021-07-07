
import { RoleModel } from "../models/role.model";
import { UserModel } from "../models/user.model";


export const isRoleValid = async(role = '') => {
    const existsRole = await RoleModel.findOne({role});
    if (!existsRole) {
        throw new Error(`Role ${role} was not found`);
    }
}

export const existsEmail = async (email = '') => {

    const existsEmail = await UserModel.findOne({email});

    if (existsEmail) {
        throw new Error('Email is already registered')
    }
}

export const existsUserbyId = async (id: any) => {

    const existsUser = await UserModel.findById(id);

    if (!existsUser) {
        throw new Error('ID not founded')
    }
}