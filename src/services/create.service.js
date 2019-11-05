import {ApiService} from "./api.service";

const CreateEventService = {
    createEvent: async (data) => {
        return await ApiService.post('/events/create', data).then((res) => {
            return Promise.resolve(res.data);
        }).catch((error) => {
            return Promise.reject(error.response.data);
        });
    },
    
    
  
    
};
export {CreateEventService};