import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'
import Checkout from 'App/Models/Checkout'
import Role from 'App/Models/Role'
import Tool from 'App/Models/Tool'
import User from 'App/Models/User'

export default class PagesController {

    public async home({ view, request }: HttpContextContract) {
        //search category with user input
        if (request.input('search')) {
            const category = await Category.query().where('name', 'like', '%' + request.input('search') + '%')
            if (category.length == 0) {
                return view.render('page/home', { 'error': 'Kategori tidak ditemukan' })
            }
            return view.render('page/home', { 'categories': category })
        }
        const category = await Category.all()
        
        if (category.length == 0) {
            return view.render('page/home', { 'error': 'Kategori tidak ditemukan' })
        }
        return view.render('page/home', { 'categories': category })
    }

    public async detailBarang({ view, params, request }: HttpContextContract) {
        // find tool where category_id = category.id and status = 'Tersedia'
        const tool = await Tool.query().where('categoryId', params.category_id).andWhere('status', 'Tersedia')
        if (tool.length == 0) {
            return view.render('page/peminjaman-barang/detail-barang', { 'error': 'Barang tidak ditemukan' })
        }
        //search tool with user input
        if (request.input('search')) {
            const tool = await Tool.query().where('categoryId', params.category_id).andWhere('status', 'Tersedia').andWhere('name', 'like', '%' + request.input('search') + '%')
            if (tool.length == 0) {
                return view.render('page/peminjaman-barang/detail-barang', { 'error': 'Barang tidak ditemukan' })
            }
            return view.render('page/peminjaman-barang/detail-barang', { 'tools': tool })
        }
        return view.render('page/peminjaman-barang/detail-barang', { 'tools': tool })
    }

    public async dataPeminjaman({ view, params }: HttpContextContract) {
        const tool = await Tool.findBy('id', params.tool_id)
        return view.render('page/peminjaman-barang/data-peminjaman', { 'tools': tool })
    }

    public async rekapPeminjaman({ view, params }: HttpContextContract) {
        const checkout = await Checkout.findBy('id', params.checkout_id)
        await checkout?.load('tool')
        await checkout?.load('user')
        // change the format of the date
        let noPinjam = checkout?.createdAt.toFormat('dd/MM/yyyy')
        noPinjam = checkout?.tool.name + '/' + noPinjam + '/' + checkout?.id
        const startDate = checkout?.startDate.toFormat('dd/MM/yyyy')
        const endDate = checkout?.endDate.toFormat('dd/MM/yyyy')
        return view.render('page/peminjaman-barang/rekap-peminjaman', { 'checkouts': checkout, 'noPinjam': noPinjam , 'startDate': startDate, 'endDate': endDate })
    }

    public async sedangDipinjam({ view }: HttpContextContract) {
        return view.render('page/pengembalian-barang/sedang-dipinjam')
    }

    public async detailPeminjaman({ view }: HttpContextContract) {
        return view.render('page/pengembalian-barang/detail-peminjaman')
    }

    public async riwayatPeminjaman({ view }: HttpContextContract) {
        return view.render('page/riwayat-peminjaman/riwayat-peminjaman')
    }
    
    public async detailRiwayat({ view }: HttpContextContract) {
        return view.render('page/riwayat-peminjaman/detail-riwayat')
    }

    public async login({ view }: HttpContextContract) {
        return view.render('page/account/login')
    }

    public async signUp({ view }: HttpContextContract) {
        const role = await Role.all()
        return view.render('page/account/sign-up', { 'roles': role })
    }

    public async forgotPassword({ view }: HttpContextContract) {
        return view.render('page/account/forgot-password')
    }

    public async akun({ view, auth }: HttpContextContract) {
        const user = await User.findBy('id', auth.user?.id)
        await user?.load('role')
        return view.render('page/account/akun', { 'users': user })
    }

    public async addTool({ view }: HttpContextContract) {
        const category = await Category.all()
        return view.render('page/tool/add-tool', { 'categories': category })
    }
    
}
