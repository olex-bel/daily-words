import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    layout("./layouts/public.tsx", [
        index("routes/home.tsx"),
        route("signin", "routes/signin.tsx"),
        route("signup", "routes/signup.tsx"),
        route("reset-password", "routes/resetpassword.tsx"),
    ]),
    layout("./layouts/app.tsx", { id: 'app '}, [
        route("learning", "routes/learning.tsx"),
        route("dashboard", "routes/dashboard.tsx"),
        route("review", "routes/review.tsx"),
        route("profile", "routes/profile.tsx"),
        route("set-password", "routes/setpassword.tsx"),
    ]),
] satisfies RouteConfig;
