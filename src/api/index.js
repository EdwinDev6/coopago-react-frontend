import axios from "axios";

const URL = "http://localhost:8080/api";

const Axios = axios.create({ baseURL: URL, withCredentials: true });

export const authUser = (user) => {
  return new Promise((success, reject) => {
    Axios.post("login", user, {
      headers: { "Content-Type": "application/json" },
    })
      .then(({ data }) => {
        success(data);
      })
      .catch(({ response }) => {
        reject(response);
      });
  });
};

export const logoutUser = () => {
  return new Promise((success, reject) => {
    Axios.post('logout').then((res) => {
      success(res);
    }

    ).catch(({response}) => {
      reject(response)
    })

  })
}