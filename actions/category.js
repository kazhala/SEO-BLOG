import fetch from 'isomorphic-fetch';
import { API } from '../config';

export const create = async (category, token) => {
  try {
    let res = await fetch(`${API}/category`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(category),
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

export const getCategories = async () => {
  try {
    let res = await fetch(`${API}/categories`, {
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

export const singleCategory = async slug => {
  try {
    let res = await fetch(`${API}/category/${slug}`, {
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

export const removeCategory = async (slug, token) => {
  try {
    let res = await fetch(`${API}/category/${slug}`, {
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
