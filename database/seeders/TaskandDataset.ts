import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Dataset from 'App/Models/Dataset'
import Task from 'App/Models/Task'

export default class TaskandDatasetSeeder extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await Task.create({
      id:1,
      name: 'Task 1',
      status: 2,
      userId:1
    })
    await Dataset.create({
      id:1,
      name: 'Dataset 1',
      filePath: 'test.zip',
      userId:1,
      taskId:1
    })
  }
}
