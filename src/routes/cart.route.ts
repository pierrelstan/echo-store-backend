import express from 'express';
import controller from '../controllers/cart.controller';
import authJWT from '../middleware/auth.middleware';

const app = express.Router();

app.post('/add', authJWT, controller.addToCart);
app.get('/:id', authJWT, controller.findCartByUserId);
app.delete('/:id', authJWT, controller.removeCartById);
app.put('/:id', authJWT, controller.updateCart);
app.post('/remove', authJWT, controller.removeCartsIdsAfterTheOrdering);

export = app;
