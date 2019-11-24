/**
 * Sign in component
 */
import { useReducer, useEffect } from 'react';
import { isAuth, signin, authenticate } from '../../actions/auth';
import Router from 'next/router';
import Link from 'next/link';
import LoginGoogle from './LoginGoogle';

//use reducer initial state
const initialState = {
  email: 'xuzhuang9897@gmail.com',
  password: '111111',
  error: '',
  loading: false,
  message: '',
  showForm: true,
};

//use reducer reducer methods
const reducer = (state, action) => {
  switch (action.type) {
    case 'email':
      return { ...state, email: action.payload };
    case 'password':
      return { ...state, password: action.payload };
    case 'loading':
      return { ...state, loading: true, error: '' };
    case 'error':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const SignInComponent = () => {
  const [formState, dispatch] = useReducer(reducer, initialState);
  const { email, password, loading, error, message, showForm } = formState;

  useEffect(() => {
    if (isAuth()) {
      Router.push('/');
    }
  }, []);

  //handle form submission
  const handleSubmit = e => {
    e.preventDefault();
    dispatch({ type: 'loading' });
    const user = { email, password };
    signin(user).then(res => {
      if (res.error) {
        dispatch({ type: 'error', payload: res.error });
      } else {
        //save user token to cookie
        //save user info to local storage
        //authenticate user
        authenticate(res, () => {
          if (isAuth() && isAuth().role === 1) {
            Router.push('/admin');
          } else {
            Router.push('/user');
          }
        });
      }
    });
  };

  const showLoading = () =>
    loading ? (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    ) : (
      ''
    );

  const showError = () =>
    error ? <div className="alert alert-danger">{error}</div> : '';

  const showMessage = () =>
    message ? <div className="alert alert-info">{message}</div> : '';

  //handle form input field change
  const handleChange = e => {
    //based on event value and name dispatch action to change values
    dispatch({ type: e.target.name, payload: e.target.value });
  };

  const signinForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            value={email}
            name="email"
            className="form-control"
            type="email"
            placeholder="Type your email"
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <input
            value={password}
            name="password"
            className="form-control"
            type="password"
            placeholder="Type your password"
            onChange={handleChange}
          />
        </div>

        <div>
          <button className="btn btn-primary">Sign In</button>
        </div>
      </form>
    );
  };

  return (
    <React.Fragment>
      {showError()}
      {showMessage()}
      {showLoading()}
      <LoginGoogle />
      {showForm && signinForm()}
      <br />
      <Link href="/auth/password/forgot">
        <a className="btn btn-outline-danger btn-sm">Forgot password</a>
      </Link>
    </React.Fragment>
  );
};

export default SignInComponent;
