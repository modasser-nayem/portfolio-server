import { Router } from "express";
import { informationRoutes } from "./information.routes";
import skillRouter from "./skill.routes";
import serviceRouter from "./service.routes";
import projectRouter from "./project.routes";
import blogRouter from "./blog.routes";
import { authRoute } from "../auth/auth";

const router = Router();

const allRoutes = [
  {
    path: "/auth",
    routes: authRoute,
  },
  {
    path: "/",
    routes: informationRoutes,
  },
  {
    path: "/skills",
    routes: skillRouter,
  },
  {
    path: "/projects",
    routes: projectRouter,
  },
  {
    path: "/services",
    routes: serviceRouter,
  },
  {
    path: "/blogs",
    routes: blogRouter,
  },
];

allRoutes.forEach((route) => router.use(route.path, route.routes));

export const routes = router;
