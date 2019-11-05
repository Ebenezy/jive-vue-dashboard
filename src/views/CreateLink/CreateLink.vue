<template>
   <Layout>
        <!-- partial -->
        <div class="main-panel" slot="body">
            <div class="content-wrapper">
                <div class="page-header">
                    <h3 class="page-title">
                        <span class="page-title-icon bg-jive-blue text-white mr-2"> <i
                                class="mdi mdi-account-card-details"></i></span>
                        Create Link
                    </h3>
                </div>
            </div>
            <div class="container-scroller">
        <Loader v-if="loading" :show-full="true"/>
        <div class="container-fluid page-body-wrapper full-page-wrapper">
            <div class="content-wrapper  align-items-center auth">
                <div class="row w-100">
                    <div class="col-md-6 mx-auto">
                        <div class="auth-form-light text-left p-5">
                            <div class="brand-logo">
                            </div>
                            <h4>Hello User ! Create Invite Link </h4>
                            <!-- <h6 class="font-weight-light">Sign in to continue.</h6> -->
                            <form class="pt-3" @submit.prevent="post">
                                <div class="form-group">
                                    <input type="text" class="form-control form-control-lg" id="exampleInputEmail1"
                                           placeholder="Davido Show"  v-model="name" required>
                                </div>
                                <div class="form-group">
                                    <input type="text" class="form-control form-control-lg"
                                           id="exampleInputPassword1" placeholder="Status@VIP,VIIP" v-model="message"
                                           required>
                                </div>
                                <div class="form-group">
                                    <input type="text" class="form-control form-control-lg"
                                           id="exampleInputPassword1" placeholder="Number of Usage@10" v-model="max_usage"
                                           required>
                                </div>
                                <div class="mt-3">
                                    <button class="btn btn-block btn-jive-color btn-lg font-weight-medium auth-form-btn"
                                            href="">Create Link
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <!-- content-wrapper ends -->
        </div>
        <!-- page-body-wrapper ends -->
    </div>
        </div>
        
    </Layout>
</template>
<!-- container-scroller -->

<script>
    import Loader from "../../components/Loader/Loader";
    import Layout from '../../components/Layout';
    import {CreateLinkService} from "../../services/CreateLink.Service";


    

    export default {
        name: 'admin',
        components: {Loader, Layout},
        data: function () {
            return {  
                event_id:'',  
                name: '', 
                message: '', 
                max_usage: '', 
                loading: false}
        },
        
        methods: {
            // ...mapActions({loginUser: 'LOGIN'}),
            async post() {
                this.loading = true;
                let event = this.$store.getters.GET_USER.details.events[0].uuid
                await CreateLinkService.createlink({
                    event_id: event,
                    name: this.name,
                    message: this.message,
                    max_usage: this.max_usage,

                }).then((res)=> {
                    this.$toastr.success(res.message, {timeOut: 5000});

                }).catch((error) => {
                    this.$toastr.error(error.message, "LInk Creation failed!", {timeOut: 5000});
                });
                this.loading = false;
            }
            
        },
            
    }
</script>