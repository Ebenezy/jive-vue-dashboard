import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login/Login.vue'
import Store from './store/store'
import Dashboard from './views/Dashboard/Dashboard.vue';
import EventList from './views/Event/Event.vue'
import CreateEvent from './views/CreateEvent/CreateEvent.vue'
import CreateLink from './views/CreateLink/CreateLink.vue'
import ListUser from './views/ListUser/ListUser.vue'
import Payment from './views/PaymentPlan/Payment.vue'
import ListLink from './views/ListLink/ListLink.vue'
import SignUp from './views/SignUp/SignUp'



Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'login',
            component: Login,
            meta: {
                public: true,  // Allow access to even if not logged in
                onlyWhenLoggedOut: true
            }
        },
        {
            path: '/signup',
            name: 'signup',
            component: SignUp,
            meta: {
                public: true,  // Allow access to even if not logged in
                onlyWhenLoggedOut: true
            }
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            // beforeEnter: (to, from, next) => authenticate(to, from, next),
// route level code-splitting
// this generates a separate chunk (about.[hash].js) for this route
// which is lazy-loaded when the route is visited.
            component: Dashboard,
        },
        {
            path: '/logout',
            name: 'logout',
        },
        {
            path: '/events',
            name: 'events',
            component: EventList,
        },
        {
            path: '/create',
            name: 'createevent',
            component: CreateEvent,
        },
        {
            path: '/create/link',
            name: 'createlink',
            component: CreateLink,
        },
        {
            path: '/list/user',
            name: 'Listuser',
            component: ListUser,
        },
        {
            path: '/payment/plans',
            name: 'payment',
            component: Payment,
        },
        {
            path: '/list/link',
            name: 'listlink',
            component: ListLink,
        },
    ]
});


router.beforeEach((to, from, next) => {
    const isPublic = to.matched.some(record => record.meta.public);
    const onlyWhenLoggedOut = to.matched.some(record => record.meta.onlyWhenLoggedOut);
    const loggedIn = Store.getters.IS_AUTHENTICATED;

    if (!isPublic && !loggedIn) {
        return next({
            name: 'login',
        });
    }

    // Do not allow user to visit login page or register page if they are logged in
    if (loggedIn && onlyWhenLoggedOut) {
        return next({name: 'dashboard'});
    }

    next();
});

export default router;
