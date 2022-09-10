interface IUser {
  _id: string
  email: string
  password: string
  hash: string
  validPassword: any
}
interface IItem {
  title: string
  description: string
  image?: string
  price: number
  isShirt: boolean
  isJean: boolean
  userId: any
}

interface ICart {
  userId: string
  itemId: any
  quantity: number
  isAddedToCart: Boolean
}

export { IItem, IUser, ICart }
