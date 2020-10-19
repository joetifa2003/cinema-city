import React, { Suspense } from "react";
import Nav from "./components/Nav/Nav";
import { Route, Switch } from "react-router-dom";
const Home = React.lazy(() => import("./pages/Home"));
const Movie = React.lazy(() => import("./pages/Movie"));
const AddMovie = React.lazy(() => import("./pages/admin/AddMovie"));

const App = () => {
  return (
    <>
      <Nav />
      <Suspense fallback={<div className="w-full h-full bg-bg"></div>}>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/movie/:id" component={Movie} />
          <Route path="/admin/add_movie" component={AddMovie} exact />
        </Switch>
      </Suspense>
    </>
  );
};

export default App;
