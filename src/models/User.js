import mongoose, { Schema } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

class User {
  initSchema () {
    const schema = new Schema(
      {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true }
      },
      { timestamps: true }
    )

    schema.plugin(uniqueValidator)

    mongoose.model('User', schema)
  }

  getInstance () {
    this.initSchema()
    return mongoose.model('User')
  }
}

export default User
