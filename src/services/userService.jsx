import { api, requestConfig } from "../utils/config";

//Get user details
const profile = async (data, token) => {
    const config = requestConfig("GET", data, token)

    try {
        const res = await fetch(api + "/users/profile", config)
                        .then((res) => res.json())
                        .catch((err) => err)
        return res
    } catch (error) {
        console.log(error);
    }
}

//Get all users
const getAllUsers = async (data, token) => {
    const config = requestConfig("GET", data, token)

    try {
        const res = await fetch(api + "/users/employee", config)
                        .then((res) => res.json())
                        .catch((err) => err)
        return res
    } catch (error) {
        console.log(error);
    }
}

//Get all users by Id
const getAllUsersById = async (id, token) => {
    const config = requestConfig("GET", null, token)

    try {
        const res = await fetch(api + "/users/employee/" + id, config)
                        .then((res) => res.json())
                        .catch((err) => err)

        return res
    } catch (error) {
        console.log(error);
    }
}

//Update user details
const updateProfile = async (data, token) => {
    const config = requestConfig("PUT", data, token, true)

    try {
        const res = await fetch(api + "/users/", config)
                        .then((res) => res.json())
                        .catch((err) => err)
        
        return res

    } catch (error) {
        console.log(error);
    }
}

//Get users details
const getUserDetails = async (id) => {
    const config = requestConfig("GET")
    
    try {
        const res = await fetch(api + "/users/" + id, config)
                        .then((res) => res.json())
                        .catch((err) => err)
        return res
    } catch (error) {
        console.log(error);
    }
}

//Search user by name
const searchEmployee = async (query, token) => {
    const config = requestConfig("GET", null, token)

    try {
        const res = await fetch(api + "/users/search/employee?q=" + query, config)
                        .then((res) => res.json())
                        .catch((err) => err)
        return res
    } catch (error) {
        console.log(error);
    }
}

//Update employee details
const updateEmployee = async (data, token) => {
    const config = requestConfig("PUT", data, token, true)

    try {
        const res = await fetch(api + "/users/employee", config)
                        .then((res) => res.json())
                        .catch((err) => err)
        
        return res

    } catch (error) {
        console.log(error);
    }
}

//Delete a user
const deleteUser = async (id, token) => {
    const config = requestConfig("DELETE", null, token)

    try {
        const res = await fetch(api + "/users/" + id, config)
                        .then((res) => res.json())
                        .catch((err) => err)

        return res
    } catch (error) {
        console.log(error);
    }
}

const userService = {
    profile,
    updateProfile,
    getUserDetails,
    getAllUsers,
    searchEmployee,
    updateEmployee,
    deleteUser,
    getAllUsersById,
}

export default userService