import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

const auth = window.user.data

const renderRoutes = (routes, switchProps = {}) => {
  let routers = []

  routes.forEach( (route, i)  => {
    if(route.permission.indexOf(auth) >= 0){
      routers.push(
        <Route
          key={route.key || i}
          path={route.path}
          exact={route.exact}
          strict={route.strict}
          render={(props) => (
            <route.component {...props} {...route.extraProps} route={route} />
          )}
        />
      )
    }else{
      routers.push(
        <Redirect key={route.key || i} from={route.path} to="/login" />
      )
    }
  });
  
  return (
    <Switch {...switchProps}>
      {routers}
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default renderRoutes;
