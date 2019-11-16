import mongoose from 'mongoose'

class Service {
  constructor (model) {
    this.model = model
  }

  // Arrow fx for binding
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

    try {
      const items = await this.model
        .find(query)
        .skip(skip)
        .limit(limit)
      const total = await this.model.countDocuments()

      return {
        error: false,
        statusCode: 200,
        data: items,
        total
      }
    } catch (errors) {
      return {
        error: true,
        statusCode: 500,
        errors
      }
    }
  }

  read = async id => {
    try {
      const item = await this.model.findById(id)
      return {
        error: false,
        statusCode: 200,
        item
      }
    } catch (errors) {
      return {
        error: true,
        statusCode: 500,
        errors
      }
    }
  }

  create = async data => {
    try {
      const item = await this.model.create(data)
      if (item) {
        return {
          error: false,
          item
        }
      }
    } catch (error) {
      console.log('error', error)
      return {
        error: true,
        statusCode: 500,
        message: error.errmsg || 'Not able to create item',
        errors: error.errors
      }
    }
  }

  update = async (id, data) => {
    try {
      const item = await this.model.findByIdAndUpdate(id, data, { new: true })
      return {
        error: false,
        statusCode: 202,
        item
      }
    } catch (errors) {
      return {
        error: true,
        statusCode: 500,
        errors
      }
    }
  }

  delete = async id => {
    try {
      const item = await this.model.findByIdAndDelete(id)
      if (!item) {
        return {
          error: true,
          statusCode: 404,
          message: 'item not found'
        }
      }
      return {
        error: false,
        deleted: true,
        statusCode: 202,
        item
      }
    } catch (errors) {
      return {
        error: true,
        statusCode: 500,
        errors
      }
    }
  }
}

export default Service
