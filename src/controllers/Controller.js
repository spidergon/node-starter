class Controller {
  constructor (service) {
    this.service = service
  }

  readAll = async (req, res, next) => {
    this.service.readAll(
      req.query,
      data => res.json(this.format({ data, total: data.length })),
      err => next({ ...err, status: 400 })
    )
  }

  read = async (req, res, next) => {
    this.service.read(
      req.params.id,
      data => res.json(this.format({ data })),
      err => next({ ...err, status: 400 })
    )
  }

  create = async (req, res, next) => {
    this.service.create(
      req.body,
      data => res.status(201).send(this.format({ data, status: 201 })),
      err => next({ ...err, status: 400 })
    )
  }

  update = async (req, res, next) => {
    this.service.update(
      req.params.id,
      req.body,
      (data, errorCode, message) => {
        const status = errorCode || 200
        res.status(status).send(this.format({ data, status, message }))
      },
      err => next({ ...err, status: 400 })
    )
  }

  delete = async (req, res, next) => {
    this.service.delete(
      req.params.id,
      (data, errorCode, message) => {
        const status = errorCode || 200
        res.status(status).send(this.format({ data, status, message }))
      },
      err => next({ ...err, status: 400 })
    )
  }

  format = ({ data, message, total, status = 200 }) => ({
    error: false,
    status,
    message,
    total,
    data
  })
}

export default Controller
