const Layout = props => {
	return (
		<>
			<p>Header</p>
			{props.children}
			<p>Footer</p>
		</>
	);
};

export default Layout;
