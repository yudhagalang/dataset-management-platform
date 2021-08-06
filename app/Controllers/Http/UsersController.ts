import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import NewUserValidator from "App/Validators/NewUserValidator";
import User from "App/Models/User";

export default class UsersController {
  create({ view }: HttpContextContract) {
    return view.render("user/register", {
      title: "Register",
    });
  }

  signIn({ view }: HttpContextContract) {
    return view.render("user/login", {
      title: "Login",
    });
  }

  async login({ auth, request, response, session }: HttpContextContract) {
    const { email, password } = request.all();

    try {
      await auth.attempt(email, password);
      console.log("Login success");
      session.flash("msg", "Login successful");
    } catch (e) {
      console.error(e);
      session.flash("err", "Invalid User/Password");
      return response.redirect("/login");
    }

    return response.redirect("/");
  }

  async store({ auth, request, response, session }: HttpContextContract) {
    const data = request.only(["email", "password", "password_confirmation"]);
    const validation = await request.validate(NewUserValidator);

    delete data.password_confirmation;

    const user = new User();
    user.email = validation.email;
    user.password = validation.password;

    await user.save();

    // Authenticate the user
    await auth.login(user);

    session.flash("msg", "Login successful");
    return response.redirect("/");
  }

  async logout({ auth, response, session }: HttpContextContract) {
    await auth.logout();
    console.log("Logout success");
    session.flash("msg", "Logout successful");

    return response.redirect("/");
  }
}
