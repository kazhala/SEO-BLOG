import Layout from '../components/Layout';
import Link from 'next/link';
import SignUpComponent from '../components/auth/SignUpComponent';

const Signup = () => {
	return (
		<Layout>
			<h2>Signup page</h2>
			<SignUpComponent />
		</Layout>
	);
};

export default Signup;
