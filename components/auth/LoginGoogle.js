import Link from 'next/link';
import { useReducer, useEffect } from 'react';
import Router from 'next/router';
import { loginWithGoogle } from '../../actions/auth';
import { GOOGLE_CLIENT_ID } from '../../config';
import GoogleLogin from 'react-google-login';

const LoginGoogle = () => {
  const responseGoogle = res => {
    console.log(res);
  };

  return (
    <div className="pb-3">
      <GoogleLogin
        clientId={GOOGLE_CLIENT_ID}
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        theme="dark"
      />
    </div>
  );
};

export default LoginGoogle;
