import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PagesController {

    public async index({ view }: HttpContextContract) {
        //auto direct to home route
        return view.render('page/home')
    }

    public async home({ view }: HttpContextContract) {
        return view.render('page/home')
    }

    public async detailBarang({ view }: HttpContextContract) {
        return view.render('page/peminjaman-barang/detail-barang')
    }

    public async dataPeminjaman({ view }: HttpContextContract) {
        return view.render('page/peminjaman-barang/data-peminjaman')
    }

    public async rekapPeminjaman({ view }: HttpContextContract) {
        return view.render('page/peminjaman-barang/rekap-peminjaman')
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
        return view.render('page/account/sign-up')
    }

    public async forgotPassword({ view }: HttpContextContract) {
        return view.render('page/account/forgot-password')
    }

    public async akun({ view }: HttpContextContract) {
        return view.render('page/account/akun')
    }

    public async addTool({ view }: HttpContextContract) {
        return view.render('page/tool/add-tool')
    }
    
}
