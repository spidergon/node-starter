class Controller {
  constructor (service) {
    this.service = service
  }

  readAll = async (req, res) => {
    const { data, total } = await this.service.readAll(req.query)
    return res.send(this.getResponse({ data, total }))
  }

  read = async (req, res) => {
    const data = await this.service.read(req.params.id)
    return res.send(this.getResponse({ data }))
  }

  create = async (req, res) => {
    const data = await this.service.create(req.body)
    return res.status(201).send(this.getResponse({ data, status: 201 }))
  }

  update = async (req, res) => {
    const data = await this.service.update(req.params.id, req.body)
    return res.status(202).send(this.getResponse({ data, status: 202 }))
  }

  delete = async (req, res) => {
    const { data, message } = await this.service.delete(req.params.id)
    const status = !data ? 404 : 202
    return res.status(status).send(this.getResponse({ data, status, message }))
  }

  getResponse = ({ data, message, total, status = 200 }) => ({
    error: false,
    status,
    message,
    total,
    data
  })
}

export default Controller
