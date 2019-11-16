import mongoose from 'mongoose'

class Service {
  constructor (model) {
    this.model = model
  }

  readAll = async query => {
    let { skip, limit } = query

    skip = skip ? Number(skip) : 0
    limit = limit ? Number(limit) : 10

    delete query.skip
    delete query.limit

    if (query._id) {
      try {
        query._id = new mongoose.mongo.ObjectId(query._id)
      } catch (error) {
        console.log('not able to generate mongoose id with content', query._id)
      }
    }

    const data = await this.model
      .find(query)
      .skip(skip)
      .limit(limit)
    const total = await this.model.countDocuments()

    return { data, total }
  }

  read = id => this.model.findById(id)

  create = data => this.model.create(data)

  update = (id, data) => this.model.findByIdAndUpdate(id, data, { new: true })

  delete = async id => {
    const data = await this.model.findByIdAndDelete(id)
    if (!data) return { data, message: 'not found' }
    return { data }
  }
}

export default Service
