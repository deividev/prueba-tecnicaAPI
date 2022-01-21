import { Request, Response } from "express";
import { NewsEliminator } from "../../../context/New/application/NewsEliminator";
import { errorHandler } from "../../../helpers/errorHandler";
import { getContainer } from "../../dic/getContainer";
import { NewsUsesCases } from "../../dic/newsUsesCases.injector";
import { Controller } from "../controlles.interface";

export class DeleteNewsController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    const { uuid } = req.params;

    try {
      const container = getContainer();
      const newsDeleter: NewsEliminator = container.get(
        NewsUsesCases.NewsEliminator
      );

      await newsDeleter.delete(uuid);

      res.status(200).json({
        uuid,
      });
    } catch (error) {
      errorHandler(res, error, "DeleteNewsController");
    }
  }
}
