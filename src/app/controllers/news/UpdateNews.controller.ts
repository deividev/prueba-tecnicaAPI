import { Request, Response } from "express";
import { NewsFinder } from "../../../context/New/application/NewsFinder";
import { NewsUpdater } from "../../../context/New/application/NewsUpdater";
import { New } from "../../../context/New/domain/New.model";
import { errorHandler } from "../../../helpers/errorHandler";
import { getContainer } from "../../dic/getContainer";
import { NewsUsesCases } from "../../dic/newsUsesCases.injector";
import { Controller } from "../controlles.interface";

export class UpdateNewsController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    const { title, description } = req.body;
    const { uuid } = req.params;

    try {
      const container = getContainer();
      const newsfinder: NewsFinder = container.get(NewsUsesCases.NewsFinder);
      const newsUpdater: NewsUpdater = container.get(NewsUsesCases.NewsUpdater);

      const news = await newsfinder.findOne(uuid);
      const updatedNews = new New(news.uuid.value, title, description);

      await newsUpdater.update(updatedNews);

      res.status(200).json({
        news: updatedNews.toObject(),
      });
    } catch (error) {
      errorHandler(res, error, "UpdateNewsController");
    }
  }
}
