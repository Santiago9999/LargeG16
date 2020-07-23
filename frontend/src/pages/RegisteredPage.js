import React from 'react';
import NavigationBar from '../components/NavigationBar';
import Verification from '../components/Verification';

const RegisteredPage = () => {
    return(
        <div>
            <NavigationBar />
          <br/>  <h1> Thank You for Registering! </h1> <br/>
          <p> We have sent you an email with a verification code. </p>
          <p> Please verify your email by entering that code below in order to complete setting up your account. </p>
          <p> If you have not received the verification email, please check your Spam folder. </p>
          <Verification />
        </div>

    );
};

export default RegisteredPage;