/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Provider } from 'react-redux';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import store from '../Redux/store';
import DeveloperForgotPassword from '../Developer/forgotpassword';
import DeveloperRegister from '../Developer/register';
import AdminLogin from '../Admin/login';
import AdminForgotPassword from '../Admin/forgotpassword';
import AdminRegister from '../Admin/register';
import AdminViewProfile from '../Admin/viewprofile';
import CompanyPostJob from '../Company/postJob';
import CompanyRegister from '../Company/register';
import CompanyLogin from '../Company/login';
import CompanyForgotPassword from '../Company/forgotpassword';
import GlobalStyle from '../../global-styles';
import 'bootstrap/dist/css/bootstrap.min.css';
// import image from '../../images/curve-1.png';
import JobDashboard from '../Jobs/jobdashboard';
import JobDetails from '../Jobs/jobdetails';
import DeveloperViewProfile from '../Developer/viewprofile';
import elements from '../../components/NavigationBar/NavigationBarData';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import DeveloperLogin from '../Developer/login';
export default function App() {
  return (
    <Provider store={store}>
      <Router>
        {/* <Navbar />
        <div className="background-curve">
          <img src={image} alt="" />
        </div>
        */}
        <NavigationBar title="{Dɪ’vɛləpɜrz}" elements={elements} />
        <Switch>
          {/* Developer Routes */}
          <Route exact path="/" component={HomePage} />
          <Route
            exact
            path="/Developer/Register"
            component={DeveloperRegister}
          />
          <Route exact path="/Developer/Login" component={DeveloperLogin} />
          <Route
            exact
            path="/Developer/Forgotpassword"
            component={DeveloperForgotPassword}
          />
          <Route
            exact
            path="/Developer/ViewProfile"
            component={DeveloperViewProfile}
          />
          <Route exact path="/Jobs/JobsDashboard" component={JobDashboard} />
          <Route path="/Jobs/:id" component={JobDetails} />
          {/* Admin Routes */}
          <Route exact path="/Admin/Login" component={AdminLogin} />
          <Route exact path="/Admin/Register" component={AdminRegister} />
          <Route
            exact
            path="/Admin/Forgotpassword"
            component={AdminForgotPassword}
          />
          <Route exact path="/Admin/profile" component={AdminViewProfile} />
          {/* Company Routes */}
          <Route exact path="/Company/Register" component={CompanyRegister} />
          <Route exact path="/Company/Login" component={CompanyLogin} />
          <Route
            exact
            path="/Company/forgotpassword"
            component={CompanyForgotPassword}
          />
          <Route exact path="/Company/Post/Job" component={CompanyPostJob} />
          <Route component={NotFoundPage} />
        </Switch>
        <GlobalStyle />
      </Router>
    </Provider>
  );
}
