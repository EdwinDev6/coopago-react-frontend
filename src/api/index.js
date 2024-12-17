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

export const checkSession = () => {
  return new Promise((success, reject) => {
    Axios.get("session", {
      headers: { "Content-Type": "application/json" },
    })
      .then(({data}) => {
        success(data)
      })
      .catch((res) => {
        reject(res)
      });
  });
};

export const executeProcedure = (procedureName, procedureParams, schema) => {
  return new Promise((success, reject) => {
    Axios.post("procedures/execute", { procedureName, procedureParams, schema })
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
    Axios.get("logout")
      .then((res) => {
        success(res);
      })
      .catch(({ response }) => {
        reject(response);
      });
  });
};

export const getFilters = (w) => {
  return new Promise((success, reject) => {
    Axios.post(
      "procedures/execute",
      {
        procedureName: "p_traer_filtros",
        procedureParams: { RENGLON: `${w}` },
      },
      { headers: { "Content-Type": "application/json" } }
    )
      .then(({ data }) => {
        const result = data?.result?.recordsets;
        success(result);
      })
      .catch(({ response }) => {});
  });
};
