import { json, urlencoded } from "express";
import cors from "cors";

import { initServerDependencies } from "./helpers/initServeDependencies";
initServerDependencies();

import { Server } from "./app/server";
import { router } from "./app/routes/index.routing";

const server = new Server(3001);
// set middlewares
server.app.use(urlencoded({ extended: false }));
server.app.use(json());
server.app.use(cors());

// Set routes
server.app.use("/api", router);

server.start();
