import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';
import logging from '../utils/logging.util';
import User from '../models/user.model';
import signJWT from '../utils/signJTW.util';

const NAMESPACE = 'User';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Token validated, user authorized.');

    return res.status(200).json({
        message: 'Token(s) validated',
    });
};

const register = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body; // see if user exists
    console.log(req.body);
    const user = await User.findOne({
        email,
    });
    if (user) {
        return res.status(400).json({
            errors: [{ msg: 'User already exits' }],
        });
    }

    bcryptjs.hash(password, 10, (hashError: { message: any }, hash: any) => {
        if (hashError) {
            return res.status(401).json({
                message: hashError.message,
                error: hashError,
            });
        }

        const _user = new User({
            _id: new mongoose.Types.ObjectId(),
            email,
            password: hash,
        });

        return _user
            .save()
            .then((user) => {
                return res.status(201).json({
                    user,
                });
            })
            .catch((error) => {
                return res.status(500).json({
                    message: error.message,
                    error,
                });
            });
    });
};

const login = (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    console.log(req.body);
    User.find({ email })
        .exec()
        .then((users) => {
            if (users.length !== 1) {
                return res.status(401).json({
                    message: 'Unauthorized',
                });
            }

            bcryptjs.compare(
                password,
                users[0].password,
                (error: any, result: any) => {
                    if (error) {
                        return res.status(401).json({
                            message: 'Password Mismatch',
                        });
                    } else if (result) {
                        signJWT(users[0], (_error, token) => {
                            if (_error) {
                                return res.status(500).json({
                                    message: _error.message,
                                    error: _error,
                                });
                            } else if (token) {
                                return res.status(200).json({
                                    message: 'Auth successful',
                                    token: token,
                                    user: users[0],
                                });
                            }
                        });
                    }
                }
            );
        })
        .catch((err) => {
            res.status(500).json({
                error: err,
            });
        });
};

const getAllUsers = (req: Request, res: Response, next: NextFunction) => {
    User.find()
        .select('-password')
        .exec()
        .then((users) => {
            return res.status(200).json({
                users: users,
                count: users.length,
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error,
            });
        });
};

export default { validateToken, register, login, getAllUsers };
