import { DateTime } from "luxon";
import { BaseModel, belongsTo, BelongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import User from "./User";
import Task from "./Task";

export default class Dataset extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column()
  public name: string;

  @column()
  public filePath: string;

  @column()
  public isSelected: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @column()
  public userId: string;
  @belongsTo(() => User, {
    foreignKey: "userId", // userId column on "Dataset" model
  })
  public author: BelongsTo<typeof User>;

  @column({})
  public taskId: string | null;
  @belongsTo(() => Task, {
    foreignKey: "taskId", // taskId column on "Dataset" model
  })
  public tasker: BelongsTo<typeof Task>;
}
