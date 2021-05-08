import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo,column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

import Dataset from './Dataset'

export default class Task extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public status: number //0 = deleted, 1 = booked, 2 = not booked

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public userId: number
  @belongsTo(() => User, {
    foreignKey: 'userId', // userId column on "Task" model
  })
  public author: BelongsTo<typeof User>

  @hasOne(() => Dataset, {
    foreignKey: 'taskId,'
  })
  public dataset: HasOne<typeof Dataset>
}
