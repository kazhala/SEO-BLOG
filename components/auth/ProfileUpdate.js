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
    photo,
    userData,
    about,
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

  const handleChange = (e, name) => {};

  const handleSubmit = e => {
    e.preventDefault();
  };

  const profileUpdateForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="btn btn-outline-info">
          Profile photo
          <input
            type="file"
            accept="image/*"
            onChange={e => handleChange(e, 'photo')}
            hidden
          />
        </label>
      </div>

      <div className="form-group">
        <label className="text-muted">Username</label>
        <input
          type="text"
          className="form-control"
          value={username}
          onChange={e => handleChange(e, 'username')}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">name</label>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={e => handleChange(e, 'name')}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">email</label>
        <input
          type="text"
          className="form-control"
          value={email}
          onChange={e => handleChange(e, 'email')}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">About</label>
        <textarea
          type="text"
          className="form-control"
          value={about}
          onChange={e => handleChange(e, 'about')}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">password</label>
        <input
          type="text"
          className="form-control"
          value={password}
          onChange={e => handleChange(e, 'password')}
        />
      </div>
      <div>
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </div>
    </form>
  );

  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-md-4">image</div>
          <div className="col-md-8 mb-5">{profileUpdateForm()}</div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProfileUpdate;
