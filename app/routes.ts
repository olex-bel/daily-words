import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    layout("./layouts/public.tsx", [
        index("routes/home.tsx"),
        route("signin", "routes/signin.tsx"),
    ]),
    layout("./layouts/app.tsx", [
        route("learning", "routes/learning.tsx"),
    ]),
] satisfies RouteConfig;
