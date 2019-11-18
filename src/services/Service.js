import mongoose from 'mongoose'

class Service {
  constructor (model) {
    this.model = model
  }

  readAll = (query, next, fallback) => {
    let { skip, limit } = query

    skip = skip ? Number(skip) : 0
    limit = limit ? Number(limit) : 10

    delete query.skip
    delete query.limit

    if (query._id) {
      try {
        query._id = new mongoose.mongo.ObjectId(query._id)
      } catch (err) {
        return fallback(err)
      }
    }

    this.model
      .find(query)
      .skip(skip)
      .limit(limit)
      .then(next)
      .catch(fallback)
  }

  read = (id, next, fallback) => {
    this.model
      .findById(id)
      .then(next)
      .catch(fallback)
  }

  create = (data, next, fallback) => {
    this.model
      .create(data)
      .then(next)
      .catch(fallback)
  }

  update = (id, body, next, fallback) => {
    this.model
      .findByIdAndUpdate(id, body, { new: true })
      .then(data => {
        if (!data) return next(data, 404, 'not found')
        next(data)
      })
      .catch(fallback)
  }

  delete = (id, next, fallback) => {
    this.model
      .findByIdAndDelete(id)
      .then(data => {
        if (!data) return next(data, 404, 'not found')
        next(data)
      })
      .catch(fallback)
  }
}

export default Service
