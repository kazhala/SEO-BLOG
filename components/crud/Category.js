import { useReducer, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { isAuth, getCookie } from '../../actions/auth';
import { create } from '../../actions/category';

const initalState = {
  name: '',
  error: false,
  success: false,
  categories: [],
  removed: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'name':
      return {
        ...state,
        name: action.payload,
        error: false,
        success: false,
        removed: '',
      };
    case 'error':
      return { ...state, error: action.payload, success: false };
    case 'success':
      return { ...state, error: false, success: true, name: '' };
    default:
      return state;
  }
};

const Category = () => {
  const [categoryState, dispatch] = useReducer(reducer, initalState);
  const { name, error, success, categories, removed } = categoryState;
  const token = getCookie('token');

  const handleSubmit = e => {
    e.preventDefault();
    // console.log("create category", name);
    create({ name }, token).then(res => {
      console.log(res);
      if (res.error) {
        dispatch({ type: 'error', payload: res.error });
      } else {
        dispatch({ type: 'success' });
      }
    });
  };

  const handleChange = e => {
    dispatch({ type: 'name', payload: e.target.value });
  };

  const newCategoryForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          className="form-control"
          type="text"
          onChange={handleChange}
          value={name}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Create
      </button>
    </form>
  );

  return <React.Fragment>{newCategoryForm()}</React.Fragment>;
};

export default Category;