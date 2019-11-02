import { useState } from 'react';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink
} from 'reactstrap';
import { APP_NAME } from '../config';
import Link from 'next/link';
import { signout, isAuth } from '../actions/auth';
import Router from 'next/router';

const Header = props => {
	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => setIsOpen(!isOpen);

	return (
		<div>
			<Navbar color="light" light expand="md">
				<Link href="/">
					<NavLink className="font-weight-bold">{APP_NAME}</NavLink>
				</Link>
				<NavbarToggler onClick={toggle} />
				<Collapse isOpen={isOpen} navbar>
					<Nav className="ml-auto" navbar>
						<NavItem>
							<Link href="/signin">
								<NavLink>Sign In</NavLink>
							</Link>
						</NavItem>
						<NavItem>
							<Link href="/signup">
								<NavLink>Sign Up</NavLink>
							</Link>
						</NavItem>
						{isAuth() && (
							<NavItem>
								<NavLink
									onClick={() =>
										signout(() => {
											Router.replace('/signin');
										})
									}
								>
									Sign Out
								</NavLink>
							</NavItem>
						)}
					</Nav>
				</Collapse>
			</Navbar>
		</div>
	);
};

export default Header;
