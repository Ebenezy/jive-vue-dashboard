<template>
   <Layout>
        <!-- partial -->
        <div class="main-panel" slot="body">
            <div class="content-wrapper">
                <div class="page-header">
                    <h3 class="page-title">
                        <span class="page-title-icon bg-jive-blue text-white mr-2"> <i
                                class="mdi mdi-account-card-details"></i></span>
                        Create Event
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
                            <h4>Hello User! Create Event </h4>
                            <!-- <h6 class="font-weight-light">Sign in to continue.</h6> -->
                            <form class="pt-3" @submit.prevent="addevent">
                                <div class="form-group">
                                    <input type="text" class="form-control form-control-lg" id="exampleInputEmail1"
                                           placeholder="Davido Show"  v-model="name" required>
                                </div>
                                <div class="form-group">
                                    <input type="number" class="form-control form-control-lg"
                                           id="max_usage" placeholder="Max_usage@10" v-model="max_usage"
                                           required>
                                </div>
                                <div class="form-group">
                                    <datetime v-model="start_date"  use12-hour type="datetime" placeholder="05/12/2019 12:07am" format="MM/dd/yyyy HH:mm a" class="form-control form-control-lg"></datetime>
                                </div>
                                <div class="form-group">
                                    <datetime v-model="end_date" type="datetime" use12-hour format="MM/dd/yyyy HH:mm a" placeholder="05/12/2019 12:07pm" class="form-control form-control-lg"></datetime>
                                </div>
                                <div class="form-group">
                                    <textarea type="text" class="form-control form-control-lg"
                                           id="description" placeholder="Describe Event Here...." v-model="description"
                                           required> </textarea>
                                </div>
                                 <div class="form-group">
                                    <input type="file" class="form-control form-control-lg"
                                           id="exampleInputPassword1" placeholder="Upload Image" @change="onFileChanged"
                                           required>
                                </div>
                                <div class="mt-3">
                                    <button class="btn btn-block btn-jive-color btn-lg font-weight-medium auth-form-btn"
                                            href="">Create Event
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
    import {CreateEventService} from "../../services/create.service";
    import 'vue-date-pick/dist/vueDatePick.css';
    import { Datetime } from 'vue-datetime';
    import fecha from 'fecha';
    import 'vue-datetime/dist/vue-datetime.css'
    import moment from 'moment'
    
    



    

    export default {
        name: 'admin',
        components: {Loader,
         Layout,
         datetime: Datetime
         },
        data: function () {
            return {    
                name: '',
                format:'MM/DD/YYYY h:mm a',
                descritpion: '',
                start_date: '',
                end_date: '',
                max_usage:'',
                description:'',
                color:'',
                logo:'',
                loading: false
                }
        },
        
        methods: {
            parseDate(dateString, format) {
                return fecha.parse(dateString, format);
            },
                formatDate(dateObj, format) {
                    return fecha.format(dateObj, format);
                },
            // ...mapActions({loginUser: 'LOGIN'}),
            onFileChanged (event) {
                    this.logo = event.target.files[0]
            },
            async addevent() {
                this.loading = true;
                 let bodyFormData = new FormData()
                bodyFormData.set('name', this.name);
                bodyFormData.set('start_date', moment(this.start_date).format('MM/DD/YYYY hh:mma'));
                bodyFormData.set('end_date', moment(this.end_date).format('MM/DD/YYYY hh:mma'));
                bodyFormData.set('max_usage', this.max_usage);
                bodyFormData.set('description',this.description)
                bodyFormData.set('logo',this.logo);
                await CreateEventService.createEvent(bodyFormData).then((res)=> {
                    this.$toastr.success(res.message, {timeOut: 5000});

                }).catch((error) => {
                    this.$toastr.error(error.errors, "Event Creation failed!", {timeOut: 5000});
                });
                this.loading = false;
            }
                
            
        },
            
    }
</script>