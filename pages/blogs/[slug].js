import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { useState, useEffect } from 'react';
import { singleBlog, listRelated } from '../../actions/blog';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
import moment from 'moment';
import renderHTML from 'react-render-html';
import SmallCard from '../../components/blog/SmallCard';
import DisqusThread from '../../components/DisqusThread';

const SingleBlog = props => {
  const [related, setRelated] = useState([]);
  const { blog } = props;

  useEffect(() => {
    const loadRelated = () => {
      listRelated({ blog }).then(data => {
        if (data.error) {
          console.log(data.error);
        } else {
          setRelated(data);
        }
      });
    };
    loadRelated();
  }, [blog]);

  //seo search optimisation (meta tags)
  const head = () => (
    <Head>
      <title>
        {blog.title} | {APP_NAME}
      </title>
      <meta name="description" content={blog.mdesc} />
      <link rel="canonical" href={`${DOMAIN}/blogs/${blog.slug}`} />

      {/* below is for facebook link share data show */}
      <meta property="og:title" content={`${blog.title} | ${APP_NAME}`} />
      <meta property="og:description" content={blog.mdesc} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${DOMAIN}/blogs/${blog.slug}`} />
      <meta property="og:site_name" content={`${APP_NAME}`} />
      <meta property="og:image" content={`${API}/blog/photo/${blog.slug}`} />
      <meta
        property="og:image:secure_url"
        content={`${API}/blog/photo/${blog.slug}`}
      />
      <meta property="og:image:type" content="image/jpg" />
      <meta property="fb:app_id" content={`${FB_APP_ID}`} />
    </Head>
  );

  const showBlogCategories = () => {
    return blog.categories.map((c, i) => (
      <Link key={i} href={`/categories/${c.slug}`}>
        <a className="btn btn-primary mr-1 ml-1 mt-3">{c.name}</a>
      </Link>
    ));
  };

  const showBlogTags = () => {
    return blog.tags.map((t, i) => (
      <Link key={i} href={`/tags/${t.slug}`}>
        <a className="btn btn-outline-primary mr-1 ml-1 mt-3">{t.name}</a>
      </Link>
    ));
  };

  const showRelatedBlogs = () => {
    return related.map((b, i) => (
      <div key={i} className="col-md-4">
        <article>
          <SmallCard blog={b} />
        </article>
      </div>
    ));
  };

  const showComments = () => {
    return (
      <div>
        <DisqusThread
          id={blog._id}
          title={blog.title}
          path={`/blog/${blog.slug}`}
        />
      </div>
    );
  };

  return (
    <React.Fragment>
      {head()}
      <Layout>
        <main>
          <article>
            <div className="container-fluid">
              <section>
                <div className="row" style={{ marginTop: '-30px' }}>
                  <img
                    src={`${API}/blog/photo/${blog.slug}`}
                    alt={blog.title}
                    className="img img-fluid featured-image"
                  />
                </div>
              </section>

              <section>
                <div className="container">
                  <h1 className="display-4 pb-3 pt-3 text-center font-weight-bold">
                    {blog.title}
                  </h1>
                  <p className="lead mt-3 mark">
                    Written by{' '}
                    <Link href={`/profile/${blog.postedBy.username}`}>
                      <a>{blog.postedBy.username}</a>
                    </Link>{' '}
                    | Published {moment(blog.updatedAt).fromNow()}
                  </p>
                  <div className="pb-3">
                    {showBlogCategories()}
                    {showBlogTags()}
                    <br />
                    <br />
                  </div>
                </div>

                <div className="container">
                  <section>
                    <div className="col-md-12 lead">
                      {renderHTML(blog.body)}
                    </div>
                  </section>
                </div>

                <div className="container pb-5">
                  <h4 className="text-center pt-5 pb-5 h2">Related blogs</h4>
                  <hr />
                  <div className="row">{showRelatedBlogs()}</div>
                </div>

                <div className="container pt-5 pb-5">{showComments()}</div>
              </section>
            </div>
          </article>
        </main>
      </Layout>
    </React.Fragment>
  );
};

SingleBlog.getInitialProps = ({ query }) => {
  return singleBlog(query.slug).then(data => {
    if (data.error) {
      console.log(data.error);
    } else {
      return { blog: data };
    }
  });
};

export default SingleBlog;
