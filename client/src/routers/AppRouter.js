import React from 'react';
import HomePage from '../components/HomePage';
import EditBusinessPage from '../components/EditBusinessPage';
import RegisterBusinessPage from '../components/RegisterBusinessPage';
import SearchBusinessPage from '../components/SearchBusinessPage';
import BusinessPage from '../components/BusinessPage';
import SignupPage from '../components/SignupPage';
import Comp404 from '../components/Comp404';
import {Router, Switch, Route} from 'react-router-dom';
import LoginPage from '../components/LoginPage';
import createHistory from 'history/createBrowserHistory';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
export const history = createHistory();
const AppRouter = () =>(
  <Router history={history}>

      <Switch>
        <PublicRoute path="/" component={LoginPage}  exact={true}></PublicRoute>
        <PublicRoute path="/signup" component={SignupPage}></PublicRoute>
        <PrivateRoute path='/homepage' component={HomePage}></PrivateRoute>
        <PrivateRoute path='/business/:id' component={BuisnessPage}></PrivateRoute>
        <PrivateRoute path='/business/:id/update' component={EditBusinessPage}></PrivateRoute>
        <PrivateRoute path='/business/register' component={RegisterBusinessPage}></PrivateRoute>
        <PrivateRoute path="/search" component={SearchBusinessPage}></PrivateRoute>
        <Route component={Comp404} ></Route>
      </Switch>

    </Router>

);
export default AppRouter;
