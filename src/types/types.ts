interface IUser {
  name: string
  email: string
  avatar?: string
}
interface IItem {
  title: string
  description: string
  image?: string
  price: number
  isShirt: boolean
  isJean: boolean
  user: any
}

export { IItem, IUser }
