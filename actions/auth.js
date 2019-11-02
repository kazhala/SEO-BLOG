import fetch from 'isomorphic-fetch';
import { API } from '../config';
import cookie from 'js-cookie';

export const signup = async user => {
	try {
		let res = await fetch(`${API}/signup`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(user)
		});
		return res.json();
	} catch (err) {
		console.log(err);
	}
};

export const signin = async user => {
	try {
		let res = await fetch(`${API}/signin`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(user)
		});
		return res.json();
	} catch (err) {
		console.log(err);
	}
};

export const signout = next => {
	removeCookie('token');
	removeLocalStorage('user');
	next();
	fetch(`${API}/signout`, {
		method: 'GET'
	})
		.then(res => {
			console.log('Sign out success');
		})
		.catch(err => {
			console.log(err);
		});
};

//set cookie
export const setCookie = (key, value) => {
	if (process.browser) {
		cookie.set(key, value, {
			expires: 1
		});
	}
};

export const removeCookie = key => {
	if (process.browser) {
		cookie.remove(key, {
			expires: 1
		});
	}
};

export const getCookie = key => {
	if (process.browser) {
		return cookie.get(key);
	}
};

export const setLocalStorage = (key, value) => {
	if (process.browser) {
		localStorage.setItem(key, JSON.stringify(value));
	}
};

export const removeLocalStorage = (key, value) => {
	if (process.browser) {
		localStorage.removeItem(key);
	}
};

//general function to handle multiple functions
export const authenticate = (data, next) => {
	setCookie('token', data.token);
	setLocalStorage('user', data.user);
	//call back
	next();
};

export const isAuth = () => {
	if (process.browser) {
		const cookieChecked = getCookie('token');
		if (cookieChecked) {
			if (localStorage.getItem('user')) {
				return JSON.parse(localStorage.getItem('user'));
			} else {
				return false;
			}
		}
	}
};
