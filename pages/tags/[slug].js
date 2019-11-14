import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { readTag } from '../../actions/tag';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
import moment from 'moment';
import renderHTML from 'react-render-html';
import Card from '../../components/blog/Card';

const Tag = props => {
  const { tag, blogs } = props;
  return (
    <React.Fragment>
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
      return { tag: data.tag, blogs: data.blogs };
    }
  });
};

export default Tag;
