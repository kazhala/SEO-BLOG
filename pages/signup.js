import Layout from '../components/Layout';
import Link from 'next/link';
import SignUpComponent from '../components/auth/SignUpComponent';

const Signup = () => {
	return (
		<Layout>
			<h2 className="text-center pt-4 pb-4">Sign Up</h2>
			<div className="row">
				<div className="col-md-6 offset-md-3">
					<SignUpComponent />
				</div>
			</div>
		</Layout>
	);
};

export default Signup;
