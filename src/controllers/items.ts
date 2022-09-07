import { NextFunction, Request, Response } from 'express'
import Item from '../models/item'

const readAll = (req: Request, res: Response, next: NextFunction) => {
  return Item.find()
    .then((items) => res.status(200).json({ items }))
    .catch((error) => res.status(500).json({ error }))
}

export default { readAll }
