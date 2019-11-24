import { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import { DOMAIN } from '../config';
import Link from 'next/link';
import { signout, isAuth } from '../actions/auth';
import Router from 'next/router';
import NProgress from 'nprogress';
import '.././node_modules/nprogress/nprogress.css';
import Search from './blog/Search';

//progress bar like youtube
Router.onRouteChangeStart = url => NProgress.start();
Router.onRouteChangeComplete = url => NProgress.done();
Router.onRouteChangeError = url => NProgress.done();

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <React.Fragment>
      <Navbar color="light" light expand="md">
        <Link href="/">
          <NavLink className="font-weight-bold">
            <div
              style={{
                width: '7rem',
                height: '2rem',
                cursor: 'pointer',
                marginTop: '-5px',
              }}
            >
              <img
                className="img-fluid"
                src={`${DOMAIN}/static/images/cover.png`}
                alt="site logo"
              />
            </div>
          </NavLink>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem style={{ cursor: 'pointer' }}>
              <Link href="/blogs">
                <NavLink>Blogs</NavLink>
              </Link>
            </NavItem>

            <NavItem style={{ cursor: 'pointer' }}>
              <Link href="/contact">
                <NavLink>Contact</NavLink>
              </Link>
            </NavItem>

            {!isAuth() && (
              <React.Fragment>
                <NavItem style={{ cursor: 'pointer' }}>
                  <Link href="/signin">
                    <NavLink>Sign In</NavLink>
                  </Link>
                </NavItem>
                <NavItem style={{ cursor: 'pointer' }}>
                  <Link href="/signup">
                    <NavLink>Sign Up</NavLink>
                  </Link>
                </NavItem>
              </React.Fragment>
            )}

            {isAuth() && isAuth().role === 1 && (
              <NavItem style={{ cursor: 'pointer' }}>
                <Link href="/admin">
                  <NavLink>{`${isAuth().name}'s DashBoard`}</NavLink>
                </Link>
              </NavItem>
            )}

            {isAuth() && isAuth().role === 0 && (
              <NavItem style={{ cursor: 'pointer' }}>
                <Link href="/user">
                  <NavLink>{`${isAuth().name}'s DashBoard`}</NavLink>
                </Link>
              </NavItem>
            )}

            {isAuth() && (
              <NavItem>
                <NavLink
                  style={{ cursor: 'pointer' }}
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

            <NavItem style={{ cursor: 'pointer' }}>
              <NavLink
                className="btn btn-primary text-light"
                href="/user/crud/blog"
              >
                Write a blog
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      <Search />
    </React.Fragment>
  );
};

export default Header;
