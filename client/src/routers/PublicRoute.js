import React from 'react';
import {connect} from 'react-redux';
import {Route,Redirect} from 'react-router-dom';
import Header from '../components/Header';
export const PublicRoute = ({
  isAuthenticated,
  component:Component,
  ...rest
}) => {
  return <Route {...rest} component={(props) => {
    return isAuthenticated ? (
      <Redirect to="/homepage"/>

    ):(
      <div>
        <Header></Header>
        <Component {...props}></Component>
        <Footer></Footer>
      </div>
    )

  }}></Route>
};
const mapStateToProps = (state) => {
  return {isAuthenticated: !!state.token};
};

export default connect(mapStateToProps)(PublicRoute);
