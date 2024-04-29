import { error } from "jquery";

export const baseUrl = "https://hybrid.sicsglobal.com/brandsntalent_api/";

export const postRequest = async (url, body) => {
  const response = await fetch(url, {
    method: "Post",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });
  const data = await response.json();

  if (!response.ok) {
    let message;
    if (data?.message) {
      message = data.message;
    } else {
      message = data;
    }
    return { error: true, message };
  }

  return data;
};
