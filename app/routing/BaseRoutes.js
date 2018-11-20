import React                         from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect }                   from 'react-redux';

import routes from './serverRoutes';

function BaseRoutes({ location }) {
  return (
    <Switch>
      {
        routes[0]['routes'].map((item,i)=>{
          return(
            <Route key={i} exact={item['exact']} path={item['path']} component={item['component']} location={location} />
          );
        })
      }
    </Switch>
  );
}

export default withRouter(connect()(BaseRoutes));
