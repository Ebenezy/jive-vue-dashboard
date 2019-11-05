import {eventService} from "../../../services/Event.service";

const actions = {

    EVENT_DATA: async (context) => {
        return await eventService.eventlist().then((res) => {
            context.commit('SET_EVENT_DATA', res);
            return true;
        }).catch((err) => {
            window.console.log(err);
            return false;
        });
    }
};

export {actions};