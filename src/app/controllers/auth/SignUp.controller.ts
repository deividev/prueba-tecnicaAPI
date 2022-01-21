import { Request, Response } from "express";

import { UserCreator } from "../../../context/User/application/UserCreator";

import { User } from "../../../context/User/domain/user.model";
import { UserEmail } from "../../../context/User/domain/valueObject/UserEmail.valueObject";

import { Mailer } from "../../../context/shared/domain/interfaces/Mailer.interface";
import { JWT } from "../../../context/shared/infrastructure/jwt.JWT";

import { getContainer } from "../../dic/getContainer";
import { UserUsesCases } from "../../dic/userUseCases.injector";
import { UtilDependencies } from "../../dic/utils.injector";

import { Controller } from "../controlles.interface";

import { errorHandler } from "../../../helpers/errorHandler";
import { enviroment } from "../../config/enviroment";
import { ICrypt } from "../../../context/shared/domain/interfaces/Crypt.interface";

export class SignUpController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    const { email, name, password, uuid } = req.body;

    try {
      const container = getContainer();
      const JWT: JWT = container.get(UtilDependencies.JWT);
      const crypt: ICrypt = container.get(UtilDependencies.Crypt);
      const mailer: Mailer = container.get(UtilDependencies.Mailer);

      const token = JWT.sign({ uuid }, enviroment.token.seed, {
        expiresIn: "3h",
      });

      // const appEmail = new UserEmail(enviroment.mailer.mail);
      // const userEmail = new UserEmail(email);
      // await mailer.sendMail(
      //   appEmail,
      //   userEmail,
      //   "Valida tu cuenta - NEWSPAPER",
      //   `<a href="${enviroment.apiUrl}/signup/verify?token=${token}" >Valida tu cuenta</a>`
      // );

      const userCreator: UserCreator = container.get(UserUsesCases.UserCreator);
      const user = new User(
        uuid,
        name,
        email,
        crypt.hash(password, 10),
        "USER_ROLE"
      );

      await userCreator.create(user);

      res.status(201).json({ token });
    } catch (error) {
      errorHandler(res, error, "SignupController");
    }
  }
}
