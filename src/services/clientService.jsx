import { api, requestConfig } from "../utils/config";

//register an client
const insertClient = async (data, token) => {
    const config = requestConfig("POST", data, token)

    try {
        const res = await fetch(api + "/clients", config)
                        .then((res) => res.json())
                        .catch((err) => err)
        return res
    } catch (error) {
        console.log(error);
    }
}

//Delete a client
const deleteClient = async (id, token) => {
    const config = requestConfig("DELETE", null, token)

    try {
        const res = await fetch(api + "/clients/" + id, config)
                        .then((res) => res.json())
                        .catch((err) => err)

        return res
    } catch (error) {
        console.log(error);
    }
}

//Update a Client
const updateClient = async (data, id, token) => {
    const config = requestConfig("PUT", data, token)
    try {
        const res = await fetch(api + "/clients/" + id, config)
                        .then((res) => res.json())
                        .catch((err) => err)
        return res
    } catch (error) {
        console.log(error);
    }
}

//Get a Client by Id
const getClientById = async (id, token) => {
    const config = requestConfig("GET", null, token);
  
    try {
      const res = await fetch(api + "/clients/" + id, config)
        .then((res) => res.json())
        .catch((err) => err);
  
      return res;
    } catch (error) {
      console.log(error);
    }
};

//Get all Client by Id
const getAllClientById = async (id, token) => {
    const config = requestConfig("GET", null, token);
  
    try {
      const res = await fetch(api + "/clients/all/" + id, config)
        .then((res) => res.json())
        .catch((err) => err);
  
      return res;
    } catch (error) {
      console.log(error);
    }
};

//Get all Clients
const getAllClients = async (token) => {
    const config = requestConfig("GET", null, token)

    try {
        const res = await fetch(api + "/clients/", config)
                        .then((res) => res.json())
                        .catch((err) => err)
        return res
    } catch (error) {
        console.log(error);
    }
}

//Search client by name
const searchClient = async (query, token) => {
    const config = requestConfig("GET", null, token)

    try {
        const res = await fetch(api + "/clients/search?q=" + query, config)
                        .then((res) => res.json())
                        .catch((err) => err)
        return res
    } catch (error) {
        console.log(error);
    }
}

const clientService = {
    insertClient,
    deleteClient,
    updateClient,
    getClientById,
    getAllClients,
    searchClient,
    getAllClientById,
}

export default clientService