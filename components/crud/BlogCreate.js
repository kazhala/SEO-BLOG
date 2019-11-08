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
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'title':
      return {
        ...state,
        title: action.payload.value,
        error: '',
      };
    // case 'photo':
    //   return { ...state };
    case 'init':
      return { ...state, formData: new FormData() };
    case 'body':
      return { ...state, body: action.payload };
    default:
      return state;
  }
};

const BlogCreate = props => {
  const { router } = props;

  const [blogState, dispatch] = useReducer(reducer, initialState);

  const {
    body,
    error,
    sizeError,
    success,
    formData,
    title,
    hidePublishButton,
  } = blogState;

  useEffect(() => {
    dispatch({ type: 'init' });
  }, [router]);

  const publishBlog = e => {
    e.preventDefault();
    console.log('ready to publish blog');
  };

  const handleChange = (e, name) => {
    // console.log(e.target.value);
    const value = name === 'photo' ? e.target.files[0] : e.target.value;
    formData.set(name, value);
    dispatch({ type: name, payload: { value, formData } });
  };

  const handleBody = e => {
    // console.log(event);
    formData.set('body', e);
    dispatch({ type: 'body', payload: e });
    if (typeof window !== 'undefined') {
      localStorage.setItem('blog', JSON.stringify(e));
    }
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
    <div>
      {createBlogForm()}
      <hr />
      {JSON.stringify(title)}
      <hr />
      {JSON.stringify(body)}
    </div>
  );
};
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
