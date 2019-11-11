import fetch from 'isomorphic-fetch';
import { API } from '../config';

export const createBlog = async (blog, token) => {
  try {
    const res = await fetch(`${API}/blog`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: blog,
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

export const listBlogsWithCategoriesAndTags = async (skip, limit) => {
  const data = {
    limit,
    skip,
  };
  try {
    const res = await fetch(`${API}/blogs-categories-tags`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

export const singleBlog = async slug => {
  try {
    const res = await fetch(`${API}/blog/${slug}`, {
      method: 'GET',
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
};
