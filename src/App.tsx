import React, { lazy, Suspense } from "react";
import Nav from "./components/Nav/Nav";
import { Switch } from "react-router-dom";
import { GuardProvider } from "react-router-guards";
import { ls } from "./utility/LocalStorage";
import { AdBlockDetectedWrapper } from "adblock-detect-react";
import PageProgress from "./components/PageProgress/PageProgress";
import FancyRoute from "./components/Route/FancyRoute";

const Home = lazy(() => import(/* webpackChunkName: "Home" */ "./pages/Home"));
const Movie = lazy(
  () => import(/* webpackChunkName: "Movie" */ "./pages/Movie")
);
const Series = lazy(
  () => import(/* webpackChunkName: "Series" */ "./pages/Series")
);
const Dashboard = lazy(
  () => import(/* webpackChunkName: "Dashboard" */ "./pages/admin/Dashboard")
);
const Auth = lazy(
  () => import(/* webpackChunkName: "Auth" */ "./pages/admin/Auth")
);
const AddMovie = lazy(
  () => import(/* webpackChunkName: "AddMovie" */ "./pages/admin/AddMovie")
);
const AddEpisode = lazy(
  () => import(/* webpackChunkName: "AddEpisode" */ "./pages/admin/AddEpisode")
);

const routes = [
  {
    route: "/",
    component: Home,
    exact: true,
    meta: {},
  },
  {
    route: "/movie/:id",
    component: Movie,
    exact: false,
    meta: {},
  },
  {
    route: "/series/:id",
    component: Series,
    exact: false,
    meta: {},
  },
  {
    route: "/admin",
    component: Dashboard,
    exact: true,
    meta: { auth: true },
  },
  {
    route: "/admin/auth",
    component: Auth,
    exact: true,
    meta: {},
  },
  {
    route: "/admin/add",
    component: AddMovie,
    exact: true,
    meta: { auth: true },
  },
  {
    route: "/admin/add_episode",
    component: AddEpisode,
    exact: true,
    meta: { auth: true },
  },
];

const adminAuth = (to: any, from: any, next: any) => {
  if (to.meta.auth) {
    if (ls.get("isLoggedIn")) {
      next();
    } else {
      next.redirect("/admin/auth");
    }
  } else {
    next();
  }
};

const App = () => {
  return (
    <>
      <Nav />
      <Suspense fallback={<PageProgress />}>
        <AdBlockDetectedWrapper>
          <div className="fixed top-0 left-0 z-50 flex flex-col items-center justify-center w-full h-full bg-opacity-75 bg-primary">
            <div className="container">
              <span
                className="mx-auto mb-5 text-white iconify"
                data-icon="simple-icons:adblock"
                data-inline="false"
                style={{
                  fontSize: "15rem",
                }}
              ></span>
              <div className="text-3xl font-bold text-center text-white">
                يجب عليك تعطيل مانع الاعلانات - AdBlock حتى يمكنك التحميل و
                المشاهدة مجاناً.
              </div>
            </div>
          </div>
        </AdBlockDetectedWrapper>
        <GuardProvider guards={[adminAuth]}>
          <Switch>
            {routes.map((route) => (
              <FancyRoute
                key={route.route}
                path={route.route}
                component={route.component}
                exact={route.exact}
                meta={route.meta}
              />
            ))}
          </Switch>
        </GuardProvider>
      </Suspense>
    </>
  );
};

export default App;
