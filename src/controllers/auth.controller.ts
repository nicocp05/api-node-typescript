import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import { generateJWT } from '../helpers/generate-jwt';
import { UserModel } from '../models/user.model';
import { googleVerify } from '../helpers/google-verify';

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

        const userPassword: any = user.password;

        const validPassword = bcryptjs.compareSync( password, userPassword );     
        if (!validPassword) {
            return res.status(400).json({
                msg: 'User / Password are not correct'
            });
        }

        const token = await generateJWT( user._id );

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

export const googleSignIn = async ( req: Request, res: Response ) => {

    const { id_token } = req.body;

    try {
    
        const { name, email, img } = await googleVerify( id_token );
        
        let user = await UserModel.findOne({ email });

        if ( !user ) {
            
            const data = {
                name, 
                email, 
                password: '',
                img, 
                google: true
            }

            user = new UserModel( data );

            await user.save();

        }

        if ( !user.status ) {
            return res.status(401).json({
                msg: 'User blocked'
            });
        }

        const token = await generateJWT( user._id );
        
        res.json({
            user,
            token
        });

    } catch (error) {
        
        res.status(400).json({
            msg: 'Google Token is not valid'
        });

    }


}
