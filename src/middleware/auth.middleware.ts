import jwt from 'jsonwebtoken'
import env from 'dotenv'
import { Request, Response, NextFunction } from 'express'
import logging from '../utils/logging.util'
const NAMESPACE = 'Auth'

env.config()

const authJWT = (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, 'Validating token')

  let token = req.headers.authorization?.split(' ')[1]

  if (token) {
    jwt.verify(token, process.env.RANDOM_TOKEN_SECRET, (error, decoded) => {
      if (error) {
        return res.status(404).json({
          message: error,
          error,
        })
      } else {
        res.locals.jwt = decoded
        next()
      }
    })
  } else {
    return res.status(401).json({
      message: 'Unauthorized',
    })
  }
}

export default authJWT
