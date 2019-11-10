import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { useReducer } from 'react';
import { listBlogsWithCategoriesAndTags } from '../../actions/blog';
import { API } from '../../config';
import moment from 'moment';
import renderHTML from 'react-render-html';

const Blogs = props => {
  const { blogs, categories, tags, size } = props;

  const showAllBlogs = () => {
    return blogs.map((blog, index) => (
      <article key={index}>
        <div className="lead pb-4">
          <header>
            <Link href={`/blogs/${blog.slug}`}>
              <a>
                <h2 className="pt-3 pb-3 font-weight-bold">{blog.title}</h2>
              </a>
            </Link>
          </header>

          <section>
            <p className="mark ml-1 pt-2 pb-2">
              Written by {blog.postedBy.name} | Published{' '}
              {moment(blog.updatedAt).fromNow()}
            </p>
          </section>
          <section>
            <p>blog categories and tags</p>
          </section>

          <div className="row">
            <div className="col-md-4">Image</div>
            <div className="col-md-8">
              <section>
                <div className="pb-3">{renderHTML(blog.excerpt)}</div>
                <Link href={`/blogs/${blog.slug}`}>
                  <a className="btn btn-primary pt-2">Read more</a>
                </Link>
              </section>
            </div>
          </div>
        </div>
        <hr />
      </article>
    ));
  };

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
            <div className="col-md-12">{showAllBlogs()}</div>
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
