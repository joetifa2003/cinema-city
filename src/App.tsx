import React, { Suspense } from "react";
import Nav from "./components/Nav/Nav";
import { Switch } from "react-router-dom";
import { GuardProvider, GuardedRoute } from "react-router-guards";
import { ls } from "./utility/LocalStorage";
import AdBlockDetect from "react-ad-block-detect";

const Home = React.lazy(() => import("./pages/Home"));
const Movie = React.lazy(() => import("./pages/Movie"));
const Series = React.lazy(() => import("./pages/Series"));
const Dashboard = React.lazy(() => import("./pages/admin/Dashboard"));
const Auth = React.lazy(() => import("./pages/admin/Auth"));
const AddMovie = React.lazy(() => import("./pages/admin/AddMovie"));
const AddEpisode = React.lazy(() => import("./pages/admin/AddEpisode"));

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
      <AdBlockDetect>
        <div className="fixed top-0 left-0 z-50 w-full h-full bg-black"></div>
      </AdBlockDetect>
      <Suspense fallback={<div className="w-full h-full bg-bg"></div>}>
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
