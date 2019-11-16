import Service from './Service'

class PostService extends Service {
  constructor (model) {
    super(model)
    this.model = model
  }
}

export default PostService
