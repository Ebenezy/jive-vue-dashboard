import {ApiService} from "./api.service";

const Paymentservice = {
    payment: async () => {
        return await ApiService.get('/plans').then((res) => {
            return Promise.resolve(res.data.data);
        }).catch(() => {
            return Promise.reject(false);
        });
    },
    
};

export {Paymentservice};