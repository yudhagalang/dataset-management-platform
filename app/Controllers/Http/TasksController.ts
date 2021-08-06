import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Dataset from "App/Models/Dataset";
import Task from "App/Models/Task";
const uuidv4 = require("uuid/v4");

export default class TasksController {
  async create({ auth, view }: HttpContextContract) {
    await auth.authenticate();
    const datasets = await Dataset.query()
      .where("user_id", "=", auth.user?.id!)
      .andWhereNull("task_id")
      .orderBy("id", "desc");
    return view.render("task/create", {
      title: "Create a Task",
      datasets,
    });
  }

  async store({ auth, request, response, session }: HttpContextContract) {
    const data = request.only(["task_name", "dataset_id"]);
    if (!data.dataset_id || data.dataset_id === "null") {
      session.flash("err", "You have to choose a dataset!");
      return response.redirect("/tasks/create");
    }

    const task = new Task();
    task.name = data.task_name;
    task.id = uuidv4();
    await auth.authenticate();
    task.userId = auth.user?.id!;
    task.status = 2;

    const dataset = await Dataset.findOrFail(data.dataset_id);
    dataset.taskId = task.id;

    await task.save();
    await dataset.save();

    return response.redirect("/tasks");
  }

  async show({ auth, view }: HttpContextContract) {
    await auth.authenticate();
    const datas = await Task.query()
      .select("tasks.*")
      .select("datasets.file_path")
      .select("datasets.name as dataset_name")
      .leftJoin("datasets", "tasks.id", "datasets.task_id")
      .where("tasks.user_id", "=", auth.user?.id!)
      .andWhere("tasks.status", "!=", "0")
      .orderBy("tasks.id", "desc");
    return view.render("task/index", {
      title: "Tasks",
      datas,
    });
  }

  async book({ params, response }: HttpContextContract) {
    const task = await Task.findOrFail(params.id);
    task.status = 1;
    await task.save();
    return response.redirect("/tasks");
  }
  async revoke({ params, response }: HttpContextContract) {
    const task = await Task.findOrFail(params.id);
    task.status = 2;
    await task.save();
    return response.redirect("/tasks");
  }
  async delete({ params, response }: HttpContextContract) {
    const task = await Task.findOrFail(params.id);
    const dataset = await Dataset.findByOrFail("task_id", params.id);
    task.status = 0;
    dataset.taskId = null;
    await task.save();
    await dataset.save();
    return response.redirect("/tasks");
  }
}
