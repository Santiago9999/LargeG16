import React from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import RegisteredPage from './pages/RegisteredPage';
import LoggedInPage from './pages/LoggedInPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import './components/Background.css';
import MyAccountPage from './pages/AppJ';
import LeaderboardPage from './pages/Leaderboard';

function App()  {
    return (
    <Router>
            <Switch> 
            <Route path="/" exact>
                    <HomePage />
                </Route>
				
				<Route path="/myaccount" exact>
                    <MyAccountPage />
                </Route>

                <Route path="/leaderboard" exact>
                    <LeaderboardPage />
                </Route>

                <Route path="/register" exact>
                    <RegisterPage />
                </Route>

                <Route path="/registered" exact>
                    <RegisteredPage />
                </Route>

                <Route path="/login" exact>
                    <LoginPage />
                </Route>

                <Route path="/logged" exact>
                    <LoggedInPage />
                </Route>

                <Route path="/forgotpassword" exact>
                    <ForgotPasswordPage />
                </Route>

                <Route path="/resetpassword" exact>
                    <ResetPasswordPage />
                </Route>

                <Redirect to = "/" />
            </Switch>
        </Router>

    );
};

export default App;