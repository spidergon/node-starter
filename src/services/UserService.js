import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Service from './Service'
import env from '../../config/env'

class UserService extends Service {
  constructor (model) {
    super(model)
    this.model = model
  }

  signup = async (body, next, fallback) => {
    const { email, password } = body
    // TODO: check email
    const hash = await bcrypt.hash(password, 10)
    this.model
      .create({ email, password: hash })
      .then(next)
      .catch(fallback)
  }

  login = async (body, next, fallback) => {
    const { email, password } = body

    const user = await this.model.findOne({ email })
    if (!user) return fallback({ message: 'User not found' })

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) return fallback({ message: 'Incorrect password' })

    const token = jwt.sign({ userId: user._id }, env.secret, {
      expiresIn: '24h'
    })
    next({ userId: user._id, token })
  }
}

export default UserService
