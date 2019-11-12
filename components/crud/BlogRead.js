import Link from 'next/link';
import { useReducer, useEffect } from 'react';
import Router from 'next/router';
import { getCookie, isAuth } from '../../actions/auth';
import { list, removeBlog } from '../../actions/blog';
import moment from 'moment';

const initialState = {
  blogs: [],
  message: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'blogs':
      return { ...state, blogs: action.payload };
    case 'message':
      return { ...state, message: action.payload };
    default:
      return state;
  }
};

const BlogRead = () => {
  const [blogState, dispatch] = useReducer(reducer, initialState);
  const token = getCookie('token');

  const { blogs, message } = blogState;

  const loadBlogs = () => {
    list().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        dispatch({ type: 'blogs', payload: data });
      }
    });
  };

  //load all the blogs when the component mounts
  useEffect(() => {
    loadBlogs();
  }, []);

  const deleteBlog = slug => {
    removeBlog(slug, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        dispatch({ type: 'message', payload: data.message });
        loadBlogs();
      }
    });
  };

  const deleteConfirm = slug => {
    let answer = window.confirm('Are you sure you want to delete your blog?');
    if (answer) {
      deleteBlog(slug);
    }
  };

  const showAllBlogs = () => {
    return blogs.map((blog, i) => {
      return (
        <div key={i} className="pb-5">
          <h3>{blog.title}</h3>
          <p className="mark">
            Written by {blog.postedBy.name} | Published on{' '}
            {moment(blog.updatedAt).fromNow()}}
          </p>
          <button
            className="btn btn-small btn-danger"
            onClick={() => deleteConfirm(blog.slug)}
          >
            Delete
          </button>
        </div>
      );
    });
  };

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-md-12">
          {message && <div className="alert alert-warning">{message}</div>}
          {showAllBlogs()}
        </div>
      </div>
    </React.Fragment>
  );
};

export default BlogRead;
