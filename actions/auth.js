import fetch from 'isomorphic-fetch';
import { API } from '../config';

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
