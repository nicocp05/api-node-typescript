import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Query } from 'mongoose';
import { User } from '../interfaces/User.interface';
import { UserModel } from '../models/user.model';

const validateJWT = async ( req: Request, res: Response, next: NextFunction ) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'There is not Token in the request'
        });
    }

    try {

        const secretKey: any = process.env.SECRETKEY;

        const { uid, ...payload }: any = jwt.verify( token, secretKey );

        const user: any = await UserModel.findById( uid );

        if ( !user ) {
            res.status(401).json({
                msg: 'Token is not valid'
            });
        }

        if ( !user.status ) {
            res.status(401).json({
                msg: 'Token is not valid'
            });
        }

        req.params.user = user;

        next();

    } catch (error) {

        console.log(error);
        res.status(401).json({
            msg: 'Token is not valid'
        });

    }
    
}

export default validateJWT;