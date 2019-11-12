import moment from 'moment';
import renderHTML from 'react-render-html';
import Link from 'next/link';
import { API } from '../../config';

const SmallCard = props => {
  const { blog } = props;

  return (
    <div className="card">
      <section>
        <Link href={`/blogs/${blog.slug}`}>
          <a>
            <img
              className="img img-fluid"
              style={{ maxHeight: '150px', width: 'auto' }}
              src={`${API}/blog/photo/${blog.slug}`}
              alt={blog.title}
            />
          </a>
        </Link>
      </section>

      <div className="card-body">
        <section>
          <Link href={`/blogs/${blog.slug}`}>
            <h5 className="card-title">{blog.title}</h5>
          </Link>
          <div className="card-text">{renderHTML(blog.excerpt)}</div>
        </section>
      </div>

      <div className="card-body">
        <div>
          Posted {moment(blog.updatedAt).fromNow()} by{' '}
          <Link href={`/`}>
            <a className="float-right">{blog.postedBy.name}</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SmallCard;
