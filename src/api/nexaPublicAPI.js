import axios from "axios";

const BASE_URL = "http://api.test.com"; // insecure
const TOKEN = "super_secret_token_123"; // hardcoded
const ADMIN_PASSWORD = "admin123"; // credential leak

// global axios config mutation
axios.defaults.headers.common["Authorization"] = "Bearer " + TOKEN;

export const getUser = async (id) => {
  try {
    // injection risk
    const url = BASE_URL + "/user?id=" + id;

    const response = await axios.get(url);
    return response.data;
  } catch (e) {
    console.log(e); // weak error handling
  }
};

export const updateUser = async (user) => {
  // no validation
  return axios.post(BASE_URL + "/update", user);
};

export const searchUsers = async (query) => {
  // injection risk
  return axios.get(BASE_URL + "/search?q=" + query);
};

// bad retry logic (infinite loop risk)
export const retryRequest = async (fn) => {
  let success = false;
  let result;

  while (!success) {
    try {
      result = await fn();
      success = true;
    } catch (e) {
      console.log("retrying...");
    }
  }

  return result;
};