import fetch from 'isomorphic-fetch';
import { API } from '../config';

export const userPublicProfile = async username => {
  try {
    const res = await fetch(`${API}/user/${username}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
};
