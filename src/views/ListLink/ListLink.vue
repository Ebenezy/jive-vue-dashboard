<template>
    <Layout>
        
        <!-- partial -->
        <div class="main-panel" slot="body">
            <Loader v-if="isLoading" :showFull=true :loading-text="loadingText"/>
            <div class="content-wrapper">
                <div class="page-header">
                    <h3 class="page-title">
                            <span class="page-title-icon bg-jive-blue text-white mr-2"> <i
                                    class="mdi mdi-cash-multiple"></i></span>
                        List Link
                    </h3>
                </div>
                <div class="row">
                    <div class="col-lg-12 grid-margin stretch-card">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title"></h4>
                                <Datatable :columns="columns" :data="linkData" 
                                           @queryPayment="queryPayment"
                                           :loading="loading" :actions="actions">
                                </Datatable>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
</template>

<script>
    import Layout from '../../components/Layout';
    import {listLinkService} from "../../services/ListLink.Service";
    import Datatable from '../../components/Datatable/Datatable';
    import Loader from '../../components/Loader/Loader'


    const action = [
        {
            class: 'btn btn-primary',
            callback: 'confirmPayment',
            args: ['Reference'],
            text: 'Confirm',
            title: "Confirm this transaction as successful",
            showKey: 'StatusInt',
            showWhen: [0, 1]
        },
        // {
        //     class: 'btn btn-info',
        //     callback: 'queryPayment',
        //     args: ['Reference'],
        //     text: 'Query',
        // }
    ];

    export default {
        name: "Event",
        data() {
            return {
                title: "Event",
                columns: [ 'Invite Link','Number of Click','Max Usage','Created'],
                perPage: 10,
                sortable: false,
                searchable: true,
                loading: true,
                linkData: [],
                actions: action,
                callbacks: ['test', 'delete '],
                isLoading: false,
                loadingText: "loading...",
                queryData: {},
                confirmData:{},
                uiid:''
            }
        },
        async created() {
            let user_uuid = this.$store.getters.GET_USER.details.events[0].uuid
            //  user_uuid.forEach(function(item){
            //     this.uuid = item.uuid
            //     console.log(item.uuid)
            //  });
            await listLinkService.listlink(user_uuid).then((response) => {
                response.forEach(({ friendly_url:url, max_usage:max, visit_count:visit, created_at:date, user_uuid:user}) => {
                    this.linkData.push({
                        "Invite Link":'http://jiveqrcode.herokuapp.com/invite/'+url, 
                        'Number of Click':visit,
                        'Max Usage':max,
                        Created:date,
                        User:user

    
                    });
                });
                this.loading = false;
            }).catch((err) => window.console.log(err));
        },
        
        components: {
            Layout, Datatable, Loader
        }
    }
</script>

<style scoped>

</style>