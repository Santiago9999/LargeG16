import React from 'react';
import ForgotPassword from '../components/ForgotPassword'
import NavigationBar from '../components/NavigationBar';

const ForgotPasswordPage = () => {
    return(
        <div>
            <NavigationBar />
           <br/> <h1> Forgot Password </h1> <br/>
            <p> Enter your email below and we will send you a code to reset your password. </p>
            <ForgotPassword />
        </div>

    );
};

export default ForgotPasswordPage;