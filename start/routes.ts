/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async ({view}) => {  
  return view.render('welcome', { title: 'Home '})
})

Route.get('/test', async () => {
  return 'hello world'
})

Route.group(() => {
  Route.get('/register', 'UsersController.create')
  Route.post('/register', 'UsersController.store')

  Route.get('/login', 'UsersController.signIn')
  Route.post('/login', 'UsersController.login')
}).middleware(['guest'])

Route.group(() => {
  Route.get('/logout', 'UsersController.logout')

  Route.get('/datasets', 'DatasetsController.show')
  Route.get('/datasets/upload', 'DatasetsController.upload')
  Route.post('/datasets/upload', 'DatasetsController.store')
  Route.get('/datasets/:id/delete', 'DatasetsController.delete')
  
  Route.get('/download/:filename', 'DatasetsController.download')

  Route.get('/tasks', 'TasksController.show')
  Route.get('/tasks/create','TasksController.create')
  Route.post('/tasks/create','TasksController.store')
  Route.get('/tasks/:id/book','TasksController.book')
  Route.get('/tasks/:id/revoke','TasksController.revoke')
  Route.get('/tasks/:id/delete','TasksController.delete')
}).middleware(['auth'])