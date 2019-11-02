import Header from './Header';
const Layout = props => {
	return (
		<>
			<Header />
			{props.children}
			{/* <p>Footer</p> */}
		</>
	);
};

export default Layout;
