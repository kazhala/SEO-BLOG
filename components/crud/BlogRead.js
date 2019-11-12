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
    default:
      return state;
  }
};

const BlogRead = () => {
  const [blogState, dispatch] = useReducer(reducer, initialState);
  const token = getCookie('token');

  const { blogs, message } = blogState;

  //load all the blogs when the component mounts
  useEffect(() => {
    const loadBlogs = () => {
      list().then(data => {
        if (data.error) {
          console.log(data.error);
        } else {
          dispatch({ type: 'blogs', payload: data });
        }
      });
    };

    loadBlogs();
  }, []);

  const showAllBlogs = () => {
    return blogs.map((blog, i) => {
      return (
        <div key={i} className="mt-5">
          <h3>{blog.title}</h3>
          <p className="mark">
            Written by {blog.postedBy.name} | Published on{' '}
            {moment(blog.updatedAt).fromNow()}}
          </p>
        </div>
      );
    });
  };

  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-md-12">{showAllBlogs()}</div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default BlogRead;
