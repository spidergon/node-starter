import auth from './middleware/auth'
import multer from './middleware/multer-config'
import { catchErrors } from './middleware/errorHandlers'
import userController from '../src/controllers/userController'
import postController from '../src/controllers/postController'

export default server => {
  // USER ROUTES
  server.get('/api/users/', catchErrors(userController.readAll))
  server.get('/api/users/:id', catchErrors(userController.read))
  server.delete('/api/users/:id', catchErrors(userController.delete))
  server.post('/api/auth/signup', catchErrors(userController.signup))
  server.post('/api/auth/login', catchErrors(userController.login))

  // POST ROUTES
  server.get('/api/posts/', catchErrors(postController.readAll))
  server.get('/api/posts/:id', catchErrors(postController.read))
  server.post('/api/posts/', auth, multer, catchErrors(postController.create))
  server.put('/api/posts/:id', auth, multer, catchErrors(postController.update))
  server.delete('/api/posts/:id', auth, catchErrors(postController.delete))
}
