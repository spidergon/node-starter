import userController from '../src/controllers/userController'
import postController from '../src/controllers/postController'
import { catchErrors } from './middleware/errorHandlers'
import auth from './middleware/auth'

export default server => {
  // USER ROUTES
  // server.get('/api/users/', auth, catchErrors(userController.readAll))
  // server.get('/api/users/:id', auth, catchErrors(userController.read))
  server.post('/api/auth/signup', catchErrors(userController.signup))
  server.post('/api/auth/login', catchErrors(userController.login))

  // POST ROUTES
  server.get('/api/posts/', catchErrors(postController.readAll))
  server.get('/api/posts/:id', catchErrors(postController.read))
  server.post('/api/posts/', auth, catchErrors(postController.create))
  server.put('/api/posts/:id', auth, catchErrors(postController.update))
  server.delete('/api/posts/:id', auth, catchErrors(postController.delete))
}
