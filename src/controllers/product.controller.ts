import { NextFunction, Request, Response } from 'express'
import Product from '../models/product.model'

const getItems = (req: Request, res: Response, next: NextFunction) => {
  return Product.find()
    .then((products) => res.status(200).json({ products }))
    .catch((error) => res.status(500).json({ error }))
}
const getOneItem = (req: Request, res: Response, next: NextFunction) => {
  const itemId = req.params.id

  return Product.findById(itemId)
    .then((product) => {
      console.log(product)
      product
        ? res.status(200).json({ product })
        : res.status(404).json({ message: 'not found' })
    })

    .catch((error) => res.status(500).json({ error }))
}

export default { getItems, getOneItem }
