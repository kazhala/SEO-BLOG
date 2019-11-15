import Link from 'next/link';
import { useReducer, useEffect } from 'react';
import Router from 'next/router';
import { getCookie, isAuth } from '../../actions/auth';
import { getProfile, update } from '../../actions/user';

const initialState = {
  username: '',
  name: '',
  email: '',
  password: '',
  about: '',
  error: false,
  success: false,
  loading: false,
  photo: '',
  userData: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'error':
      return { ...state, error: action.payload };
    case 'mount':
      return {
        ...state,
        username: action.payload.username,
        name: action.payload.name,
        email: action.payload.email,
        about: action.payload.about,
      };
    default:
      return state;
  }
};

const ProfileUpdate = () => {
  const [updateState, dispatch] = useReducer(reducer, initialState);

  const token = getCookie('token');
  const {
    username,
    name,
    email,
    password,
    error,
    success,
    loading,
    photot,
    userData,
  } = updateState;

  useEffect(() => {
    getProfile(token).then(data => {
      if (data.error) {
        dispatch({ type: 'error', payload: data.error });
      } else {
        dispatch({ type: 'mount', payload: data });
      }
    });
  }, [token]);

  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-md-4">image</div>
          <div className="col-md-8">
            update form
            {JSON.stringify({ username, email, name })}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProfileUpdate;
