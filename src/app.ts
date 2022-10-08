import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import productRoutes from './routes/product.route';
import userRoutes from './routes/user.route';
import cartRoutes from './routes/cart.route';

import dotenv from 'dotenv';
dotenv.config();

const app = express();

mongoose
    .connect(process.env.MONGODB_API_KEY, { retryWrites: true, w: 'majority' })
    .then(() => {
        console.log('Successfully connected to MONGODB ATLAS!');
        app.use(express.urlencoded({ extended: true }));
        app.use(express.json());

        /** Rules of our API */

        app.options('*', cors());
        app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header(
                'Access-Control-Allow-Headers',
                'Origin, X-Requested-With, Content-Type, Accept, Authorization'
            );

            if (req.method == 'OPTIONS') {
                res.header(
                    'Access-Control-Allow-Methods',
                    'PUT, POST, PATCH, DELETE, GET'
                );
                return res.status(200).json({});
            }

            next();
        });

        /** Routes */
        app.use('/products', productRoutes);
        app.use('/user', userRoutes);
        app.use('/cart', cartRoutes);

        /** Healthcheck */
        app.get('/ping', (req, res, next) =>
            res.status(200).json({ hello: 'world' })
        );

        /** Welcome to echo store */
        app.get('/', (req, res, next) =>
            res.status(200).json({ message: 'Welcome to echo store' })
        );

        /** Error handling */
        app.use((req, res, next) => {
            const error = new Error('Not found');
            res.status(404).json({
                message: error.message,
            });
        });
    })
    .catch((error) => {
        console.log('Unable to connect to MONGODB ATLAS!');
        console.error(error);
    });

export { app };
