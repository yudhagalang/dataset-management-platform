import Application from '@ioc:Adonis/Core/Application'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Dataset from 'App/Models/Dataset'
import Task from 'App/Models/Task'
import fs from 'fs'


export default class DatasetsController {
  public async upload ({view}: HttpContextContract) {
    return view.render('dataset/upload', {
      title: 'Upload Dataset'
    })
  }

  public async store ({request, response, auth, session}: HttpContextContract) {
    const datasetName = request.only(['dataset_name'])
    const datasetFile = request.file('dataset_file', {
      extnames: ['zip'],
      size: '5mb'
    })
    
    if(!datasetFile) {
      return response.redirect('/datasets')
    }
    // Check for errors
    if (datasetFile?.hasErrors) {
      return datasetFile.errors
    }
    // Move to uploads directory
    try {
      await datasetFile?.move(Application.tmpPath('uploads'),{overwrite:false})
    } catch (e) {
      const errmessage:string = 'File already exists. Please rename your file before uploading again'
      session.flash('err', errmessage);
      return response.redirect('/datasets',)
    }
    
    const dataset = new Dataset()
    dataset.name = datasetName.dataset_name
    dataset.filePath = datasetFile?.fileName!
    await auth.authenticate()
    dataset.userId = auth.user?.id!

    await dataset.save()

    return response.redirect('/datasets')
  }

  public async show ({view,auth,session}: HttpContextContract) {
    await auth.authenticate()
    const datasets = await Dataset
                            .query()
                            .where('user_id', '=', auth.user?.id!)
                            .orderBy('id', 'desc')
    return view.render('dataset/index', {
      title: 'Datasets',
      datasets,
      err: session.flashMessages.get('err'),
      msg: session.flashMessages.get('msg')
    })
  }

  public async edit ({}: HttpContextContract) {
  }

  public async update ({}: HttpContextContract) {
  }

  public async delete ({params,response,session}: HttpContextContract) {
    const dataset = await Dataset.findOrFail(params.id)
    const task = await Task.findOrFail(dataset.taskId)
    const path = 'tmp/uploads/' + dataset.filePath;
    fs.unlinkSync(path)
    task.status = 0
    await task.save()
    await dataset.delete()
    session.flash('msg', 'Delete dataset succesful!')
    return response.redirect('/datasets')
  }

  public async download ({params, response}: HttpContextContract) {
    return response.attachment(
      Application.tmpPath('uploads',params.filename)
    )
  }
}
