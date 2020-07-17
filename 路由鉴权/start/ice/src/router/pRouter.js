import Home from "../components/Home";
import Backend from "../components/backend";
import Admin from "../components/admin";
import Login from "../components/login";
import NotFound from "../components/notfound";

const routes = [{
        path: '/',
        exact: true,
        component: Home,
        permission: [1, 2, 3]
    },
    {
        path: '/backend',
        component: Backend,
        permission: [2, 3]
    },
    {
        path: '/admin',
        component: Admin,
        permission: [3]
    },
    {
        path: "/login",
        component: Login,
        permission: [1]
    },
    {
        path: "/not-found",
        component: NotFound,
        permission: [1, 2, 3]
    },
]

export {
    routes
}