import mongoose, { Schema } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import isEmail from 'validator/lib/isEmail'

class User {
  initSchema () {
    const schema = new Schema(
      {
        name: { type: String, trim: true, required: true },
        email: {
          type: String,
          unique: true,
          required: true,
          lowercase: true,
          trim: true,
          validate: [isEmail, 'Email invalide']
        },
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
