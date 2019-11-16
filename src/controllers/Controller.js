class Controller {
  constructor (service) {
    this.service = service
  }

  // Arrow fx for binding
  readAll = async (req, res) => {
    return res.status(200).send(await this.service.readAll(req.query))
  }

  read = async (req, res) => {
    const { id } = req.params
    return res.status(200).send(await this.service.read(id))
  }

  create = async (req, res) => {
    const response = await this.service.create(req.body)
    if (response.error) return res.status(response.statusCode).send(response)
    return res.status(201).send(response)
  }

  update = async (req, res) => {
    const { id } = req.params

    const response = await this.service.update(id, req.body)

    return res.status(response.statusCode).send(response)
  }

  delete = async (req, res) => {
    const { id } = req.params

    const response = await this.service.delete(id)

    return res.status(response.statusCode).send(response)
  }
}

export default Controller
