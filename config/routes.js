import PostController from './../src/controllers/PostController'

export default server => {
  // POST ROUTES
  server.get('/api/posts', PostController.readAll)
  server.get('/api/posts/:id', PostController.read)
  server.post('/api/posts', PostController.create)
  server.put('/api/posts/:id', PostController.update)
  server.delete('/api/posts/:id', PostController.delete)
}
