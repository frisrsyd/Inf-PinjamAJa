import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Role from './Role'
import Tool from './Tool'
import Checkout from './Checkout'

export default class User extends BaseModel {
    @column({ isPrimary: true })
    public id: number
  
    @column()
    public role_id: number
  
    @column()
    public nama: string
  
    @column()
    public email: string
  
    @column()
    public NPM: string
  
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
}
