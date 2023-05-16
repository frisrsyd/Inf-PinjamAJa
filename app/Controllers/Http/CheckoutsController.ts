import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CheckoutStatus from 'App/Enums/CheckoutStatus'
import Checkout from 'App/Models/Checkout'
import Tool from 'App/Models/Tool'
import User from 'App/Models/User'

export default class CheckoutsController {
    public async store({request, response, params, auth, session}: HttpContextContract) {
        const data = request.only(['toolId', 'jumlahPeminjaman', 'tglMulai', 'tglKembali', 'tujuanPeminjaman'])
        const tool = await Tool.findByOrFail('id', params.tool_id)
        const user = await User.findByOrFail('id', auth.user?.id)

        let status = ''
        
        let available = tool.stock - data.jumlahPeminjaman
        if (available > 0 ) {
            status = 'Tersedia'
        } else {
            status = 'Tidak Tersedia'
        }

        const updateTool = await Tool.updateOrCreate({
            id: tool.id
        }, {
            status: status,
            available: available
        })

        let checkoutStatus = ''
        if (CheckoutStatus.NOTTAKEN) {
            checkoutStatus = 'Belum Diambil'
        } else if (CheckoutStatus.ONBORROW) {
            checkoutStatus = 'Dipinjam'
        } else if (CheckoutStatus.RETURNED) {
            checkoutStatus = 'Dikembalikan'
        }

        const checkout = await Checkout.create({
            toolId: tool.id,
            userId: user.id,
            quantity: data.jumlahPeminjaman,
            status: checkoutStatus,
            startDate: data.tglMulai,
            endDate: data.tglKembali,
            purpose: data.tujuanPeminjaman
        })
        if (updateTool) {
            if(checkout) {
                session.flash('status', 'Berhasil meminjam alat')
                return response.redirect().toRoute('rekap-peminjaman', { checkout_id: checkout.id })
            } else {
                session.flash('status', 'Gagal meminjam alat(checkout)')
            }
        } else {
            session.flash('status', 'Gagal meminjam alat(updateTool)')
        }
    }
}
