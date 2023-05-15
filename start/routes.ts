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

//main route
Route.get('/', 'PagesController.index')
Route.get('/home', 'PagesController.home')

//peminjaman barang
Route.get('/detail-barang', 'PagesController.detailBarang')
Route.get('/data-peminjaman', 'PagesController.dataPeminjaman')
Route.get('/rekap-peminjaman', 'PagesController.rekapPeminjaman')

//pengembalian barang
Route.get('/sedang-dipinjam', 'PagesController.sedangDipinjam')
Route.get('/detail-peminjaman', 'PagesController.detailPeminjaman')

//riwayat peminjaman
Route.get('/riwayat-peminjaman', 'PagesController.riwayatPeminjaman')
Route.get('/detail-riwayat', 'PagesController.detailRiwayat')

//account
Route.get('/akun', 'PagesController.akun')
Route.get('/login', 'PagesController.login')
Route.get('/signup', 'PagesController.signUp')
Route.get('/forgot-password', 'PagesController.forgotPassword')

//Category
Route.post('/categories/store', 'CategoriesController.store').as('categories.store')

//tool
Route.get('/add-tool', 'PagesController.addTool')
Route.post('/tools/store', 'ToolsController.store').as('tools.store')