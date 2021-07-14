import { Request, Response, NextFunction } from "express";

export const isAdminRole = ( req: Request, res: Response, next: NextFunction ) => {
    
    if ( !req.params.user ) {
        return res.status(500).json({
            msg: 'You want to verify the role without validating the token first'
        });
    }

    const { role, name }: any = req.params.user;

    if ( role !== 'ADMIN_ROLE' ) {
        res.status(401).json({
            msg: `${name} is not admin`
        });
    }

    next();

}

export const validRole = ( ...roles: String[] ) => {
    return ( req: Request, res: Response, next: NextFunction ) => {

        if ( !req.params.user ) {
            return res.status(500).json({
                msg: 'You want to verify the role without validating the token first'
            });
        }

        const { role }: any = req.params.user;

        if ( !roles.includes( role ) ) {
            return res.status(500).json({
                msg: `One of these roles is required ( ${roles} )`
            });
        }

        next();

    }
}