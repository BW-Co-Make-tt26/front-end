import axios from "axios";

export const axiosWithAuth = () => {
    const token = localStorage.getItem("token");

    return axios.create({
        baseURL: "https://co-make-app-tt26.herokuapp.com/api",
        headers: {
            authorization: token
        }
    })
}