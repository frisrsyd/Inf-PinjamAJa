import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'

export default class LoginController {
    public async login({request, response, auth, session}: HttpContextContract){
        const data = request.only(['npm', 'password'])
    
        // Lookup user manually
        const user = await User.query()
        .where('npm', data.npm)
        .firstOrFail()
    

        // Verify password
        if (!(await Hash.verify(user.password, data.password))) {
            session.flash('status', 'npm atau Password salah')
        }

        // Create session
        const login = await auth.use('web').login(user)
        if (login) {
            session.flash('status', 'Login berhasil')
            return response.redirect('/home')
        }
        else {
            session.flash('status', 'Login gagal')
            return response.redirect('/login')
        }
    }

    public async logout({auth, response, session}: HttpContextContract){
        await auth.use('web').logout()
        session.flash('status', 'Logout berhasil')
        return response.redirect('/login')
    }
}
