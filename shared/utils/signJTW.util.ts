import jwt from 'jsonwebtoken';
import logging from './logging.util';
import { IUser } from '../../shared/types/types';

import dotenv from 'dotenv';
dotenv.config();

const NAMESPACE = 'Auth';

const signJWT = (
    user: IUser,
    callback: (error: Error | null, token: string | null) => void
): void => {
    logging.info(NAMESPACE, `Attempting to sign token for ${user._id}`);

    try {
        jwt.sign(
            {
                email: user.email,
            },
            process.env.RANDOM_TOKEN_SECRET,
            {
                expiresIn: 36000,
            },
            (error, token) => {
                if (error) {
                    callback(error, null);
                } else if (token) {
                    callback(null, token);
                }
            }
        );
    } catch (error) {
        logging.error(NAMESPACE, error.message, error);
        callback(error, null);
    }
};

export default signJWT;
