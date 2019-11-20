import Controller from './Controller'
import PostService from '../services/PostService'
import Post from '../models/Post'

class PostController extends Controller {
  constructor (service) {
    super(service)
    this.service = service
  }

  create = async (req, res, next) => {
    this.service.create(
      req,
      data => res.status(201).json(this.format({ data, status: 201 })),
      err => next({ ...err, status: 400 })
    )
  }
}

const postService = new PostService(new Post().getInstance())

export default new PostController(postService)
