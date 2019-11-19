import fetch from 'isomorphic-fetch';
import { API } from '../config';

export const emailContactForm = async data => {
  try {
    let emailEndpoint;

    if (data.authorEmail) {
      emailEndpoint = `${API}/contact-blog-author`;
    } else {
      emailEndpoint = `${API}/contact`;
    }

    const res = await fetch(`${emailEndpoint}`, {
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
