import {ApiService} from "./api.service";

const userService = {
    login: ({login, password}) => {
        return new Promise(function (resolve, reject) {
            ApiService.post('/users/login', {login: login, password: password}).then(async (res) => {
                let token = res.data.data.token;
                resolve(token);
            }).catch((error) => {
                reject(error.response.data);
            });
        });
    },
    authorize: async (token) => {
        return await ApiService.customRequest({
            headers: {'Authorization': token},
            method: "GET",
            url: ApiService.getBaseUrl() + "/user/authorize"
        }).then((res) => {
            return Promise.resolve(res.data.message);
        }).catch((error) => {
            return Promise.reject(error.response.data);
        });
    },
    register: async ({ first_name,last_name, username, email,password}) => {
        return await ApiService.post('/users/registration', {
            first_name: first_name,
            last_name: last_name,
            username: username,
            email: email,
            password: password
        }).then((res) => {
            return Promise.resolve(res.data);
        }).catch((error) => {
            return Promise.reject(error.response.data);
        });
    }
};

export {userService};