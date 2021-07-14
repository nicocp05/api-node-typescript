import jwt from 'jsonwebtoken';

export const generateJWT = ( uid: String = '' ) => {

    return new Promise( ( resolve, reject ) => {

        const payload = { uid }

        const secretKey: any = process.env.SECRETKEY;

        jwt.sign( payload, secretKey, {
            expiresIn: '4h'
        }, (err, token) => {

            if (err) {
                console.log(err);
                reject( 'Could not generate JWT' )
            } else {
                resolve(token);
            }
        });
    });
}