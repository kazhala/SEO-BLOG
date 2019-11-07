import { useReducer, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { isAuth, getCookie } from '../../actions/auth';
import { create, getCategories, removeCategory } from '../../actions/category';

const initalState = {
  name: '',
  error: false,
  success: false,
  categories: [],
  removed: false,
  reload: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'name':
      return {
        ...state,
        name: action.payload,
        error: false,
        success: false,
        removed: false,
      };
    case 'error':
      return {
        ...state,
        error: action.payload,
        success: false,
        removed: false,
      };
    case 'success':
      return {
        ...state,
        error: false,
        success: true,
        name: '',
        removed: false,
        reload: !state.reload,
      };
    case 'categories':
      return { ...state, categories: action.payload };
    case 'removed':
      return {
        ...state,
        error: false,
        success: false,
        name: '',
        removed: true,
        reload: !state.reload,
      };
    case 'clear':
      return { ...state, error: '', success: false, removed: false };
    default:
      return state;
  }
};

const Category = () => {
  const [categoryState, dispatch] = useReducer(reducer, initalState);
  const { name, error, success, categories, removed, reload } = categoryState;
  const token = getCookie('token');

  useEffect(() => {
    const loadCategories = () => {
      getCategories().then(res => {
        console.log(res);
        if (res.error) {
          console.log(res.error);
          dispatch({ type: 'error', payload: res.error });
        } else {
          dispatch({ type: 'categories', payload: res });
        }
      });
    };

    // console.log('re0render');
    loadCategories();
  }, [reload]);

  const handleSubmit = e => {
    e.preventDefault();
    // console.log("create category", name);
    create({ name }, token).then(res => {
      // console.log(res);
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

  const deleteCategory = slug => {
    // console.log('delete', slug);
    removeCategory(slug, token).then(res => {
      if (res.error) {
        dispatch({ type: 'error', payload: res.error });
      } else {
        dispatch({ type: 'removed' });
      }
    });
  };

  const deleteConfirm = slug => {
    let answer = window.confirm(
      'Are you sure you want to delete this category?'
    );
    if (answer) {
      deleteCategory(slug);
    }
  };

  const showCategories = () => {
    return categories.map((cat, index) => {
      return (
        <button
          onDoubleClick={() => deleteConfirm(cat.slug)}
          title="Double click to delete"
          key={index}
          className="btn btn-outline-primary mr-1 ml-1 mt-3"
        >
          {cat.name}
        </button>
      );
    });
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

  const showSuccess = () => {
    if (success) {
      return <p className="text-success">Category is created</p>;
    }
  };

  const showError = () => {
    if (error) {
      return <p className="text-danger">Category already exists</p>;
    }
  };

  const showRemoved = () => {
    if (removed) {
      return <p className="text-danger">Category is removed</p>;
    }
  };

  const mouseMoveHandler = e => {
    dispatch({ type: 'clear' });
  };

  return (
    <React.Fragment>
      {showSuccess()}
      {showError()}
      {showRemoved()}

      <div onMouseMove={mouseMoveHandler}>
        {newCategoryForm()}
        {showCategories()}
      </div>
    </React.Fragment>
  );
};

export default Category;
