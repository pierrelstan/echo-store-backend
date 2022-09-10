import { NextFunction, Request, Response } from 'express'
import Item from '../models/item.model'

const readAll = (req: Request, res: Response, next: NextFunction) => {
  return Item.find()
    .then((items) => res.status(200).json({ items }))
    .catch((error) => res.status(500).json({ error }))
}
const getOneItem = (req: Request, res: Response, next: NextFunction) => {
  const itemId = req.params.id

  return Item.findById(itemId)
    .then((item) =>
      item
        ? res.status(200).json({ item })
        : res.status(404).json({ message: 'not found' })
    )
    .catch((error) => res.status(500).json({ error }))
}

export default { readAll, getOneItem }
