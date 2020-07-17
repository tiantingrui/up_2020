import Home from "../components/home";
import Login from "../components/login";
import MyLayout from "../layout";
import Product from "../components/product";
import Users from "../components/user";
import Backend from "../components/backend";
import Admin from "../components/admin";
import NotFound from "../components/notfound";

/* 第一层路由 */
const routes = [
  {
    path: "/",
    exact: true,
    component: Home,
    permission: [1,2,3]
  },
  {
    path: "/login",
    component: Login,
    permission: [1,2,3]
  },
  {
    path: "/backend",
    component: MyLayout,
    permission: [2,3]
  },
  {
    path: "/not-found",
    component: NotFound,
    permission: [1,2,3]
  },
];

/* 第二层路由 */
const componentsRoutes = [
  {
    key: "backend",
    path: "/backend",
    exact: true,
    component: Backend,
    permission: [2,3]
  },
  {
    key: "product",
    path: "/backend/product",
    component: Product,
    permission: [2,3]
  },
  {
    key: "users",
    path: "/backend/users",
    component: Users,
    permission: [2,3]
  },
  {
    key: "admin",
    path: "/backend/admin",
    component: Admin,
    permission: [3]
  },
];

/* 菜单导航 */
const navi = [
  {
    title: "课程",
    key: "product",
    path: "/backend/product",
    permission: [2,3]
  },
  {
    title: "用户",
    key: "users",
    path: "/backend/users",
    permission: [2,3]
  },
  {
    title: "后台",
    key: "admin",
    path: "/backend/admin",
    permission: [3]
  },
];

export { routes, componentsRoutes, navi };
