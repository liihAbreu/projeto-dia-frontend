export const api = "https://projeto-dia-backend-1850c29c9746.herokuapp.com/api"
export const uploads = "https://projeto-dia-backend-1850c29c9746.herokuapp.com/uploads"
export const urlImage = "https://projeto-dia-frontend.vercel.app/src/assets/img"

//export const api = "http://localhost:5000/api"
//export const uploads = "http://localhost:5000/uploads"
//export const urlImage = "http://localhost:5173/src/assets/img"

export const requestConfig = (method, data, token = null, image= null) => {
    let config

    if (image) {
        config = {
            method: method,
            body: data,
            headers: {},
        }
    }else if(method === "DELETE" || data === null){
        config = {
            method: method,
            headers: {"Content-Type": "application/json",},
        }
    } else {
        config = {
            method: method,
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
        }
    }

    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config
}