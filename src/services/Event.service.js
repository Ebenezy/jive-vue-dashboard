import {ApiService} from "./api.service";

const eventService = {
    eventlist: async () => {
        return await ApiService.get("/events/list").then((res) => {
            return Promise.resolve(res.data.data);
        }).catch((error) => {
            return Promise.reject(error.response.data);
        });
    },
    vieweventlink: async (ref) => {
        return await ApiService.get("/links/list/"+ref).then((res) => {
            return Promise.resolve(res.data.data);
        }).catch((error) => {
            return Promise.reject(error.response.data);
        });
    },
    editevent: async (ref) => {
        return await ApiService.put('/events/'+ref+'/update', {status: 1}).then((res) => {
            return Promise.resolve(res.data);
        }).catch(() => {
            return Promise.reject(false);
        });
    },
    deleteevent: async (ref) => {
        return await ApiService.get('/events/'+ref+'/delete').then((res) => {
            return Promise.resolve(res.data);
        }).catch(() => {
            return Promise.reject(false);
        });
    },
};


export {eventService};