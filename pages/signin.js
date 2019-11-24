import Layout from '../components/Layout';
import SignInComponent from '../components/auth/SignInComponent';
import { withRouter } from 'next/router';

const Signin = props => {
  const { router } = props;
  const showRedirectMessage = () => {
    if (router.query.message) {
      return <div className="alert alert-danger">{router.query.message}</div>;
    } else {
      return;
    }
  };

  return (
    <Layout>
      <h2 className="text-center pt-4 pb-4">Sign In</h2>
      <div className="row">
        <div className="col-md-6 offset-md-3">{showRedirectMessage()}</div>
      </div>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <SignInComponent />
        </div>
      </div>
    </Layout>
  );
};

export default withRouter(Signin);
