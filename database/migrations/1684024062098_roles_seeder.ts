import Database from '@ioc:Adonis/Lucid/Database'
import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import Roles from 'App/Enums/Roles'

export default class extends BaseSchema {
  protected tableName = 'roles'

  public async up () {
    await Database.table('roles').insert([
      {id: Roles.MAHASISWA, name: 'Mahasiswa', description: 'Mahasiswa Informatika'},
      {id: Roles.ADMIN, name: 'Admin', description: 'Admin Informatika'},
      {id: Roles.KAPRODI, name: 'Kaprodi', description: 'Kaprodi Informatika'}
    ])
  }

  public async down () {
    await Database.from('roles').where('id', [Roles.MAHASISWA, Roles.ADMIN, Roles.KAPRODI]).delete()
  }
}
