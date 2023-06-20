import { NextFunction, Request, Response } from 'express';
import Product from '../models/product.model';
import Cart from '../models/cart.model';
import { validationResult } from 'express-validator';

const addToCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req);
        const { userId, itemId } = req.body;
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
            });
        }

        const item = await Product.findById({
            _id: itemId,
        });

        // find if cart already exist for the user
        Cart.findOne(
            { itemId: itemId, userId: userId },
            function async(err: any, alreadyExistCart: any) {
                if (err) console.log(err);
                if (alreadyExistCart) {
                    return res.status(401).json({
                        errors: [{ msg: 'This has already been saved' }],
                    });
                }
            }
        );
        try {
            const cart = new Cart({
                itemId: item._id,
                userId: userId,
                isAddedToCart: true,
            });
            const carts = await cart.populate({
                path: 'itemId',
                model: 'Product',
            });
            await carts.save();
            res.status(201).json(carts);
        } catch (error) {
            res.status(404).json({
                error: error,
            });
        }
    } catch (error) {
        res.status(404).json({
            error: error,
        });
    }
};

const findCartByUserId = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.params.id;
        const cart = await Cart.find({ userId });
        const cartsArray = [];
        cart.filter((el) => {
            if (el.itemId !== null) cartsArray.push(el);
        });
        res.status(201).json(cartsArray);
    } catch (error) {
        res.status(404).json({
            error: error,
        });
    }
};

const updateCart = async (req: Request, res: Response, next: NextFunction) => {
    const cartUserId = await Cart.findById({ _id: req.params.id });
    const { userId } = cartUserId;

    try {
        const carts = new Cart({
            _id: req.params.id,
            quantity: req.body.number.quantity,
            update: req.body.update,
            userId: userId,
        });

        await Cart.findOneAndUpdate(
            {
                _id: req.params.id,
            },
            carts,
            function (error: any) {
                if (error) console.log(error);
                res.status(201).json({
                    message: 'Cart Updated Successfully',
                });
            }
        );
    } catch (error: any) {
        res.status(404).json({
            error: error,
        });
    }
};

const removeCartById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const cartId = req.params.id;
        await Cart.findOneAndDelete({
            _id: cartId,
        });
        res.status(201).json({
            message: 'Delete successfuly !',
        });
    } catch (error) {
        res.status(404).json({
            error: error,
        });
    }
};

const removeCartsIdsAfterTheOrdering = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { cartIds } = req.body;
    try {
        const cart = await Cart.deleteMany({
            _id: {
                $in: cartIds,
            },
        });

        res.status(201).json({
            message: 'Carts remove successfully !',
        });
    } catch (error) {
        return res.status(404).json({
            error: error,
        });
    }
};

export default {
    addToCart,
    removeCartsIdsAfterTheOrdering,
    removeCartById,
    updateCart,
    findCartByUserId,
};
