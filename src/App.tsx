import React, { lazy, Suspense } from "react";
import Nav from "./components/Nav/Nav";
import { Switch } from "react-router-dom";
import { GuardProvider, GuardedRoute } from "react-router-guards";
import { ls } from "./utility/LocalStorage";
import { AdBlockDetectedWrapper } from "adblock-detect-react";
import Loading from "./components/Loading/Loading";

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
      <Suspense
        fallback={
          <div className="w-full h-full bg-primary-shades-600">
            <Loading color="white" className="h-full" />
          </div>
        }
      >
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
            <GuardedRoute path="/" component={Home} exact />
            <GuardedRoute path="/movie/:id" component={Movie} />
            <GuardedRoute path="/series/:id" component={Series} />
            <GuardedRoute
              path="/admin"
              component={Dashboard}
              exact
              meta={{ auth: true }}
            />
            <GuardedRoute path="/admin/auth" component={Auth} exact />
            <GuardedRoute
              path="/admin/add"
              component={AddMovie}
              exact
              meta={{ auth: true }}
            />
            <GuardedRoute
              path="/admin/add_episode"
              component={AddEpisode}
              exact
              meta={{ auth: true }}
            />
          </Switch>
        </GuardProvider>
      </Suspense>
    </>
  );
};

export default App;
