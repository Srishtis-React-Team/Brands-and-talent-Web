// *****Api helper class *******

import Axios from "axios";
export let ApiHelper = {
  // Api get function
  get: async (url, tokenNeed = true) => {
    let headers = {
      "Content-Type": "application/json",
    };
    let token;
    let talentToken = localStorage.getItem("token");
    let brandToken = localStorage.getItem("brandToken");
    if (talentToken) {
      token = talentToken;
    }
    if (brandToken) {
      token = brandToken;
    }
    if (tokenNeed && token) {
      console.log("true", "tokencalled");
      headers["x-access-token"] = token;
    }
    console.log(headers, "headers");
    return await Axios.get(url, {
      headers,
    }).catch((error) => {
      handleError(error.response);
    });
  },

  // Api post function
  post: async (url, data, tokenNeed, config = {}) => {
    let headers = {
      "Content-Type": "application/json",
    };
    let token;
    let talentToken = localStorage.getItem("token");
    let brandToken = localStorage.getItem("brandToken");
    if (talentToken) {
      token = talentToken;
    }
    if (brandToken) {
      token = brandToken;
    }
    console.log(brandToken, "brandToken");
    console.log(token, "tokenAPiHelper");
    console.log(tokenNeed, "tokenNeed");
    if (tokenNeed && token) {
      console.log("true", "tokencalled");
      headers["x-access-token"] = token;
    }
    console.log(headers, "headers");
    return await Axios.post(url, data, {
      headers,
      ...config,
    }).catch((error) => {
      handleError(error.response);
    });
  },

  // Api put function
  put: async (url, data, tokenNeed = true, config = {}) => {
    let headers = {
      "Content-Type": "application/json",
    };
    // if (tokenNeed) {
    //     headers['x-access-token'] = userData.token;
    // }

    return await Axios.put(url, data, {
      headers,
      ...config,
    }).catch((error) => {
      handleError(error.response);
    });
  },
  // Api delete function
  delete: async (url, data = {}, tokenNeed = true, config = {}) => {
    let headers = {
      "Content-Type": "application/json",
    };
    // if (tokenNeed) {
    //     headers['x-access-token'] = userData.token;
    // }

    return await Axios.delete(url, {
      params: data,
      headers,
      ...config,
    }).catch((error) => {
      handleError(error.response);
    });
  },
};

function handleError(error) {
  if (error) {
    let message = error.data.message;
    // alert(message)
  } else {
    // alert('Cant load data! Please check internet connection')
  }
}
