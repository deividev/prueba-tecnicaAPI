import { Request, Response } from "express";
import { UserFinder } from "../../../context/User/application/UserFinder";
import { UserUpdater } from "../../../context/User/application/UserUpdater";
import { errorHandler } from "../../../helpers/errorHandler";
import { getContainer } from "../../dic/getContainer";
import { UserUsesCases } from "../../dic/userUseCases.injector";
import { Controller } from "../controlles.interface";

export class TurnUserToAdminController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    const { uuid } = req.params;

    try {
      const container = getContainer();
      const userFinder: UserFinder = container.get(UserUsesCases.UserFinder);
      const userUpdater: UserUpdater = container.get(UserUsesCases.UserUpdater);

      const user = await userFinder.getUser(uuid);
      user.setAdminRole();

      await userUpdater.update(user);

      res.status(200).json({
        user: user.toObjectWithoutPassword(),
      });
    } catch (error) {
      errorHandler(res, error, "TurnUserToAdminController");
    }
  }
}
