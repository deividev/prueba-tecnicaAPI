import { NextFunction, Request, Response } from "express";
import { HTTPException } from "../../context/shared/domain/HTTPException";
import { JWT } from "../../context/shared/infrastructure/jwt.JWT";
import { errorHandler } from "../../helpers/errorHandler";
import { enviroment } from "../config/enviroment";
import { getContainer } from "../dic/getContainer";
import { UtilDependencies } from "../dic/utils.injector";
import { Middleware } from "./middleware.interface";

const service = "verify token middleware";

export class VerifyTokenMiddleware implements Middleware {
  public run(req: Request, res: Response, next: NextFunction) {
    const { token } = req.headers;

    try {
      const container = getContainer();
      const jwt: JWT = container.get(UtilDependencies.JWT);

      if (!token) throw new HTTPException(service, "token not found", 401);

      const isValidToken = jwt.verify(
        token?.toString() ?? "",
        enviroment.token.seed
      );

      if (!isValidToken) throw new HTTPException(service, "invalid token", 401);

      const { uuid } = jwt.decode(token as string, {}) as { uuid: string };
      req.body.uuid = uuid;

      next();
    } catch (error) {
      errorHandler(res, error, service);
    }
  }
}
