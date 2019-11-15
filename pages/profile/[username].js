import Head from 'next/head';
import Link from 'next/link';
import { userPublicProfile } from '../../actions/user';
import Layout from '../../components/Layout';
import { DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
import moment from 'moment';

const UserProfile = () => {
  return (
    <React.Fragment>
      <Layout>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <h5>username</h5>
                  <p>...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </React.Fragment>
  );
};

export default UserProfile;
