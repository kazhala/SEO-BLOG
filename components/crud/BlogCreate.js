import Link from 'next/link';
import { useReducer, useEffect } from 'react';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
import { getCookie, isAuth } from '../../actions/auth';
import { getCategories } from '../../actions/category';
import { getTags } from '../../actions/tag';
import { createBlog } from '../../actions/blog';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import '../../node_modules/react-quill/dist/quill.snow.css';

const initialState = {
  body: {},
  error: '',
  sizeError: '',
  success: false,
  formData: '',
  title: '',
  hidePublishButton: false,
  categories: [],
  tags: [],
  checkedCat: [],
  checkedTag: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'title':
      return {
        ...state,
        title: action.payload.value,
        error: '',
      };
    case 'init':
      //check if there is data in localStorage and save it in state
      return {
        ...state,
        body: action.payload.storedBlogData
          ? action.payload.storedBlogData
          : {},
        categories: action.payload.cat,
        tags: action.payload.tag,
      };
    case 'formData':
      return { ...state, formData: new FormData() };
    case 'error':
      return {
        ...state,
        error: action.payload,
      };
    case 'body':
      return { ...state, body: action.payload };
    case 'checkedCat':
      return { ...state, error: '', checkedCat: action.payload };
    default:
      return state;
  }
};

const BlogCreate = props => {
  const { router } = props;

  const [blogState, dispatch] = useReducer(reducer, initialState);

  //deConstruct from state
  const {
    body,
    error,
    sizeError,
    success,
    formData,
    title,
    hidePublishButton,
    tags,
    categories,
    checkedCat,
    checkedTag,
  } = blogState;

  //re-run the effect when the page reload
  useEffect(() => {
    //check loaclstorage if there's data
    const blogFromLS = () => {
      if (typeof window === 'undefined') {
        return false;
      }
      if (localStorage.getItem('blog')) {
        return JSON.parse(localStorage.getItem('blog'));
      } else {
        return false;
      }
    };

    const initData = storedBlogData => {
      getCategories().then(cat => {
        if (cat.error) {
          dispatch({ type: 'error', payload: cat.error });
        } else {
          getTags().then(tag => {
            if (tag.error) {
              dispatch({ type: 'error', payload: tag.error });
            } else {
              dispatch({ type: 'init', payload: { storedBlogData, cat, tag } });
            }
          });
        }
      });
    };
    dispatch({ type: 'formData' });
    const storedBlogData = blogFromLS();
    initData(storedBlogData);
  }, [router]);

  const publishBlog = e => {
    e.preventDefault();
    console.log('ready to publish blog');
  };

  const handleChange = (e, name) => {
    //check the incoming event type
    const value = name === 'photo' ? e.target.files[0] : e.target.value;
    //set the form data
    formData.set(name, value);
    dispatch({ type: name, payload: { value, formData } });
  };

  const handleBody = e => {
    // console.log(event);
    formData.set('body', e);
    dispatch({ type: 'body', payload: e });
    //save the body detail in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('blog', JSON.stringify(e));
    }
  };

  const handleToggle = cId => {
    const clickedCategory = checkedCat.indexOf(cId);
    const all = [...checkedCat];
    if (clickedCategory === -1) {
      all.push(cId);
    } else {
      all.splice(clickedCategory, 1);
    }
    console.log(all);
    dispatch({ type: 'checkedCat', payload: all });
    formData.set('categories', all);
    // dispatch();
  };

  const showCategories = () => {
    return (
      categories &&
      categories.map((c, i) => (
        <li key={i} className="list-unstyled">
          <input
            onChange={() => handleToggle(c._id)}
            type="checkbox"
            className="mr-2"
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
          <input type="checkbox" className="mr-2" />
          <label className="form-check-label">{t.name}</label>
        </li>
      ))
    );
  };

  const createBlogForm = () => {
    return (
      <form onSubmit={publishBlog}>
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
            modules={BlogCreate.modules}
            formats={BlogCreate.formats}
            value={body}
            placeholder="Write something amazing..."
            onChange={handleBody}
          />
        </div>

        <div>
          <button className="btn btn-primary" type="submit">
            Publish
          </button>
        </div>
      </form>
    );
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-8">
          {createBlogForm()}
          <hr />
          {JSON.stringify(title)}
          <hr />
          {JSON.stringify(body)}
          <hr />
          {JSON.stringify(tags)}
          <hr />
          {JSON.stringify(categories)}
        </div>
        <div className="col-md-4">
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

//react quill config
BlogCreate.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { header: [3, 4, 5, 6] }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image', 'video'],
    ['clean'],
    ['code-block'],
  ],
};

BlogCreate.formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'link',
  'image',
  'video',
  'code-block',
];
export default withRouter(BlogCreate);
