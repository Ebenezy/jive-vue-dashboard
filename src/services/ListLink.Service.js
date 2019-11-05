import {ApiService} from "./api.service";

const listLinkService = {
    listlink:async(uuid) => {
        return await ApiService.get("/links/list/"+uuid).then((res) => {
            return Promise.resolve(res.data.data);
        }).catch(() => {
            return Promise.reject(false);
        });
    },
    
};


export {listLinkService};