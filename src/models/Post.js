import mongoose, { Schema } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import slugify from 'slugify'

class Post {
  initSchema () {
    const schema = new Schema(
      {
        title: {
          type: String,
          required: true
        },
        slug: String,
        subtitle: {
          type: String,
          required: false
        },
        description: {
          type: String,
          required: false
        },
        content: {
          type: String,
          required: true
        }
      },
      { timestamps: true }
    )

    schema.pre(
      'save',
      async function (next) {
        const self = this // eslint-disable-line babel/no-invalid-this
        if (!self.isModified('title')) {
          return next()
        }
        self.slug = slugify(self.title)
        const slugRegEx = new RegExp(`^(${self.slug})((-[0-9]*$)?)$`, 'i')
        const eventsWithSlug = await self.constructor.find({ slug: slugRegEx })
        if (eventsWithSlug.length) {
          self.slug = `${self.slug}-${eventsWithSlug.length + 1}`
        }
        next()
      },
      err => console.log(err)
    )

    schema.plugin(uniqueValidator)

    mongoose.model('posts', schema)
  }

  getInstance () {
    this.initSchema()
    return mongoose.model('posts')
  }
}

export default Post
