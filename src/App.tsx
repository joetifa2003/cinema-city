import React, { Suspense } from "react";
import Nav from "./components/Nav/Nav";
import { Switch } from "react-router-dom";
import { GuardProvider, GuardedRoute } from "react-router-guards";
import { ls } from "./utility/LocalStorage";
const Home = React.lazy(() => import("./pages/Home"));
const Movie = React.lazy(() => import("./pages/Movie"));
const Dashboard = React.lazy(() => import("./pages/admin/Dashboard"));
const Auth = React.lazy(() => import("./pages/admin/Auth"));
const AddMovie = React.lazy(() => import("./pages/admin/AddMovie"));

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
      <Suspense fallback={<div className="w-full h-full bg-bg"></div>}>
        <GuardProvider guards={[adminAuth]}>
          <Switch>
            <GuardedRoute path="/" component={Home} exact />
            <GuardedRoute path="/movie/:id" component={Movie} />
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
          </Switch>
        </GuardProvider>
      </Suspense>
    </>
  );
};

export default App;
