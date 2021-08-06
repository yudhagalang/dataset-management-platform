import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import User from "App/Models/User";
const uuidv4 = require("uuid/v4");

export default class UserSeeder extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await User.create({
      id: uuidv4(),
      email: "dummy@mail.com",
      password: "password",
    });
  }
}
