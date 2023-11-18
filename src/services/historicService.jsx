import { api, requestConfig } from "../utils/config";

//register an historic
const inserthistoric = async (data, token) => {
    const config = requestConfig("POST", data, token)

    try {
        const res = await fetch(api + "/historic/", config)
                        .then((res) => res.json())
                        .catch((err) => err)
        return res
    } catch (error) {
        console.log(error);
    }
}

//Get a historic by Id
const getHistoricById = async (id, token) => {
    const config = requestConfig("GET", null, token);
  
    try {
      const res = await fetch(api + "/historic/" + id, config)
        .then((res) => res.json())
        .catch((err) => err);
  
      return res;
    } catch (error) {
      console.log(error);
    }
  };

const historicService = {
    inserthistoric,
    getHistoricById,
}

export default historicService