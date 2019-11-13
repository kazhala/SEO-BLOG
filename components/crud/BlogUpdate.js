import Link from 'next/link';
import { useReducer, useEffect } from 'react';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
import { getCookie, isAuth } from '../../actions/auth';
import { getCategories } from '../../actions/category';
import { getTags } from '../../actions/tag';
import { singleBlog, updateBlog } from '../../actions/blog';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import '../../node_modules/react-quill/dist/quill.snow.css';
import { Quillformats, Quillmodules } from '../../helpers/quill';

const initialState = {
  blog: {},
  error: '',
  success: false,
  formData: '',
  title: '',
  body: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'formData':
      return { ...state, formData: new FormData() };
    case 'blog':
      return {
        ...state,
        blog: action.payload,
        title: action.payload.title,
        body: action.payload.body,
      };
    case 'body':
      return { ...state, body: action.payload };
    case 'title':
      return { ...state, title: action.payload, error: '' };
    default:
      return state;
  }
};

const BlogUpdate = props => {
  const { router } = props;
  const [blogState, dispatch] = useReducer(reducer, initialState);
  const { blog, error, success, formData, title, body } = blogState;

  useEffect(() => {
    const initBlog = () => {
      if (router.query.slug) {
        singleBlog(router.query.slug).then(data => {
          if (data.error) {
            console.log(data.error);
          } else {
            dispatch({ type: 'blog', payload: data });
          }
        });
      }
    };

    dispatch({ type: 'formData' });
    initBlog();
  }, [router]);

  const handleBody = e => {
    formData.set('body', e);
    dispatch({ type: 'body', payload: e });
  };

  const editBlog = () => {
    console.log('update blog');
  };

  const handleChange = (e, name) => {
    //check the incoming event type
    const value = name === 'photo' ? e.target.files[0] : e.target.value;
    //set the form data
    formData.set(name, value);
    if (name !== 'photo') {
      dispatch({ type: name, payload: value });
    }
  };

  const updateBlogForm = () => {
    return (
      <form onSubmit={editBlog}>
        <div className="form-group">
          <label className="text-muted">Title</label>
          <input
            className="form-control"
            value={title}
            onChange={e => handleChange(e, 'title')}
          />
        </div>

        <div className="form-group">
          <ReactQuill
            modules={Quillmodules}
            formats={Quillformats}
            value={body}
            placeholder="Write something amazing..."
            onChange={handleBody}
          />
        </div>

        <div>
          <button className="btn btn-primary" type="submit">
            Update
          </button>
        </div>
      </form>
    );
  };

  return (
    <div className="container-fluid pb-5">
      <div className="row">
        <div className="col-md-8">
          {updateBlogForm()}
          <div className="pt-3">show success and error msg</div>
        </div>
        <div className="col-md-4">
          <div>
            <div className="form-group pb-2">
              <h5>Featured image</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(BlogUpdate);
