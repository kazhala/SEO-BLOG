/**
 * Sign up form main component
 */
import { useReducer, useEffect } from 'react';
import { signup, isAuth, preSignup } from '../../actions/auth';
import Router from 'next/router';

//use reducer initial state
const initialState = {
  name: 'Kevin',
  email: 'kevin7441@gmail.com',
  password: '111111',
  error: '',
  loading: false,
  message: '',
  showForm: true,
};

//use reducer reducer methods
const reducer = (state, action) => {
  switch (action.type) {
    case 'name':
      return { ...state, name: action.payload };
    case 'email':
      return { ...state, email: action.payload };
    case 'password':
      return { ...state, password: action.payload };
    case 'loading':
      return { ...state, loading: true, error: '' };
    case 'error':
      return { ...state, loading: false, error: action.payload };
    case 'success':
      return {
        ...state,
        name: '',
        email: '',
        password: '',
        loading: false,
        message: action.payload,
        showForm: false,
      };
    default:
      return state;
  }
};

const SignUpComponent = () => {
  const [formState, dispatch] = useReducer(reducer, initialState);
  const {
    name,
    email,
    password,
    loading,
    error,
    message,
    showForm,
  } = formState;

  useEffect(() => {
    isAuth() && Router.push('/');
  }, []);

  //handle form submission
  const handleSubmit = e => {
    e.preventDefault();
    dispatch({ type: 'loading' });
    const user = { name, email, password };
    preSignup(user).then(res => {
      if (res.error) {
        dispatch({ type: 'error', payload: res.error });
      } else {
        dispatch({ type: 'success', payload: res.message });
      }
    });
  };

  const showLoading = () =>
    loading ? <div className="alert alert-info">Loading...</div> : '';

  const showError = () =>
    error ? <div className="alert alert-danger">{error}</div> : '';

  const showMessage = () =>
    message ? <div className="alert alert-info">{message}</div> : '';

  //handle form input field change
  const handleChange = e => {
    //based on event value and name dispatch action to change values
    dispatch({ type: e.target.name, payload: e.target.value });
  };

  const signupForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            value={name}
            name="name"
            className="form-control"
            type="text"
            placeholder="Type your name"
            onChange={handleChange}
          />
        </div>

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
          <button className="btn btn-primary">Signup</button>
        </div>
      </form>
    );
  };

  return (
    <React.Fragment>
      {showError()}
      {showMessage()}
      {showLoading()}
      {showForm && signupForm()}
    </React.Fragment>
  );
};

export default SignUpComponent;
