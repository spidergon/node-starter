import PostController from '../src/controllers/PostController'
import { catchErrors } from '../src/helpers/errorHandlers'

export default server => {
  // POST ROUTES
  server.get('/api/posts', catchErrors(PostController.readAll))
  server.get('/api/posts/:id', catchErrors(PostController.read))
  server.post('/api/posts', catchErrors(PostController.create))
  server.put('/api/posts/:id', catchErrors(PostController.update))
  server.delete('/api/posts/:id', catchErrors(PostController.delete))
}
