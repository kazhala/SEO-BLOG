import fetch from 'isomorphic-fetch';
import { API } from '../config';
import queryString from 'query-string';
import { isAuth, handleResponse } from './auth';

export const createBlog = async (blog, token) => {
  try {
    let createBlogEndpoint;

    if (isAuth() && isAuth().role === 1) {
      createBlogEndpoint = `${API}/blog`;
    } else if (isAuth() && isAuth().role === 0) {
      createBlogEndpoint = `${API}/user/blog`;
    }

    const res = await fetch(`${createBlogEndpoint}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: blog,
    });
    handleResponse(res);
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

export const list = async username => {
  try {
    let listBlogEndpoint;

    if (username) {
      listBlogEndpoint = `${API}/${username}/blogs`;
    } else {
      listBlogEndpoint = `${API}/blogs`;
    }
    const res = await fetch(`${listBlogEndpoint}`, {
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
    let deleteBlogEndpoint;

    if (isAuth() && isAuth().role === 1) {
      deleteBlogEndpoint = `${API}/blog/${slug}`;
    } else if (isAuth() && isAuth().role === 0) {
      deleteBlogEndpoint = `${API}/user/blog/${slug}`;
    }
    const res = await fetch(`${deleteBlogEndpoint}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    handleResponse(res);
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

export const updateBlog = async (blog, token, slug) => {
  try {
    let updateBlogEndpoint;

    if (isAuth() && isAuth().role === 1) {
      updateBlogEndpoint = `${API}/blog/${slug}`;
    } else if (isAuth() && isAuth().role === 0) {
      updateBlogEndpoint = `${API}/user/blog/${slug}`;
    }
    const res = await fetch(`${updateBlogEndpoint}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: blog,
    });
    handleResponse(res);
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

export const listSearch = async params => {
  try {
    let query = queryString.stringify(params);
    const res = await fetch(`${API}/blogs/search?${query}`, {
      method: 'GET',
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
};
