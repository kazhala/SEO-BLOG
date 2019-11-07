import fetch from "isomorphic-fetch";
import { API } from "../config";

export const create = async (category, token) => {
  try {
    let res = await fetch(`${API}/category`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(category)
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
};
