import { api, requestConfig } from "../utils/config";

//register an service
const insertServiceClient = async (data, token) => {
    const config = requestConfig("POST", data, token)

    try {
        const res = await fetch(api + "/services/", config)
                        .then((res) => res.json())
                        .catch((err) => err)
        return res
    } catch (error) {
        console.log(error);
    }
}

//Delete a service
const deleteService = async (id, token) => {
    const config = requestConfig("DELETE", null, token)

    try {
        const res = await fetch(api + "/services/" + id, config)
                        .then((res) => res.json())
                        .catch((err) => err)

        return res
    } catch (error) {
        console.log(error);
    }
}

//Delete all services
const deleteAllService = async (id, token) => {
    const config = requestConfig("DELETE", null, token)

    try {
        const res = await fetch(api + "/services/delete/" + id, config)
                        .then((res) => res.json())
                        .catch((err) => err)

        return res
    } catch (error) {
        console.log(error);
    }
}

//Add service client
const updateServiceClient = async (data, id, token) => {
    const config = requestConfig("PUT", data, token)
    console.log(data);
    try {
        const res = await fetch(api + "/services/" + id, config)
                        .then((res) => res.json())
                        .catch((err) => err)
        return res
    } catch (error) {
        console.log(error);
    }
}

//finish service client
const updateFinishService = async (data, id, token) => {
    const config = requestConfig("PUT", data, token)

    try {
        const res = await fetch(api + "/services/finish/" + id, config)
                        .then((res) => res.json())
                        .catch((err) => err)
        return res
    } catch (error) {
        console.log(error);
    }
}

//amount received service client
const updateReceived = async (data, id, token) => {
    const config = requestConfig("PUT", data, token)

    try {
        const res = await fetch(api + "/services/received/" + id, config)
                        .then((res) => res.json())
                        .catch((err) => err)
        return res
    } catch (error) {
        console.log(error);
    }
}

//Get a Services Client by Id
const getServiceClientById = async (id, token) => {
    const config = requestConfig("GET", null, token);
  
    try {
      const res = await fetch(api + "/services/" + id, config)
        .then((res) => res.json())
        .catch((err) => err);
  
      return res;
    } catch (error) {
      console.log(error);
    }
  };

//Get all services
const getAllServices = async (id, token) => {
    const config = requestConfig("GET", null, token)

    try {
        const res = await fetch(api + "/services/all/" + id, config)
                        .then((res) => res.json())
                        .catch((err) => err)
        return res
    } catch (error) {
        console.log(error);
    }
}

const servClientService = {
    insertServiceClient,
    deleteService,
    deleteAllService,
    updateServiceClient,
    updateReceived,
    getServiceClientById,
    getAllServices,
    updateFinishService,
}

export default servClientService