import React, { useEffect } from "react";
import useComponentWillMount from "../../hooks/useComponentWillMount";
import * as ngprogress from "nprogress";
import { GuardedRoute } from "react-router-guards";
import "nprogress/nprogress.css";
ngprogress.configure({ parent: "#root", showSpinner: false });

const FancyRoute = ({ path, component, exact, meta }: any) => {
  useComponentWillMount(() => {
    ngprogress.start();
  });

  useEffect(() => {
    ngprogress.done();
  }, []);

  return (
    <GuardedRoute path={path} component={component} exact={exact} meta={meta} />
  );
};

export default FancyRoute;
