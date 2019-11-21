import Link from 'next/link';
import { useReducer, useEffect, useCallback } from 'react';
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

const BlogRead = props => {
  const [blogState, dispatch] = useReducer(reducer, initialState);
  const token = getCookie('token');
  const { username } = props;

  const { blogs, message } = blogState;

  const loadBlogs = useCallback(() => {
    list(username).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        dispatch({ type: 'blogs', payload: data });
      }
    });
  }, [username]);

  //load all the blogs when the component mounts
  useEffect(() => {
    loadBlogs();
  }, [loadBlogs]);

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

  const showUpdateButton = blog => {
    if (isAuth() && isAuth().role === 0) {
      return (
        <Link href={`/user/crud/${blog.slug}`}>
          <a className="ml-2 btn btn-sm btn-warning">Update</a>
        </Link>
      );
    } else if (isAuth() && isAuth().role === 1) {
      return (
        <Link href={`/admin/crud/${blog.slug}`}>
          <a className="ml-2 btn btn-sm btn-warning">Update</a>
        </Link>
      );
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
            className="btn btn-sm btn-danger"
            onClick={() => deleteConfirm(blog.slug)}
          >
            Delete
          </button>
          {showUpdateButton(blog)}
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
