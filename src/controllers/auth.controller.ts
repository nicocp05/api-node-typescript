import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import { generateJWT } from '../helpers/generate-jwt';
import { UserModel } from '../models/user.model';

export const login = async ( req: Request, res: Response ) => {
   
    const { email, password } = req.body;

    try {
        
        const user = await UserModel.findOne({email});
        if (!user) {
            return res.status(400).json({
                msg: 'User / Password are not correct'
            });
        }

        if (!user.status) {
            return res.status(400).json({
                msg: 'User / Password are not correct'
            });
        }

        const validPassword = bcryptjs.compareSync( password, (user.password).toString() );     
        if (!validPassword) {
            return res.status(400).json({
                msg: 'User / Password are not correct'
            });
        }

        const token = await generateJWT( user.id );

        res.json({
            user,
            token
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error processing this request'
        });   
    }

}
