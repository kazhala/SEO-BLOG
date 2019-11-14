import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { readTag } from '../../actions/tag';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
import moment from 'moment';
import renderHTML from 'react-render-html';
import Card from '../../components/blog/Card';
import { withRouter } from 'next/router';

const Tag = props => {
  const { query, tag, blogs, router } = props;

  const head = () => {
    return (
      <Head>
        <title>
          {tag.name} | {APP_NAME}
        </title>
        <meta
          name="description"
          content={`Best programming tutorials on ${tag.name}`}
        />
        <link rel="canonical" href={`${DOMAIN}/tags/${query.slug}`} />
        {/* below is for facebook link share data show */}
        <meta property="og:title" content={`${tag.name} | ${APP_NAME}`} />
        <meta
          property="og:description"
          content={`Best programming tutorials on ${tag.name}`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${DOMAIN}/tags/${query.slug}`} />
        <meta property="og:site_name" content={`${APP_NAME}`} />
        <meta
          property="og:image"
          content={`${DOMAIN}/static/images/seo-blog.png`}
        />
        <meta
          property="og:image:secure_url"
          content={`${DOMAIN}/static/images/seo-blog.png`}
        />
        <meta property="og:image:type" content="image/png" />
        <meta property="fb:app_id" content={`${FB_APP_ID}`} />
      </Head>
    );
  };

  return (
    <React.Fragment>
      {head()}
      <Layout>
        <main>
          <div className="container-fluid text-center">
            <header>
              <div className="col-md-12 pt-3">
                <h1 className="display-4 font-weight-bold">{tag.name}</h1>
                {blogs.map((b, i) => (
                  <div key={i}>
                    <Card blog={b} />
                    <hr />
                  </div>
                ))}
              </div>
            </header>
          </div>
        </main>
      </Layout>
    </React.Fragment>
  );
};

Tag.getInitialProps = ({ query }) => {
  return readTag(query.slug).then(data => {
    if (data.error) {
      console.log(data.error);
    } else {
      return { query, tag: data.tag, blogs: data.blogs };
    }
  });
};

export default withRouter(Tag);
