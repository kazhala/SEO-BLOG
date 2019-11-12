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

export const listRelated = async blog => {
  try {
    const res = await fetch(`${API}/blogs/related`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(blog),
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

export const list = async () => {
  try {
    const res = await fetch(`${API}/blogs`, {
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

export const removeBlog = async (slug, token) => {
  try {
    const res = await fetch(`${API}/blog/${slug}}`, {
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

export const updateBlog = async (blog, token, slug) => {
  try {
    const res = await fetch(`${API}/blog/${slug}`, {
      method: 'PUT',
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
