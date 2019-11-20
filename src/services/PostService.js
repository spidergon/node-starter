import Service from './Service'

class PostService extends Service {
  constructor (model) {
    super(model)
    this.model = model
  }

  create = (req, next, fallback) => {
    this.model
      .create({
        title: req.body.title,
        description: req.body.description,
        content: req.body.content,
        imageUrl: this.getImgUrl(req)
      })
      .then(next)
      .catch(fallback)
  }

  getImgUrl (req) {
    if (!req.file) return ''
    return (
      req.protocol + '://' + req.get('host') + '/uploads/' + req.file.filename
    )
  }
}

export default PostService
