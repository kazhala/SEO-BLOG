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
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'blog':
      return { ...state, blog: action.payload };
    default:
      return state;
  }
};

const BlogUpdate = props => {
  const { router } = props;
  const [blogState, dispatch] = useReducer(reducer, initialState);
  const { blog } = blogState;

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

    initBlog();
  }, [router]);

  return (
    <div className="container-fluid pb-5">
      <div className="row">
        <div className="col-md-8">
          {JSON.stringify(blog)}
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
