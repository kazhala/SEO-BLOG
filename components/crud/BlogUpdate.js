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
  categories: [],
  tags: [],
  checkedCat: [],
  checkedTag: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'formData':
      return { ...state, formData: new FormData() };
    case 'init':
      return {
        ...state,
        blog: action.payload.blog,
        title: action.payload.blog.title,
        body: action.payload.blog.body,
        categories: action.payload.cat,
        tags: action.payload.tag,
        checkedCat: action.payload.blog.categories.map(c => c._id),
        checkedTag: action.payload.blog.tags.map(t => t._id),
      };
    case 'error':
      return { ...state, error: action.payload };
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
  const {
    blog,
    error,
    success,
    formData,
    title,
    body,
    categories,
    tags,
    checkedCat,
    checkedTag,
  } = blogState;

  useEffect(() => {
    const initBlog = () => {
      if (router.query.slug) {
        singleBlog(router.query.slug).then(blog => {
          if (blog.error) {
            console.log(blog.error);
            dispatch({ type: 'error', payload: blog.error });
          } else {
            getCategories().then(cat => {
              if (cat.error) {
                console.log(cat.error);
                dispatch({ type: 'error', payload: cat.error });
              } else {
                getTags().then(tag => {
                  if (tag.error) {
                    console.log(tag.error);
                    dispatch({ type: 'error', payload: tag.error });
                  } else {
                    dispatch({ type: 'init', payload: { blog, cat, tag } });
                  }
                });
              }
            });
          }
        });
      }
    };

    dispatch({ type: 'formData' });
    initBlog();
  }, [router]);

  const handleCatToggle = cId => {
    const clickedCategory = checkedCat.indexOf(cId);
    const all = [...checkedCat];
    if (clickedCategory === -1) {
      all.push(cId);
    } else {
      all.splice(clickedCategory, 1);
    }
    // console.log(all);
    dispatch({ type: 'checkedCat', payload: all });
    formData.set('categories', all);
    // dispatch();
  };

  const handleTagToggle = tId => {
    const clickedTag = checkedTag.indexOf(tId);
    const all = [...checkedTag];
    if (clickedTag === -1) {
      all.push(tId);
    } else {
      all.splice(clickedTag, 1);
    }
    // console.log(all);
    dispatch({ type: 'checkedTag', payload: all });
    formData.set('tags', all);
    // dispatch();
  };

  const findOutCategory = cId => {
    const result = checkedCat.indexOf(cId);
    if (result === -1) {
      return false;
    } else {
      return true;
    }
  };

  const findOutTag = tId => {
    const result = checkedTag.indexOf(tId);
    if (result === -1) {
      return false;
    } else {
      return true;
    }
  };

  const showCategories = () => {
    return (
      categories &&
      categories.map((c, i) => (
        <li key={i} className="list-unstyled">
          <input
            onChange={() => handleCatToggle(c._id)}
            type="checkbox"
            className="mr-2"
            checked={findOutCategory(c._id)}
          />
          <label className="form-check-label">{c.name}</label>
        </li>
      ))
    );
  };

  const showTags = () => {
    return (
      tags &&
      tags.map((t, i) => (
        <li key={i} className="list-unstyled">
          <input
            onChange={() => handleTagToggle(t._id)}
            type="checkbox"
            className="mr-2"
            checked={findOutTag(t._id)}
          />
          <label className="form-check-label">{t.name}</label>
        </li>
      ))
    );
  };

  const handleBody = e => {
    formData.set('body', e);
    dispatch({ type: 'body', payload: e });
  };

  const editBlog = e => {
    e.preventDefault();
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
              <hr />

              <small className="text-muted">Max size: 1mb</small>
              <label className="btn btn-outline-info">
                Upload featured image
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => handleChange(e, 'photo')}
                  hidden
                />
              </label>
            </div>
          </div>

          <div>
            <h5>Categories</h5>
            <hr />
            <ul style={{ maxHeight: '200px', overflowY: 'scroll' }}>
              {showCategories()}
            </ul>
          </div>
          <div>
            <h5>Tags</h5>
            <hr />
            <ul style={{ maxHeight: '200px', overflowY: 'scroll' }}>
              {showTags()}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(BlogUpdate);
