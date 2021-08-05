import React, { useContext, useEffect, useState } from 'react';
import { SessionContext } from '../../App';
import styles from './SignUpPage.module.scss';

const SignUpPage = () => {
  const sessionContext: any = useContext(SessionContext);
  useEffect(() => {
    document.title = [sessionContext[0].appName, 'Discover'].join(': ')
  }, [ ]);
  
  const [requestData, setRequestData] = useState({
    emailAddress: '', displayName: '', password: ''
  });
  
  // When an error occurs while trying to create an account
  const [responseError, setResponseError] = useState('');
  
  const onInputKeyup = (event: any) => {
    if (event.target.name) {
      setRequestData({ ...requestData, [event.target.name]: event.target.value });
    }
  }

  const onFormSubmit = (event: any) => {
    event.preventDefault();
    // Reset the response error text
    setResponseError('');

    // Make sure the user has entered important information to create the account
    if (requestData.emailAddress && requestData.displayName && requestData.password) {
      // Send an account create request to the backend
    } else {
      // Let the user know the form is incomplete
      setResponseError('All fields are mandatory, please make sure you fill every field to create an account.');
    }
  }

  return (
    <>
      <div className="page-container">
        <form onSubmit={onFormSubmit} className="form">
          <h1>Create Account</h1>

          <p className={[styles.ResponseError, 'danger'].join(' ')}> <b>{responseError}</b> </p>
          
          <input type="text" placeholder="Email Address" name="emailAddress" onKeyUp={onInputKeyup}/>
          <input type="text" placeholder="Your Name" name="displayName"  onKeyUp={onInputKeyup}/>
          <input type="password" placeholder="Enter a password" name="password"  onKeyUp={onInputKeyup}/>
          <button type="submit">Become a Member</button>

          <p>By creating an account you agree to our <a href="">Terms and Conditions</a>. If you are already a member you can <a href="/sign_in">Sign in to your account.</a></p>
          
          <br />
        </form>
      </div>
    </>
  )
};

export default SignUpPage;
