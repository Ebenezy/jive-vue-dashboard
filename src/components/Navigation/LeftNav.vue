<template>
    <nav class="sidebar sidebar-offcanvas" id="sidebar">
        <ul class="nav">
            <li class="nav-item nav-profile">
                <a href="#" class="nav-link">
                    <div class="nav-profile-image">
                        <i class="mdi mdi-account-circle mdi-48px"></i>
                        <span class="login-status online"></span> <!--change to offline or busy as needed-->
                    </div>
                    <div class="nav-profile-text d-flex flex-column">
                        <span class="font-weight-bold mb-2 text-white">{{user.details.username}}</span>
                        <span class="text-secondary text-small">Admin</span>

                    </div>
                    <i class="mdi mdi-bookmark-check text-success nav-profile-badge"></i>
                </a>
            </li>
            <li class="nav-item" v-bind:class="{ active: 'dashboard' === currentPage }">
                <router-link class="nav-link" :to="{name: 'dashboard'}">
                    <span class="menu-title">Dashboard</span>
                    <i class="mdi mdi-home menu-icon"></i>
                </router-link>
            </li>
            

            <li class="nav-item" v-bind:class="{ active: 'events' === currentPage }">
                <a class="nav-link collapsed" data-toggle="collapse" href="#ui-basic" aria-expanded="false"
                   aria-controls="ui-basic">
                    <span class="menu-title">Event</span>
                    <i class="menu-arrow"></i>
                    <i class="mdi mdi-google-wallet menu-icon"></i>
                </a>
                <div class="collapse" id="ui-basic" style="" v-bind:class="{ show: 'events' === currentPage }">
                    <ul class="nav flex-column sub-menu">
                        <li class="nav-item">
                            <router-link class="nav-link" :to="{name: 'events'}">
                               Event List
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" :to="{name: 'createevent'}"
                                         v-bind:class="{ active: 'createevent' === currentPage }">
                                Create Event
                            </router-link>
                        </li>
                    </ul>
                </div>
            </li>
            <li class="nav-item" v-bind:class="{ active: 'adminAdd' === currentPage }">
                <a class="nav-link collapsed" data-toggle="collapse" href="#ui-basic2" aria-expanded="false"
                   aria-controls="ui-basic">
                    <span class="menu-title">Link</span>
                    <i class="menu-arrow"></i>
                    <i class="mdi mdi-account-key menu-icon"></i>
                </a>
                <div class="collapse" id="ui-basic2" style="" v-bind:class="{ show: 'createlink' === currentPage }">
                    <ul class="nav flex-column sub-menu">
                        <li class="nav-item">
                            <router-link class="nav-link" :to="{name: 'createlink'}"
                                         v-bind:class="{ active: 'createlink' === currentPage }">Create Invite
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" :to="{name: 'listlink'}"
                                         v-bind:class="{ active: 'listlink' === currentPage }">View Invite
                            </router-link>
                        </li>
                    </ul>
                </div>
            </li>
            <li class="nav-item" v-bind:class="{ active: 'payment' === currentPage }">
                <router-link class="nav-link" :to="{name: 'payment'}">
                    <span class="menu-title">Payments</span>
                    <i class="mdi mdi mdi-cash-multiple menu-icon"></i>
                </router-link>
            </li>
           
        </ul>
    </nav>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        name: "LeftNav",
        computed: {
            ...mapGetters({user: "GET_USER"}),
            currentPage() {
                return this.$route.name;
            }
        }
    }
</script>

<style scoped>

</style> 
