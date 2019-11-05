import {ApiService} from "./api.service";

const CreateLinkService = {
    createlink: async ({event_id,name, message, max_usage,}) => {
        return await ApiService.post('/links/create', {event_id:event_id, name:name, message:message,max_usage:max_usage}).then((res) => {
            return Promise.resolve(res.data);
        }).catch(() => {
            return Promise.reject(false);
        });
    },
    
};



export {CreateLinkService};


