import { api, requestConfig } from "../utils/config";

//Register an user
const register = async (data) => {
    const config = requestConfig("POST", data)

    try {
        const res = await fetch(api + "/users/register", config)
        .then((res) => res.json())
        .catch((err) => err);
        
        if(res){
            localStorage.setItem("user", JSON.stringify(res))
        }

        return res
        
    } catch (error) {
        console.log(error);
    }
}

//Register an employee
const registerEmployee = async (data) => {
  const config = requestConfig("POST", data)

  try {
      const res = await fetch(api + "/users/register/employee", config)
      .then((res) => res.json())
      .catch((err) => err);

      return res
      
  } catch (error) {
      console.log(error);
  }
}

//Register an user with OAuth
const registerAuth = async (data) => {
  const config = requestConfig("POST", data)
  try {
      const res = await fetch(api + "/users/register/oauh", config)
      .then((res) => res.json())
      .catch((err) => err);
      
      if(res){
          localStorage.setItem("user", JSON.stringify(res))
      }

      return res
      
  } catch (error) {
      console.log(error);
  }
}

//Loout a user
const logout = () => {
    localStorage.removeItem("user")
}

//Sing in an user
const login = async (data) => {
    const config = requestConfig("POST", data);
  
    try {
      const res = await fetch(api + "/users/login", config)
        .then((res) => res.json())
        .catch((err) => err);
  
      if (res._id) {
        localStorage.setItem("user", JSON.stringify(res));
      }
  
      return res;
    } catch (error) {
      console.log(error);
    }
  };

//Sing in an user with OAuth
const loginOAuth = async (data) => {
  const config = requestConfig("POST", data);

  try {
    const res = await fetch(api + "/users/login/oauh", config)
      .then((res) => res.json())
      .catch((err) => err);

    if (res._id) {
      localStorage.setItem("user", JSON.stringify(res));
    }

    return res;
  } catch (error) {
    console.log(error);
  }
};

const authService = {
    register,
    logout,
    login,
    registerAuth,
    loginOAuth,
    registerEmployee,
}

export default authService