import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    layout("./layouts/public.tsx", [
        index("routes/home.tsx"),
        route("signin", "routes/signin.tsx"),
    ]),
    layout("./layouts/app.tsx", { id: 'app '}, [
        route("learning", "routes/learning.tsx"),
        route("dashboard", "routes/dashboard.tsx"),
        route("review", "routes/review.tsx"),
        route("profile", "routes/profile.tsx"),
    ]),
] satisfies RouteConfig;
