import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { useReducer } from 'react';
import { listBlogsWithCategoriesAndTags } from '../../actions/blog';
import { API } from '../../config';

const Blogs = props => {
  const { blogs, categories, tags, size } = props;
  return (
    <Layout>
      <main>
        <div className="container-fluid">
          <header>
            <div className="col-md-12 pt-3">
              <h1 className="display-4 font-weight-bold text-center">
                Programming blogs and tutorials
              </h1>
            </div>
            <section>
              <p>Show categories and tags</p>
            </section>
          </header>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">{JSON.stringify(blogs)}</div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

//serverside render
Blogs.getInitialProps = () => {
  return listBlogsWithCategoriesAndTags().then(res => {
    if (res.error) {
      console.log(res.error);
    } else {
      return {
        blogs: res.blogs,
        categories: res.categories,
        tags: res.tags,
        size: res.size,
      };
    }
  });
};

export default Blogs; //getInitialProps
