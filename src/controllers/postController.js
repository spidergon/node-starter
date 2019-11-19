import Controller from './Controller'
import PostService from '../services/PostService'
import Post from '../models/Post'

class PostController extends Controller {
  constructor (service) {
    super(service)
    this.service = service
  }
}

const postService = new PostService(new Post().getInstance())

export default new PostController(postService)
