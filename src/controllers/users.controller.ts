import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import { UserModel } from '../models/user.model';

// URL => /api/users

export const getUsers = async ( req: Request, res: Response ) => {

    const { limit = 5, offset = 0 } = req.query;

    const [ total, users ] = await Promise.all([
        UserModel.countDocuments({status: true}),
        UserModel.find({status: true})
            .skip(Number(offset))
            .limit(Number(limit))
            .select('-password')
    ]);

    res.json({
        total,
        users
    })

}

export const postUser = async ( req: Request, res: Response ) => {
    
    const { name, email, password, role } = req.body;
    const user = new UserModel({name, email, password, role});

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();

    res.json({
        user
    });

}

export const updateUser = async ( req: Request, res: Response ) => {

    const { id } = req.params;
    const { _id, password, google, email, ...rest } = req.body;

    if ( password ) {

        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync(password, salt);

    }

    const user = await UserModel.findByIdAndUpdate( id, rest )
        .select('-password');

    res.json({
        user
    });

}

export const deleteUser = async ( req: Request, res: Response ) => {

    const { id } = req.params;

    const user = await UserModel.findByIdAndUpdate( id, { status: false }, { new: true } )
        .select('-password');
    
    const userAuth = req.params.user;
    
    res.json({
        user, userAuth
    });

}