import fetch from 'isomorphic-fetch';
import { API } from '../config';

export const create = async (tag, token) => {
  try {
    let res = await fetch(`${API}/tag`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(tag),
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

export const getTags = async () => {
  try {
    let res = await fetch(`${API}/tags`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

export const readTag = async slug => {
  try {
    let res = await fetch(`${API}/tag/${slug}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

export const removeTag = async (slug, token) => {
  try {
    let res = await fetch(`${API}/tag/${slug}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
};
