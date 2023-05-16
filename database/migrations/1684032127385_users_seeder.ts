import Hash from '@ioc:Adonis/Core/Hash';
import Database from '@ioc:Adonis/Lucid/Database'
import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import Roles from 'App/Enums/Roles'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    const password_mahasiswa = await Hash.make('mahasiswa')
    const password_admin = await Hash.make('admin')
    const password_kaprodi = await Hash.make('kaprodi')

    await Database.table(this.tableName).insert([
      {role_id: Roles.MAHASISWA, name: 'Mahasiswa', email:'mahasiswa@gmail.com', npm: '2008107010025', password: password_mahasiswa},
      {role_id: Roles.ADMIN, name: 'Admin', email:'admin@gmail.com', npm: '2008107010024', password: password_admin},
      {role_id: Roles.KAPRODI, name: 'Kaprodi', email:'kaprodi@gmail.com', npm: '2008107010023', password: password_kaprodi},
    ])
  }

  public async down () {
    await Database.from(this.tableName).where('role_id', [Roles.MAHASISWA, Roles.ADMIN, Roles.KAPRODI]).delete()
  }
}
