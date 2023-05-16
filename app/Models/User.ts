import { DateTime } from 'luxon'
import { BaseModel, beforeSave, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Role from './Role'
import Tool from './Tool'
import Checkout from './Checkout'
import Hash from '@ioc:Adonis/Core/Hash'

export default class User extends BaseModel {
    @column({ isPrimary: true })
    public id: number
  
    @column()
    public roleId: number
  
    @column()
    public name: string
  
    @column()
    public email: string
  
    @column()
    public npm: string
  
    @column()
    public password: string
  
    @column()
    public rememberMeToken?: string
  
    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime
  
    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt?: DateTime

    @belongsTo(() => Role)
    public role: BelongsTo<typeof Role>

    @hasMany(() => Tool)
    public tools: HasMany<typeof Tool>

    @hasMany(() => Checkout)
    public checkouts: HasMany<typeof Checkout>

    @beforeSave()
    public static async hashPassword (user: User) {
      if (user.$dirty.password) {
        user.password = await Hash.make(user.password)
      }
    }
  
}
